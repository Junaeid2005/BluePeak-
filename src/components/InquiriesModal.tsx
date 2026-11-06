import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  LogOut,
  ShieldCheck,
  Clock,
  Mail,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  Loader2,
} from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  signInWithGoogle,
  logOut,
  subscribeToInquiries,
  updateInquiryStatus,
  isUserAdmin,
  type InquiryData,
} from '../lib/firebase';

interface InquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
}

export const InquiriesModal: React.FC<InquiriesModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'notes'>('inquiries');

  const isAdmin = isUserAdmin(currentUser);

  useEffect(() => {
    if (!isOpen || !currentUser) {
      setInquiries([]);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToInquiries(
      (data) => {
        // If not admin, only show user's own inquiries
        const filtered = isAdmin
          ? data
          : data.filter((item) => item.userId === currentUser.uid);
        setInquiries(filtered);
        setLoading(false);
      },
      (error) => {
        console.error('Inquiries subscribe error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, currentUser, isAdmin]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null);
      setLoading(true);
      await signInWithGoogle();
    } catch (err: unknown) {
      console.error('Sign-in error:', err);
      setAuthError('Sign-in cancelled or failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: 'new' | 'in_review' | 'contacted' | 'completed'
  ) => {
    try {
      setUpdatingId(id);
      await updateInquiryStatus(id, newStatus);
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const displayedInquiries =
    statusFilter === 'all'
      ? inquiries
      : inquiries.filter((inq) => inq.status === statusFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[#F3EAF7] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FAF8FC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#710193] text-white flex items-center justify-center shadow-xs">
              {isAdmin ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#1D1722]">
                {currentUser
                  ? isAdmin
                    ? 'BluePeak Agency Admin Portal'
                    : 'Client Inquiries Portal'
                  : 'BluePeak Client & Partner Portal'}
              </h3>
              <p className="text-xs text-[#706778]">
                {currentUser
                  ? `Signed in as ${currentUser.email}`
                  : 'Sign in with Google to review your inquiries and project statuses'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1.5 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!currentUser ? (
            /* Unauthenticated State */
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#F3EAF7] text-[#710193] mx-auto flex items-center justify-center mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-heading font-bold text-[#1D1722] mb-3">
                Access Project Status & Inquiries
              </h4>
              <p className="text-sm text-[#706778] mb-8 leading-relaxed">
                Clients and partners can sign in to track submitted inquiries,
                monitor review progress, and communicate on milestones. Agency
                admins can view and manage all lead submissions in real-time.
              </p>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white border border-gray-300 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#710193]"
              >
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          ) : (
            /* Authenticated Inquiries View */
            <div>
              {/* Filter and stats row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#706778]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#706778]">
                    Filter by Status:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {['all', 'new', 'in_review', 'contacted', 'completed'].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                            statusFilter === status
                              ? 'bg-[#710193] text-white'
                              : 'bg-gray-100 text-[#706778] hover:bg-gray-200'
                          }`}
                        >
                          {status.replace('_', ' ')}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="text-xs font-medium text-[#706778]">
                  Total Records: <span className="font-bold text-[#1D1722]">{displayedInquiries.length}</span>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-[#710193] animate-spin mx-auto mb-2" />
                  <p className="text-xs text-[#706778]">
                    Syncing inquiries from Firestore...
                  </p>
                </div>
              ) : displayedInquiries.length === 0 ? (
                <div className="text-center py-12 bg-[#FAF8FC] rounded-2xl border border-dashed border-gray-200">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <h5 className="font-heading font-bold text-sm text-[#1D1722]">
                    No Inquiries Found
                  </h5>
                  <p className="text-xs text-[#706778] max-w-sm mx-auto mt-1">
                    {statusFilter === 'all'
                      ? "You haven't submitted any inquiries yet. Submit an inquiry through the contact form on the homepage."
                      : `No inquiries with status '${statusFilter}'.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedInquiries.map((inq) => {
                    const statusColors = {
                      new: 'bg-blue-50 text-blue-700 border-blue-200',
                      in_review: 'bg-amber-50 text-amber-700 border-amber-200',
                      contacted: 'bg-purple-50 text-purple-700 border-purple-200',
                      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    }[inq.status] || 'bg-gray-50 text-gray-700 border-gray-200';

                    return (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl border border-gray-100 bg-[#FAF8FC] hover:bg-white transition-all shadow-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-heading font-bold text-base text-[#1D1722]">
                                {inq.name}
                              </h5>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColors}`}
                              >
                                {inq.status.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#706778] mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-[#710193]" />
                                <a
                                  href={`mailto:${inq.email}`}
                                  className="hover:underline"
                                >
                                  {inq.email}
                                </a>
                              </span>
                              {inq.company && (
                                <span className="flex items-center gap-1">
                                  <Building className="w-3.5 h-3.5 text-[#706778]" />
                                  <span>{inq.company}</span>
                                </span>
                              )}
                              <span className="font-medium text-[#710193] bg-[#F3EAF7] px-2 py-0.5 rounded-md">
                                {inq.service}
                              </span>
                              {inq.budget && (
                                <span className="text-gray-500">
                                  Budget: {inq.budget}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Admin status switcher */}
                          {isAdmin && inq.id && (
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-semibold text-[#706778]">
                                Update Status:
                              </span>
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    inq.id!,
                                    e.target.value as any
                                  )
                                }
                                disabled={updatingId === inq.id}
                                className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white font-medium text-[#1D1722] focus:outline-none focus:ring-1 focus:ring-[#710193]"
                              >
                                <option value="new">New</option>
                                <option value="in_review">In Review</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Message body */}
                        <div className="p-3.5 bg-white rounded-xl border border-gray-100 text-xs sm:text-sm text-[#1D1722] leading-relaxed whitespace-pre-wrap">
                          {inq.message}
                        </div>

                        {inq.adminNotes && (
                          <div className="mt-2 text-xs p-2.5 bg-[#F3EAF7]/60 rounded-lg text-[#710193] border border-[#710193]/15">
                            <span className="font-bold">Admin Note:</span>{' '}
                            {inq.adminNotes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-[#FAF8FC] flex items-center justify-between text-xs text-[#706778]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Firebase Firestore live synchronization active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#1D1722] bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
