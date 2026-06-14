import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineBars3, HiXMark } from 'react-icons/hi2';
import { NAV_LINKS } from '../../utils/constants';

const LandingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/40 transition-all duration-300">
      <div className="mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 lg:gap-3 group">
            <img src="/favicon.svg" alt="TaskoraX Logo" className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg shadow-soft group-hover:shadow-glow group-hover:scale-105 transition-all duration-300" />
            <span className="text-xl lg:text-2xl font-extrabold font-display text-text-primary tracking-tight">
              Taskora<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-text-secondary hover:text-primary-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="btn-ghost text-sm"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn-primary text-sm"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HiXMark className="h-6 w-6" />
            ) : (
              <HiOutlineBars3 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-primary-500 hover:bg-surface-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2 px-4">
                <Link
                  to="/login"
                  className="btn-secondary text-sm w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
