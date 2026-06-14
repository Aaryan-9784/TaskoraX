import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlinePlay } from 'react-icons/hi2';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] xl:text-[6rem] font-extrabold text-text-primary tracking-tight leading-[1.05] mb-8 mt-16 lg:mt-24 animate-fade-in-up font-display">
            Manage Tasks
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-800">Like Never Before</span>
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
              {[11, 12, 16, 25, 32].map((imgId, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/80?img=${imgId}`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-[3px] border-white object-cover"
                />
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
        <div className="mt-40 lg:mt-64 max-w-5xl mx-auto animate-fade-in-up hover:-translate-y-2 transition-transform duration-500" style={{ animationDelay: '0.4s' }}>
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
            <div className="p-6 bg-surface-primary min-h-[300px] lg:min-h-[400px] rounded-b-xl relative overflow-hidden">
              {/* Decorative background gradients */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

              {/* Sidebar + Main Content layout illusion */}
              <div className="flex gap-6 h-full relative z-10">
                {/* Mini Sidebar Illusion */}
                <div className="hidden md:flex flex-col gap-4 w-16 border-r border-border/40 pr-4 pt-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 1 ? 'bg-primary-50 text-primary-600' : 'text-text-tertiary hover:bg-surface-secondary'}`}>
                      <div className={`w-5 h-5 rounded-md ${i === 1 ? 'bg-primary-500' : 'bg-gray-300'}`} />
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-6 pt-2">
                  {/* Top Header Illusion */}
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="h-5 w-32 bg-text-primary/10 rounded-md mb-2" />
                      <div className="h-3 w-48 bg-text-secondary/10 rounded-md" />
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm" />
                      <div className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white shadow-sm -ml-4" />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Active Projects', value: '12', trend: '+2', color: 'from-blue-500 to-indigo-600', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                      { label: 'Tasks Completed', value: '84', trend: '+14%', color: 'from-emerald-400 to-emerald-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { label: 'Team Members', value: '24', trend: '+3', color: 'from-orange-400 to-orange-600', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                      { label: 'Productivity', value: '92%', trend: '+5%', color: 'from-primary-500 to-primary-700', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-4 border border-border/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full`} />
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                            </svg>
                          </div>
                          <span className="text-xs font-bold text-success-600 bg-success-50 px-2 py-1 rounded-full">{stat.trend}</span>
                        </div>
                        <p className="text-2xl font-extrabold text-text-primary tracking-tight">{stat.value}</p>
                        <p className="text-xs font-semibold text-text-secondary mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Activity Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-border/60 shadow-sm flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <div className="h-4 w-32 bg-text-primary/10 rounded-md" />
                        <div className="h-4 w-16 bg-primary-100 rounded-md" />
                      </div>
                      <div className="flex items-end gap-3 flex-1 h-32">
                        {[40, 55, 35, 75, 60, 95, 80].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end h-full group">
                            <div className="w-full bg-primary-50 rounded-t-lg transition-all duration-300 relative group-hover:bg-primary-100" style={{ height: `${h}%` }}>
                              <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-md" style={{ height: `${Math.max(30, h - 20)}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Tasks */}
                    <div className="bg-white rounded-2xl p-5 border border-border/60 shadow-sm flex flex-col">
                      <div className="h-4 w-28 bg-text-primary/10 rounded-md mb-6" />
                      <div className="space-y-4 flex-1">
                        {[
                          { color: 'bg-primary-500', w: 'w-3/4' },
                          { color: 'bg-success-500', w: 'w-1/2' },
                          { color: 'bg-warning-500', w: 'w-5/6' },
                          { color: 'bg-blue-500', w: 'w-2/3' },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 hover:bg-surface-secondary rounded-lg transition-colors cursor-default">
                            <div className={`w-2.5 h-2.5 rounded-full ${task.color} shadow-sm`} />
                            <div className="flex-1 space-y-2">
                              <div className={`h-2.5 bg-text-primary/15 rounded-full ${task.w}`} />
                              <div className="h-2 bg-text-tertiary/20 rounded-full w-1/3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
