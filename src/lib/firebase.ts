import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  getDocFromServer,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const ADMIN_EMAILS = [
  'junaeidshohan@gmail.com',
  'abu.work.official452@gmail.com',
];

export function isUserAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}

// Error handling per Firebase Skill specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot per Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore client is offline.');
      return false;
    }
    // Permission denied on test/connection is expected since catch-all blocks reads without rules
    return true;
  }
}

export interface InquiryData {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  status: 'new' | 'in_review' | 'contacted' | 'completed';
  userId?: string;
  adminNotes?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

/**
 * Submit client inquiry to Firestore
 */
export async function submitInquiry(
  data: Omit<InquiryData, 'id' | 'status' | 'createdAt'>
): Promise<string> {
  const path = 'inquiries';
  try {
    const payload = {
      name: data.name.trim().slice(0, 100),
      email: data.email.trim().toLowerCase().slice(0, 120),
      company: data.company ? data.company.trim().slice(0, 120) : '',
      service: data.service.slice(0, 80),
      budget: data.budget ? data.budget.slice(0, 60) : '',
      message: data.message.trim().slice(0, 2000),
      status: 'new',
      userId: auth.currentUser?.uid || '',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, path), payload);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Subscribe to inquiries (Admin or Author)
 */
export function subscribeToInquiries(
  onData: (inquiries: InquiryData[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const path = 'inquiries';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: InquiryData[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<InquiryData, 'id'>),
      }));
      onData(list);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

/**
 * Update inquiry status or notes (Admin only)
 */
export async function updateInquiryStatus(
  inquiryId: string,
  status: 'new' | 'in_review' | 'contacted' | 'completed',
  adminNotes?: string
): Promise<void> {
  const path = `inquiries/${inquiryId}`;
  try {
    const docRef = doc(db, 'inquiries', inquiryId);
    const updatePayload: Record<string, unknown> = {
      status,
      updatedAt: serverTimestamp(),
    };
    if (adminNotes !== undefined) {
      updatePayload.adminNotes = adminNotes.slice(0, 1000);
    }
    await updateDoc(docRef, updatePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign out
 */
export async function logOut(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged };
