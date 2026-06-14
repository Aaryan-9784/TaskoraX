import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Vercel',
    quote:
      'TaskoraX completely transformed how our team manages sprints. The intuitive interface and powerful analytics have boosted our productivity by 40%.',
    avatar: 'https://i.pravatar.cc/80?img=5',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO at StartupFlow',
    quote:
      "We've tried every task management tool out there. TaskoraX is the first one that our entire team actually enjoys using. The design is just beautiful.",
    avatar: 'https://i.pravatar.cc/80?img=8',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Engineering Lead at Stripe',
    quote:
      'The speed and reliability of TaskoraX is unmatched. Our team of 50+ engineers relies on it daily, and it has never let us down.',
    avatar: 'https://i.pravatar.cc/80?img=9',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-surface-secondary">
      <div className="page-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-4">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="section-title mb-4">
            Loved by Teams
            <br />
            <span className="text-gradient">Everywhere</span>
          </h2>
          <p className="section-subtitle">
            See what industry leaders have to say about their experience with TaskoraX.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`bg-white border border-border/40 rounded-3xl p-8 transition-all duration-500 ${
                index === current ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02] border-primary-200' : 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
