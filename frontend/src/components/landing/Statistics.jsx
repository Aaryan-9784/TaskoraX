import { useState, useEffect, useRef } from 'react';

const stats = [
  { label: 'Active Users', value: 10000, suffix: '+', prefix: '' },
  { label: 'Tasks Completed', value: 50000, suffix: '+', prefix: '' },
  { label: 'Uptime', value: 99.9, suffix: '%', prefix: '' },
  { label: 'User Rating', value: 4.9, suffix: '★', prefix: '' },
];

const AnimatedCounter = ({ target, suffix, prefix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const isFloat = !Number.isInteger(target);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(target, increment * step);
      setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, inView]);

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`;
    return num.toString();
  };

  return (
    <span>
      {prefix}
      {typeof target === 'number' && target >= 1000
        ? formatNumber(count)
        : count}
      {suffix}
    </span>
  );
};

const Statistics = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="statistics" className="py-20 lg:py-28" ref={ref}>
      <div className="page-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-4">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">By the Numbers</span>
          </div>
          <h2 className="section-title mb-4">
            Trusted by Teams
            <br />
            <span className="text-gradient">Around the World</span>
          </h2>
          <p className="section-subtitle">
            Join thousands of teams already using TaskoraX to transform how they work.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white border border-border/40 rounded-3xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-gradient mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  inView={inView}
                />
              </p>
              <p className="text-sm font-medium text-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
