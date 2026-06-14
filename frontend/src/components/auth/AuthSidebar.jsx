import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-primary-600">
      {/* Mesh Gradient / Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
      
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
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/30 rounded-full mix-blend-overlay filter blur-[100px]"
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
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
              The premium workspace<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-white">for modern teams.</span>
            </h1>
            <p className="text-lg text-primary-100/90 leading-relaxed font-medium mb-10 max-w-lg">
              Manage projects, track progress, and collaborate seamlessly in a beautifully designed environment built for speed.
            </p>
          </motion.div>

          {/* Feature/Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/50 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Lightning Fast</h3>
              <p className="text-primary-100/70 text-sm mt-1">Built for speed and performance.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/50 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Bank-grade Security</h3>
              <p className="text-primary-100/70 text-sm mt-1">Your data is encrypted and safe.</p>
            </motion.div>
          </div>
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
