import {
  HiOutlineSquares2X2,
  HiOutlineChartBarSquare,
  HiOutlineUserGroup,
  HiOutlineBellAlert,
  HiOutlineShieldCheck,
  HiOutlineCog6Tooth,
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
      'Track productivity trends, team performance, and project velocity with precise data accuracy.',
    color: 'bg-success-50 text-success-500',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Team & Project Management',
    description:
      'Create projects, manage team members, assign tasks, and securely delete outdated items.',
    color: 'bg-warning-50 text-warning-500',
  },
  {
    icon: HiOutlineBellAlert,
    title: 'Smart Notifications',
    description:
      'Stay updated without distractions using our auto-dismissing, intelligent notification system.',
    color: 'bg-danger-50 text-danger-500',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Advanced Security Center',
    description:
      'Protect your data with dedicated security settings, role-based access, and account management.',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: HiOutlineCog6Tooth,
    title: 'Customizable Settings',
    description:
      'Take complete control with streamlined profile configurations and personalized account settings.',
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
