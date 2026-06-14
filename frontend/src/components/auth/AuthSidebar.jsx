import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthSidebar = ({ type = 'login' }) => {
  const content = {
    login: {
      title: (
        <>
          Welcome back to<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-white">your workspace.</span>
        </>
      ),
      description: "Log in to pick up right where you left off. Manage projects, track progress, and collaborate seamlessly in a beautifully designed environment.",
    },
    register: {
      title: (
        <>
          The premium workspace<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-white">for modern teams.</span>
        </>
      ),
      description: "Join TaskoraX today. Manage projects, track progress, and collaborate seamlessly in a beautifully designed environment built for speed.",
    },
    forgot: {
      title: (
        <>
          Secure your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-white">account.</span>
        </>
      ),
      description: "Don't worry, we'll help you get back into your workspace securely and quickly. Follow the instructions to reset your password.",
    },
    reset: {
      title: (
        <>
          Create a new<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-white">secure password.</span>
        </>
      ),
      description: "You're almost there. Choose a strong, unique password to keep your workspace protected. Once updated, you'll be back in action.",
    }
  };

  const currentContent = content[type] || content.login;

  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0A0A0B]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient Overlay for Brand Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/40 to-black/90 z-0" />
      
      {/* Animated Blurred Circles */}
      <motion.div 
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary-400/30 rounded-full mix-blend-overlay filter blur-[80px]"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-500/30 rounded-full mix-blend-overlay filter blur-[100px]"
        animate={{ 
          x: [0, -30, 0], 
          y: [0, -50, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Geometric Glass Shapes */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[10%] w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-between px-16 py-12">
        {/* Top: Premium Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/" className="flex items-center gap-3 w-fit group">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:bg-white/20 transition-all duration-500">
              <svg className="w-[26px] h-[26px] text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 8 C 8 3 16 3 22 8 L 20 10 C 15 6 9 6 4 10 Z" />
                <path d="M12 8.5 L 17 11.5 L 13 22 H 11 L 7 11.5 Z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-white font-display tracking-tight">
              Taskora<span className="text-primary-200">X</span>
            </span>
          </Link>
        </motion.div>

        {/* Middle: Typography & Feature Cards */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 font-display">
              {currentContent.title}
            </h1>
            <p className="text-lg text-primary-100/90 leading-relaxed font-medium mb-10 max-w-lg">
              {currentContent.description}
            </p>
          </motion.div>


        </div>

        {/* Bottom: Trust Indicators & Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {['https://i.pravatar.cc/100?img=1', 'https://i.pravatar.cc/100?img=2', 'https://i.pravatar.cc/100?img=3', 'https://i.pravatar.cc/100?img=4'].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Avatar ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-primary-600 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-warning-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-primary-100 font-medium mt-0.5">
                  Trusted by 10,000+ teams
                </p>
              </div>
            </div>
            
            {/* Quote */}
            <div className="hidden xl:block max-w-[200px] border-l-2 border-primary-400 pl-4">
              <p className="text-sm text-white italic font-medium">
                "TaskoraX changed how our engineering team ships products."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthSidebar;
