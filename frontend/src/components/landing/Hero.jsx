import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlinePlay } from 'react-icons/hi2';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border-primary-200/50 mb-8 animate-fade-in shadow-sm hover:shadow-md transition-shadow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
            </span>
            <span className="text-sm font-semibold text-primary-700">
              Now in Public Beta — Free to use
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary tracking-tight leading-[1.05] mb-6 animate-fade-in-up font-display">
            Manage Tasks
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-500">Like Never Before</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            TaskoraX is the premium task management platform built for modern teams.
            Organize, prioritize, and deliver projects with an experience that feels effortless.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/register"
              className="btn-primary px-8 py-3.5 text-base gap-2 group"
            >
              Start for Free
              <HiOutlineArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#features"
              className="btn-secondary px-8 py-3.5 text-base gap-2"
            >
              <HiOutlinePlay className="h-4 w-4" />
              See How It Works
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex -space-x-3">
              {['#7C3AED', '#2563EB', '#0891B2', '#059669', '#D97706'].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-[3px] border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-text-secondary mt-0.5">
                Loved by <span className="font-semibold text-text-primary">10,000+</span> teams worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Hero visual — App preview mockup */}
        <div className="mt-24 max-w-5xl mx-auto animate-fade-in-up hover:-translate-y-2 transition-transform duration-500" style={{ animationDelay: '0.4s' }}>
          <div className="relative rounded-2xl border border-border/40 shadow-2xl shadow-primary-500/10 glass-panel p-2 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-secondary rounded-t-xl border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger-400" />
                <div className="w-3 h-3 rounded-full bg-warning-400" />
                <div className="w-3 h-3 rounded-full bg-success-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-white rounded-md text-xs text-text-tertiary border border-border/50 min-w-[200px] text-center">
                  app.taskorax.com/dashboard
                </div>
              </div>
            </div>
            {/* Fake dashboard preview */}
            <div className="p-6 bg-surface-secondary min-h-[300px] lg:min-h-[400px]">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Tasks', value: '248', color: 'bg-primary-500' },
                  { label: 'Completed', value: '185', color: 'bg-success-500' },
                  { label: 'In Progress', value: '42', color: 'bg-warning-500' },
                  { label: 'Overdue', value: '8', color: 'bg-danger-500' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 border border-border/50">
                    <div className={`w-8 h-8 ${stat.color} rounded-lg mb-3 opacity-80`} />
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-border/50 h-48">
                  <div className="h-3 w-24 bg-gray-200 rounded mb-4" />
                  <div className="flex items-end gap-2 h-32">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary-100 rounded-t-md" style={{ height: `${h}%` }}>
                        <div className="bg-primary-500 rounded-t-md w-full" style={{ height: '60%' }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-border/50 h-48">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-4" />
                  <div className="space-y-3 mt-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary-200" />
                        <div className="h-2.5 bg-gray-100 rounded flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Gradient glow under preview */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary-500/10 blur-3xl rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
