import type { ServiceItem, ProjectItem, WhyChooseItem, ProcessStep } from '../types';

export const COMPANY_INFO = {
  name: 'BluePeak',
  tagline: 'Build. Elevate. Grow.',
  description:
    'BluePeak helps businesses establish a powerful digital presence through modern websites, creative design, smart marketing, and reliable digital solutions.',
  emails: [
    { label: 'Primary Inquiry', address: 'junaeidshohan@gmail.com' },
    { label: 'Work & Operations', address: 'abu.work.official452@gmail.com' },
  ],
  phones: [
    { country: 'United Kingdom', code: 'UK', number: '+44 7404 968553', raw: '+447404968553' },
    { country: 'Germany', code: 'DE', number: '+49 1521 2523907', raw: '+4915212523907' },
    { country: 'Bangladesh', code: 'BD', number: '+880 1352-345184', raw: '+8801352345184' },
  ],
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/company/bluepeak-agency', placeholder: true },
    { name: 'X / Twitter', url: 'https://x.com/bluepeak_agency', placeholder: true },
    { name: 'GitHub', url: 'https://github.com/bluepeak-agency', placeholder: true },
    { name: 'Instagram', url: 'https://instagram.com/bluepeak.digital', placeholder: true },
  ],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Website Development',
    tag: 'Core Specialization',
    description:
      'We design and develop modern, responsive, and user-friendly websites that represent your brand and support your business goals.',
    iconName: 'Code',
    subServices: [
      'Business Websites',
      'Restaurant Websites',
      'E-commerce Websites',
      'Custom Web Applications',
      'Landing Pages',
    ],
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance',
    tag: 'Continuous Care',
    description:
      'We help keep your website secure, updated, optimized, and running smoothly so you can focus on your business.',
    iconName: 'ShieldCheck',
    subServices: [
      'Website Updates',
      'Technical Support',
      'Bug Fixes',
      'Performance Optimization',
      'Regular Maintenance',
    ],
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    tag: 'Organic Growth',
    description:
      "We improve your website's search engine visibility through effective SEO strategies that help potential customers discover your business.",
    iconName: 'Search',
    subServices: [
      'On-page SEO',
      'Technical SEO',
      'Keyword Research',
      'Website Optimization',
      'SEO-friendly Content Structure',
    ],
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    tag: 'Brand Reach',
    description:
      'We help businesses strengthen their online presence and connect with their target audience through strategic social media marketing.',
    iconName: 'Share2',
    subServices: [
      'Social Media Management',
      'Content Planning',
      'Social Media Strategy',
      'Audience Engagement',
      'Campaign Management',
    ],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    tag: 'Visual Identity',
    description:
      'We create visually appealing designs that communicate your brand identity and make your business stand out.',
    iconName: 'Palette',
    subServices: [
      'Social Media Graphics',
      'Promotional Designs',
      'Marketing Materials',
      'Brand Visuals',
      'Digital Advertisements',
    ],
  },
  {
    id: 'additional-services',
    title: 'Additional Digital Services',
    tag: 'Full Spectrum',
    description:
      'Complementary capabilities engineered to complete your digital ecosystem with seamless user journeys and brand cohesion.',
    iconName: 'Sparkles',
    subServices: [
      'UI/UX Design',
      'Brand Identity Design',
      'Website Performance Optimization',
      'Digital Content Creation',
    ],
  },
];

