"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FinalScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const shortcuts = [
    "I'd like to discuss a project.",
    "I have a job opportunity.",
    "I'd like to collaborate.",
    "I'd like to know more about your work.",
    "Let's connect."
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage("");
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center mt-32 md:mt-32">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ambientFloat {
          0% { transform: translateY(-15px); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(-15px); }
        }
        .animate-ambient-float {
          animation: ambientFloat 8s ease-in-out infinite;
        }
      `}} />

      {/* Background Cinematic Noise */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat animate-[spin_60s_linear_infinite]" />

      <div className="z-10 flex flex-col items-center justify-center text-center max-w-4xl animate-ambient-float w-full contact-wrapper">
        <style dangerouslySetInnerHTML={{__html: `
          /* Default/Desktop Styles (Untouched) */
          .contact-wrapper { padding: 0 24px; }
          .contact-heading { margin-bottom: 32px; }
          .contact-text { margin-bottom: 140px; }
          .contact-socials { margin-top: 120px; }
          .lets-talk-btn { padding: 32px 80px; }
          .remarkable-text { padding-bottom: 11px; margin-bottom: 3px; display: inline-block; }

          /* MOBILE-ONLY OVERRIDES */
          @media (max-width: 767px) {
            .contact-wrapper { padding: 0 32px; }
            .contact-heading { margin-bottom: 48px !important; }
            .contact-text { margin-bottom: 64px !important; padding: 0 16px; line-height: 1.6; }
            .contact-socials { margin-top: 80px !important; gap: 32px !important; }
            .lets-talk-btn { padding: 20px 48px !important; width: 100%; max-width: 300px; margin: 0 auto; }
            .remarkable-text { padding-bottom: 8px !important; margin-bottom: 12px !important; margin-top: 8px !important; }
          }
        `}} />
        <h3 className="text-xs md:text-sm font-mono tracking-widest text-white/50 mb-8 md:mb-12 uppercase">06 // Contact</h3>
        
        <h2 className="contact-heading text-4xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] text-white font-sans">
          LET&apos;S BUILD SOMETHING<br/>
          <span className="font-light text-white/80 border-b border-white/30 remarkable-text">REMARKABLE.</span>
        </h2>
        
        <p className="contact-text text-base md:text-2xl text-white/50 font-light max-w-2xl">
          Have an idea, project, or opportunity? Let&apos;s create something meaningful.
        </p>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="lets-talk-btn group relative inline-flex items-center justify-center bg-[#050505] border border-white/20 rounded-full text-white font-mono tracking-widest text-sm md:text-base uppercase overflow-hidden transition-all duration-500 hover:border-white/60 hover:bg-white/[0.04] hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <span className="relative z-10 flex items-center gap-3 md:gap-4 transition-transform duration-500">
            LET&apos;S TALK
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 w-4 h-4 md:w-5 md:h-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>

        {/* Social Links */}
        <div className="contact-socials flex items-center justify-center gap-6 md:gap-8">
          <a 
            href="mailto:rahilpatel1199@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 md:p-3.5 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/40 hover:bg-white/[0.03] hover:scale-105 transition-all duration-300"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
          <a 
            href="https://instagram.com/iamrahilpambhar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 md:p-3.5 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/40 hover:bg-white/[0.03] hover:scale-105 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/rahilpatel2211" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 md:p-3.5 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/40 hover:bg-white/[0.03] hover:scale-105 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-[10px] md:text-xs font-mono tracking-widest text-white/30 uppercase text-center w-full px-4">
        © 2026 RAHIL PAMBHAR. ALL RIGHTS RESERVED.
      </div>

      {/* LET'S TALK Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ padding: '24px', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={() => {
              setIsModalOpen(false);
              setIsDropdownOpen(false);
            }}
          >
            <motion.div 
              initial={{ y: 20, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 15, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col bg-[#0a0a0a] border border-white/10 overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '650px',
                maxHeight: '90vh',
                borderRadius: '24px',
                boxShadow: '0 30px 100px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.05)',
                overflowY: 'auto'
              }}
            >
              {/* Inner Wrapper with Forced Padding */}
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', marginBottom: '12px' }}>
                  <h3 className="font-light text-white tracking-tight leading-none" style={{ fontSize: '36px', marginTop: '4px' }}>Let&apos;s Talk</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-white/40 hover:text-white transition-all hover:bg-white/10 hover:rotate-90"
                    style={{ padding: '8px', borderRadius: '50%', marginRight: '-8px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>

                {/* Subtitle */}
                <p className="text-white/50 font-light" style={{ fontSize: '15px', marginBottom: '32px' }}>Have a project, opportunity, or idea?</p>

                {/* Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  
                  <label className="font-mono tracking-widest text-white/50 uppercase" style={{ fontSize: '11px', marginBottom: '12px' }}>Your Message</label>
                  
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="bg-[#111] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-[#161616] resize-none font-light transition-all shadow-inner"
                    style={{ 
                      width: '100%',
                      height: '150px',
                      minHeight: '120px',
                      padding: '16px',
                      borderRadius: '12px',
                      marginBottom: '24px',
                      fontSize: '15px'
                    }}
                  />

                  <label className="font-mono tracking-widest text-white/50 uppercase" style={{ fontSize: '11px', marginBottom: '12px' }}>Quick Message</label>
                  
                  <div style={{ position: 'relative', width: '100%', marginBottom: '32px' }}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="transition-all shadow-inner"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '52px',
                        padding: '0 16px',
                        borderRadius: '12px',
                        textAlign: 'left',
                        backgroundColor: isDropdownOpen ? 'rgba(255,255,255,0.05)' : 'rgba(17,17,17,1)',
                        border: isDropdownOpen ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.8)'
                      }}
                    >
                      <span className="truncate" style={{ fontSize: '14px', marginRight: '16px' }}>{message || "Select a shortcut message"}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 opacity-50 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} style={{ width: '16px', height: '16px' }}><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="z-20"
                          style={{ 
                            position: 'absolute',
                            left: 0, right: 0, bottom: '100%',
                            marginBottom: '8px',
                            maxHeight: '220px',
                            overflowY: 'auto',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(12,12,12,0.85)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
                            padding: '6px'
                          }}
                        >
                          {shortcuts.map((shortcut, idx) => {
                            const isSelected = message === shortcut;
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  setMessage(shortcut);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full text-left font-light transition-all flex items-center justify-between group"
                                style={{
                                  padding: '12px 16px',
                                  fontSize: '14px',
                                  borderRadius: '10px',
                                  backgroundColor: isSelected ? 'rgba(255,255,255,0.08)' : 'transparent',
                                  color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                                  marginBottom: idx === shortcuts.length - 1 ? '0' : '2px'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                                    e.currentTarget.style.color = '#ffffff';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                                  }
                                }}
                              >
                                <span className="truncate">{shortcut}</span>
                                {isSelected && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '24px' }}>
                      {submitStatus === "success" && <span className="text-emerald-400/90 font-mono tracking-widest" style={{ fontSize: '12px' }}>Message sent successfully.</span>}
                      {submitStatus === "error" && <span className="text-red-400/90 font-mono tracking-widest" style={{ fontSize: '12px' }}>Failed to send. Try again.</span>}
                    </div>
                    
                    <button 
                      onClick={handleSubmit}
                      disabled={!message.trim() || isSubmitting || submitStatus === "success"}
                      className="bg-white text-black font-mono tracking-widest uppercase hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-shrink-0"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '16px 32px',
                        borderRadius: '9999px',
                        fontSize: '12px'
                      }}
                    >
                      {isSubmitting ? "SENDING..." : submitStatus === "success" ? "SENT" : "SEND MESSAGE"}
                      {!isSubmitting && submitStatus !== "success" && (
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
