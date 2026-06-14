import {
  HiOutlineSquares2X2,
  HiOutlineChartBarSquare,
  HiOutlineUserGroup,
  HiOutlineBoltSlash,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
} from 'react-icons/hi2';

const features = [
  {
    icon: HiOutlineSquares2X2,
    title: 'Intuitive Dashboard',
    description:
      'Get a bird\'s-eye view of all your projects with real-time stats, charts, and activity feeds.',
    color: 'bg-primary-50 text-primary-500',
  },
  {
    icon: HiOutlineChartBarSquare,
    title: 'Advanced Analytics',
    description:
      'Track productivity trends, team performance, and project velocity with beautiful, actionable charts.',
    color: 'bg-success-50 text-success-500',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Team Collaboration',
    description:
      'Assign tasks, mention teammates, share files, and keep everyone aligned in real-time.',
    color: 'bg-warning-50 text-warning-500',
  },
  {
    icon: HiOutlineBoltSlash,
    title: 'Lightning Fast',
    description:
      'Built for performance. Sub-second load times, instant search, and smooth interactions everywhere.',
    color: 'bg-danger-50 text-danger-500',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Enterprise Security',
    description:
      'SOC 2 compliant, end-to-end encryption, SSO support, and role-based access controls.',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: 'Mobile Optimized',
    description:
      'Fully responsive design that works perfectly on phones, tablets, and desktops.',
    color: 'bg-cyan-50 text-cyan-500',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-surface-secondary">
      <div className="page-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border/60 shadow-sm mb-6">
            <span className="text-xs font-bold text-text-primary tracking-widest uppercase">Features</span>
          </div>
          <h2 className="section-title mb-4">
            Everything You Need to
            <br />
            <span className="text-gradient">Ship Faster</span>
          </h2>
          <p className="section-subtitle">
            Powerful features designed to streamline your workflow and boost your team's productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white border border-border/40 rounded-3xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