export const WHY_CHOOSE_DATA: WhyChooseItem[] = [
  {
    id: 1,
    title: 'Tailored Solutions',
    description:
      'Every business is different. We create solutions based on your specific goals and requirements.',
    iconName: 'Sliders',
  },
  {
    id: 2,
    title: 'Modern & Responsive Design',
    description:
      'We ensure your digital presence looks professional, clean, and perfectly aligned across all devices.',
    iconName: 'Smartphone',
  },
  {
    id: 3,
    title: 'User-Focused Approach',
    description:
      'We prioritize user experience, intuitive navigation, speed, and functional simplicity.',
    iconName: 'Users',
  },
  {
    id: 4,
    title: 'Clear Communication',
    description:
      'We believe in transparent, straightforward communication and milestone clarity throughout every project.',
    iconName: 'MessageSquare',
  },
  {
    id: 5,
    title: 'Quality-Focused Development',
    description:
      'We focus on delivering clean code, reliable architecture, and carefully engineered digital solutions.',
    iconName: 'CheckCircle2',
  },
  {
    id: 6,
    title: 'Ongoing Support',
    description:
      'Our relationship does not end when your website goes live. We stand behind our work with long-term care.',
    iconName: 'LifeBuoy',
  },
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'We understand your business, goals, and requirements.',
    details:
      'We begin by analyzing your business model, target audience, competitive landscape, and digital objectives to define the project scope.',
    iconName: 'Compass',
  },
  {
    step: '02',
    title: 'Strategize',
    description: 'We plan the right approach and create a clear project direction.',
    details:
      'We structure technical architecture, content blueprints, user journeys, and project timelines to ensure every milestone is intentional.',
    iconName: 'Layers',
  },
  {
    step: '03',
    title: 'Design',
    description: 'We transform ideas into attractive and user-friendly designs.',
    details:
      'We craft refined UI prototypes, design systems, and responsive layouts that mirror your brand values and engage users.',
    iconName: 'PenTool',
  },
  {
    step: '04',
    title: 'Develop',
    description: 'We build, test, and optimize your digital solution.',
    details:
      'Using clean, modular code and modern web technologies, we implement responsive views, perform cross-browser testing, and optimize speed.',
    iconName: 'Terminal',
  },
  {
    step: '05',
    title: 'Launch & Support',
    description: 'We launch your project and provide ongoing support when needed.',
    details:
      'We deploy your live application, monitor indexing, verify analytics, and remain available for technical maintenance and growth.',
    iconName: 'Rocket',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'peak-consulting',
    title: 'Vanguard Global Advisory',
    category: 'Business Websites',
    shortDescription:
      'A sleek corporate portal for an international financial advisory firm with multi-region service overviews.',
    fullDescription:
      'Vanguard Global Advisory needed a high-trust digital presence reflecting their premium corporate advisory practice. BluePeak engineered a minimalistic corporate architecture with lightning-fast page transitions, structured consultation booking, and multi-language capability.',
    challenge:
      'The client operated on an outdated CMS that took over 6 seconds to load and struggled on mobile devices, losing potential corporate retainers.',
    solution:
      'Engineered a lightweight, static-optimized web architecture with tailored interactive inquiry flows, localized contact routing, and comprehensive on-page SEO.',
    results: [
      'Sub-second page load speeds globally',
      'Fully responsive UI across desktop, tablet, and mobile',
      'Clean SEO structure achieving top-tier search visibility',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SEO Schema'],
    previewUrl: 'https://vanguard-advisory-demo.bluepeak.agency',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'aurora-bistro',
    title: 'L’Aura Artisanal Kitchen',
    category: 'Restaurant Websites',
    shortDescription:
      'An immersive culinary website featuring seasonal tasting menus, reservation booking, and private dining inquiries.',
    fullDescription:
      'L’Aura required a digital experience as refined as their culinary craft. We designed an elegant dining portal featuring high-resolution photography, an interactive dietary-filtered menu, and effortless online table reservation integration.',
    challenge:
      'Existing paper and static PDF menus caused customer confusion and lacked search engine discoverability for high-intent local dining searches.',
    solution:
      'Created an interactive web menu categorized by course and dietary preferences, integrated direct OpenTable/table booking hooks, and implemented LocalRestaurant Schema.',
    results: [
      'Interactive mobile-first digital menu with zero lag',
      'Streamlined reservation inquiries workflow',
      'Elegant typographic balance matching Michelin-style dining',
    ],
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Grid'],
    previewUrl: 'https://laura-kitchen-demo.bluepeak.agency',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'kanso-nordic',
    title: 'Kanso Living Decor',
    category: 'E-commerce',
    shortDescription:
      'Minimalist direct-to-consumer e-commerce storefront for handcrafted Scandinavian interior essentials.',
    fullDescription:
      'Kanso Living sought a minimalist aesthetic that lets their handcrafted ceramics and furniture breathe. We delivered a distraction-free shopping storefront with fluid product image zooms, quick cart drawer, and frictionless checkout flow.',
    challenge:
      'High checkout abandonment on mobile due to visual clutter and slow image loading of high-resolution product photos.',
    solution:
      'Designed an airy, clean grid layout with next-gen image formats, intuitive size/color variant switches, and a streamlined 2-step checkout flow.',
    results: [
      'Intuitive shopping cart drawer and variant selector',
      'Optimized image delivery saving 70% bandwidth',
      'Flawless checkout experience on 375px+ screens',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe Ready', 'State Machine'],
    previewUrl: 'https://kanso-living-demo.bluepeak.agency',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'apex-saas-launch',
    title: 'FlowMetric Platform',
    category: 'Landing Pages',
    shortDescription:
      'High-converting product landing page for a modern B2B telemetry and data analytics platform.',
    fullDescription:
      'FlowMetric needed an authoritative launch landing page to drive beta signups for their cloud metrics tool. BluePeak crafted an interactive product demo viewport, feature highlight tabs, and strategically placed call-to-actions.',
    challenge:
      'Communicating complex data infrastructure capabilities in under 10 seconds without overwhelming enterprise evaluators.',
    solution:
      'Crafted clear benefit-driven sectioning, animated feature spotlights, interactive pricing calculator, and concise technical documentation preview.',
    results: [
      'High conversion rate on beta waitlist form',
      'Clear typographic hierarchy guiding enterprise buyers',
      'Perfect 100/100 Lighthouse performance score',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Interactive Charts', 'Motion'],
    previewUrl: 'https://flowmetric-demo.bluepeak.agency',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'zenith-law',
    title: 'Zenith Legal Partners',
    category: 'Business Websites',
    shortDescription:
      'A trustworthy, authoritative corporate practice website for an international commercial law firm.',
    fullDescription:
      'Zenith Legal Partners required a sophisticated website to showcase their dispute resolution, corporate governance, and IP practices. We built a fast, accessible directory of attorneys, practice areas, and publication insights.',
    challenge:
      'Managing diverse partner bios and complex practice categories without creating a confusing labyrinth for corporate clients.',
    solution:
      'Designed a structured multi-tier filtering system for attorneys and legal publications, accompanied by direct consultation request forms.',
    results: [
      'Structured legal directory with instant keyword search',
      'Secure client inquiry routing to specific department leads',
      'Accessible WCAG AA compliant contrast and navigation',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Search Index'],
    previewUrl: 'https://zenith-legal-demo.bluepeak.agency',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'pulse-summit',
    title: 'NextHorizon Tech Summit',
    category: 'Landing Pages',
    shortDescription:
      'Dynamic event landing page with speaker schedules, stage tracks, and ticket tier booking.',
    fullDescription:
      'NextHorizon required a modern conference website with live countdown, speaker grid, track filtering, and instant ticket pass registration.',
    challenge:
      'Providing an intuitive schedule covering 3 concurrent stages across 2 days while maintaining clean readability on phones.',
    solution:
      'Implemented an interactive stage timeline with bookmarkable sessions, speaker modal bios, and responsive ticket tier cards.',
    results: [
      'Seamless multi-track schedule switcher',
      'Over 95% mobile user satisfaction during event check-in',
      'Speedy client-side schedule search',
    ],
    technologies: ['React', 'Tailwind CSS', 'Schedule Engine', 'Vite'],
    previewUrl: 'https://nexthorizon-demo.bluepeak.agency',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
  },
];
