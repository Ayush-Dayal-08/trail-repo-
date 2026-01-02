import React, { useState, useEffect } from 'react';

/* ============================================
   SUB-COMPONENTS FOR HEADER
   ============================================ */

// Floating Particles Background
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Particle 1 */}
    <div 
      className="absolute w-2 h-2 bg-indigo-500/30 rounded-full blur-sm"
      style={{ 
        top: '20%', 
        left: '10%', 
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '0s'
      }}
    />
    {/* Particle 2 */}
    <div 
      className="absolute w-3 h-3 bg-purple-500/20 rounded-full blur-sm"
      style={{ 
        top: '60%', 
        left: '20%', 
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '1s'
      }}
    />
    {/* Particle 3 */}
    <div 
      className="absolute w-2 h-2 bg-cyan-500/30 rounded-full blur-sm"
      style={{ 
        top: '30%', 
        right: '15%', 
        animation: 'float 7s ease-in-out infinite',
        animationDelay: '2s'
      }}
    />
    {/* Particle 4 */}
    <div 
      className="absolute w-4 h-4 bg-indigo-400/10 rounded-full blur-md"
      style={{ 
        top: '70%', 
        right: '25%', 
        animation: 'float 9s ease-in-out infinite',
        animationDelay: '0.5s'
      }}
    />
    {/* Glowing Orb */}
    <div 
      className="absolute w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl"
      style={{ 
        top: '-20%', 
        left: '50%', 
        transform: 'translateX(-50%)',
        animation: 'pulse 4s ease-in-out infinite'
      }}
    />
  </div>
);

// Animated Logo Component
const AnimatedLogo = ({ text, onClick }) => (
  <div 
    onClick={onClick}
    className="group flex items-center gap-3 cursor-pointer relative"
  >
    {/* Logo Icon with Glow */}
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      
      {/* Icon Container */}
      <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
        <span className="text-xl">🔮</span>
      </div>
      
      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 animate-ping opacity-20" />
    </div>
    
    {/* Logo Text */}
    <div className="flex flex-col">
      <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-cyan-400 transition-all duration-300">
        {text}
      </span>
      <span className="text-[10px] font-medium text-indigo-400/70 tracking-widest uppercase hidden sm:block">
        Smart Recovery
      </span>
    </div>
  </div>
);

// Live Status Indicator
const LiveIndicator = ({ text }) => (
  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    <span className="text-xs font-medium text-emerald-400">{text}</span>
  </div>
);

// Hackathon Badge
const HackathonBadge = ({ text }) => (
  <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl backdrop-blur-sm">
    <svg 
      className="w-4 h-4 text-indigo-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M13 10V3L4 14h7v7l9-11h-7z" 
      />
    </svg>
    <span className="text-xs font-medium text-indigo-300">{text}</span>
    <span className="flex h-2 w-2">
      <span className="animate-pulse rounded-full h-2 w-2 bg-indigo-400" />
    </span>
  </div>
);

/* ============================================
   MAIN HEADER COMPONENT
   ============================================ */

function Header({ onLogoClick }) {
  // NEW: Scroll detection state
  const [isScrolled, setIsScrolled] = useState(false);

  // NEW: Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ENHANCED: Main header with scroll effects */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${isScrolled 
            ? 'py-2 bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-indigo-500/10 border-b border-white/5' 
            : 'py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900'
          }
        `}
      >
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        {/* PRESERVED: Original container structure with enhanced styling */}
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between gap-4">
            
            {/* ENHANCED: Logo section - preserving onLogoClick */}
            <AnimatedLogo 
              text="RECOV.AI" 
              onClick={onLogoClick}
            />
            
            {/* NEW: Center section with badges */}
            <div className="hidden md:flex items-center gap-3">
              <LiveIndicator text="AI Active" />
              <HackathonBadge text="FedEx SMART Hackathon" />
            </div>
            
            {/* ENHANCED: Right section - preserving original text */}
            <div className="flex items-center gap-4">
              {/* Original tagline - enhanced styling */}
              <p className="hidden sm:block text-sm bg-gradient-to-r from-purple-200 via-indigo-200 to-cyan-200 bg-clip-text text-transparent font-medium">
                AI-Powered Debt Recovery
              </p>
              
              {/* NEW: CTA Button */}
              <button className="
                relative px-4 py-2 
                text-sm font-semibold text-white
                bg-gradient-to-r from-indigo-600 to-purple-600
                rounded-xl
                overflow-hidden
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]
                hover:scale-105
                active:scale-100
                group
              ">
                {/* Shine Effect */}
                <span className="
                  absolute inset-0 
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  -translate-x-full group-hover:translate-x-full
                  transition-transform duration-700
                " />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get Started</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
            
          </div>
        </div>
        
        {/* Bottom Gradient Line (when scrolled) */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 h-px 
            bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent
            transition-opacity duration-300
            ${isScrolled ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </header>
      
      {/* NEW: Spacer for fixed header */}
      <div className={`transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`} />
    </>
  )
}

export default Header