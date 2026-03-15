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
    name: 'Sarah Chen',
    role: 'Head of Product',
    company: 'Vanta Inc.',
    quote:
      "Sushaman transformed our clunky internal tool into a dashboard our team actually loves using. The attention to micro-interactions and performance was exceptional — we went from dreading Monday reports to looking forward to them. Highly recommend for any serious SaaS project.",
    avatar: 'https://picsum.photos/seed/avatar-1/80/80',
  },
  {
    id: 'test-2',
    name: 'Marcus Webb',
    role: 'Founder & CEO',
    company: 'Ember Supply Co.',
    quote:
      "We hired Sushaman to rebuild our Shopify storefront and the results exceeded every expectation. Revenue is up 40%, the site feels premium, and load times are incredible. Sushaman doesn't just write code — they think deeply about business outcomes. A genuine partner, not just a freelancer.",
    avatar: 'https://picsum.photos/seed/avatar-2/80/80',
  },
  {
    id: 'test-3',
    name: 'Priya Nair',
    role: 'Digital Director',
    company: 'Meridian Media',
    quote:
      "I've worked with a lot of developers over my career. Sushaman stands apart because of how they communicate, how they problem-solve under pressure, and how much they care about the finished product. Our site now handles double the traffic with zero downtime. They're worth every penny.",
    avatar: 'https://picsum.photos/seed/avatar-3/80/80',
  },
];
