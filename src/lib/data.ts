import type { Service, Notification, Client } from './types';

export const mockServices: Service[] = [
  {
    id: 'SRV-001',
    name: 'Website Design & Development',
    description: 'A full-stack website for our new marketing campaign.',
    status: 'In Progress',
    paymentStatus: 'Paid',
    amount: 2500,
    client: { name: 'Innovate Corp', email: 'contact@innovate.com', avatar: 'https://placehold.co/40x40.png' },
    updates: [
      { id: 'U01', date: '2024-07-20', author: 'Team Member', message: 'Initial design mockups have been created and are pending review.' },
      { id: 'U02', date: '2024-07-22', author: 'Client', message: 'The mockups look great! Please proceed with development.' },
      { id: 'U03', date: '2024-07-25', author: 'Team Member', message: 'Frontend development is 50% complete. We are on track.' },
      { id: 'U04', date: '2024-07-28', author: 'Team Member', message: 'Backend API endpoints for user authentication are now complete.' },
    ],
  },
  {
    id: 'SRV-002',
    name: 'Mobile App Development',
    description: 'An iOS and Android app for our e-commerce store.',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 5000,
    client: { name: 'Tech Solutions', email: 'hello@techsolutions.io', avatar: 'https://placehold.co/40x40.png' },
    updates: [
        { id: 'U05', date: '2024-06-10', author: 'Team Member', message: 'Project kickoff and requirements gathering completed.'},
        { id: 'U06', date: '2024-06-25', author: 'Team Member', message: 'UI/UX design for both platforms is finalized.'},
        { id: 'U07', date: '2024-07-15', author: 'Team Member', message: 'App has been deployed to TestFlight and Play Store beta channel for review.'},
        { id: 'U08', date: '2024-07-20', author: 'Client', message: 'We have tested the app and it works perfectly. Great job!'},
    ]
  },
  {
    id: 'SRV-003',
    name: 'Logo & Branding Package',
    description: 'A new logo and branding guidelines for our startup.',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    amount: 800,
    client: { name: 'Startup Co.', email: 'founder@startupco.com', avatar: 'https://placehold.co/40x40.png' },
    updates: [
        { id: 'U09', date: '2024-07-29', author: 'Client', message: 'Service requested. Awaiting initial concepts.' },
    ]
  },
  {
    id: 'SRV-004',
    name: 'SEO Optimization',
    description: 'Improve search engine ranking for parihar.info.',
    status: 'In Progress',
    paymentStatus: 'Paid',
    amount: 1200,
    client: { name: 'Digital Agency', email: 'seo@digital.agency', avatar: 'https://placehold.co/40x40.png' },
    updates: [
      { id: 'U10', date: '2024-07-26', author: 'Team Member', message: 'Initial keyword research and site audit is complete.' },
      { id: 'U11', date: '2024-07-29', author: 'Team Member', message: 'On-page optimizations are being implemented.' },
    ],
  },
  {
    id: 'SRV-005',
    name: 'Social Media Management',
    description: 'Monthly management of our social media channels.',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
    amount: 600,
    client: { name: 'Market Pro', email: 'manager@marketpro.com', avatar: 'https://placehold.co/40x40.png' },
    updates: [
      { id: 'U12', date: '2024-07-25', author: 'Client', message: 'We need to put this service on hold for now due to budget changes.' },
    ]
  },
];

export const mockNotifications: Notification[] = [
    {
        id: 'N01',
        title: 'Payment Received',
        description: 'Payment for SRV-002 has been successfully processed.',
        read: false,
        date: '2024-07-21',
    },
    {
        id: 'N02',
        title: 'Service Completed',
        description: 'Your service request SRV-002 has been marked as completed.',
        read: false,
        date: '2024-07-20',
    },
    {
        id: 'N03',
        title: 'New Update on SRV-001',
        description: 'A team member has posted a new update on your service request.',
        read: true,
        date: '2024-07-28',
    },
]
