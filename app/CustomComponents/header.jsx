"use client"
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Header = ({ onNavigate, active }) => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const navRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        // Initial header animation
        const headerTl = gsap.timeline();
        
        // Animate logo
        headerTl.fromTo(logoRef.current, 
            { x: -50, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
        );
        
        // Animate navigation items
        headerTl.fromTo(navRef.current?.children,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
        );
        
        // Animate menu items
        headerTl.fromTo(menuRef.current?.children,
            { x: 30, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' },
            '-=0.3'
        );

        // Setup scroll-triggered animations
        const setupScrollAnimations = () => {
            // Header background change on scroll
            gsap.to(headerRef.current, {
                backgroundColor: 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top -50px',
                    end: 'bottom top',
                    toggleActions: 'play none none reverse'
                }
            });

            // Logo scale on scroll
            gsap.to(logoRef.current, {
                scale: 0.9,
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top -50px',
                    end: 'bottom top',
                    toggleActions: 'play none none reverse'
                }
            });
        };

        // Setup interactive animations
        const setupInteractiveAnimations = () => {
            // Navigation hover effects
            const navItems = navRef.current?.querySelectorAll('button');
            navItems?.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, { 
                        scale: 1.1, 
                        color: '#a78bfa',
                        duration: 0.3, 
                        ease: 'power2.out' 
                    });
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, { 
                        scale: 1, 
                        color: '#d1d5db',
                        duration: 0.3, 
                        ease: 'power2.out' 
                    });
                });
            });

            // Menu button hover effects
            const menuItems = menuRef.current?.querySelectorAll('button, div');
            menuItems?.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, { 
                        scale: 1.05, 
                        duration: 0.3, 
                        ease: 'power2.out' 
                    });
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, { 
                        scale: 1, 
                        duration: 0.3, 
                        ease: 'power2.out' 
                    });
                });
            });
        };

        setupScrollAnimations();
        setupInteractiveAnimations();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleNavigate = (key) => {
        if (onNavigate) onNavigate(key);
        setIsOpen(false);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return(
        <header ref={headerRef} className="fixed top-0 inset-x-0 z-40">
            <div className="backdrop-blur bg-black/30 border-b border-gray-700/60">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div ref={logoRef} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 animate-pulse-glow" />
                        <span className="text-xl font-extrabold text-accent tracking-wide">Culinary Explorer</span>
                    </div>
                    <nav ref={navRef} className="hidden md:flex items-center space-x-6">
                        <button onClick={() => handleNavigate('hero')} className={`pb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded ${active === 'hero' ? 'text-white border-b-2 border-purple-500' : 'text-gray-300 hover:text-white'}`}>Hero</button>
                        <button onClick={() => handleNavigate('search')} className={`pb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded ${active === 'search' ? 'text-white border-b-2 border-purple-500' : 'text-gray-300 hover:text-white'}`}>Search</button>
                        <button onClick={() => handleNavigate('suggestions')} className={`pb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded ${active === 'suggestions' ? 'text-white border-b-2 border-purple-500' : 'text-gray-300 hover:text-white'}`}>Suggestions</button>
                        <button onClick={() => handleNavigate('RecipeNutritionCalculator')} className={`pb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded ${active === 'RecipeNutritionCalculator' ? 'text-white border-b-2 border-purple-500' : 'text-gray-300 hover:text-white'}`}>Main Page</button>
                        <button onClick={() => handleNavigate('login')} className={`pb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded ${active === 'login' ? 'text-white border-b-2 border-purple-500' : 'text-gray-300 hover:text-white'}`}>Login</button>
                    </nav>
                    <div ref={menuRef} className="flex items-center space-x-2">
                        <button className="hidden md:inline px-3 py-1.5 rounded-lg btn-accent text-sm font-semibold shadow-dark">Get Started</button>
                        <button
                          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          aria-label="Toggle menu"
                          aria-expanded={isOpen}
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                          </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                  <div className="md:hidden border-t border-gray-700/60">
                    <div className="px-4 py-3 space-y-2 bg-black/50 backdrop-blur">
                      <button onClick={() => handleNavigate('hero')} className={`block w-full text-left px-3 py-2 rounded-md ${active === 'hero' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Hero</button>
                      <button onClick={() => handleNavigate('search')} className={`block w-full text-left px-3 py-2 rounded-md ${active === 'search' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Search</button>
                      <button onClick={() => handleNavigate('suggestions')} className={`block w-full text-left px-3 py-2 rounded-md ${active === 'suggestions' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Suggestions</button>
                      <button onClick={() => handleNavigate('RecipeNutritionCalculator')} className={`block w-full text-left px-3 py-2 rounded-md ${active === 'RecipeNutritionCalculator' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Main Page</button>
                      <button onClick={() => handleNavigate('login')} className={`block w-full text-left px-3 py-2 rounded-md ${active === 'login' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Login</button>
                      <button className="w-full px-3 py-2 rounded-lg btn-accent text-sm font-semibold shadow-dark">Get Started</button>
                    </div>
                  </div>
                )}
            </div>
        </header>
    )
}

export default Header