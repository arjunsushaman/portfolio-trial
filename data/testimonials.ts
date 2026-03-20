export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Naveen',
    role: 'Freelancer',
    company: 'Upwork',
    quote:
      "We hired Arjun Sushaman to build a custom Shopify template with seamless Stripe integration. The final product is exactly what we needed to showcase high-quality ecommerce demos to our clients. Professional, efficient, and highly recommended",
    avatar: 'https://picsum.photos/seed/avatar-2/80/80',
  },
  {
    id: 'test-2',
    name: 'Sethulekshmi S M',
    role: 'Psychologist s',
    company: 'Lead By Sethulekshmi',
    quote:
      "I needed something simple, reliable, and quick, and Sushaman delivered exactly that. He built a smooth, user-friendly web app with an efficient appointment and scheduling system in no time. Even after completion, he was incredibly responsive to last-minute changes and updates. Truly dependable and great to work with.",
    avatar: 'https://www.leadbysethulekshmi.com/logo.png',
  },
  {
    id: 'test-3',
    name: 'Mahesh',
    role: 'Freelancer',
    company: 'Digital Support',
    quote:
      "Sushaman was instrumental in turning our initial concept into a high-fidelity prototype. He built a fully functional service marketplace MVP tailored exactly to our requirements, giving us the professional edge we needed to pitch to investors with confidence",
    avatar: 'https://picsum.photos/seed/avatar-3/80/80',
  },
];
