"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
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
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
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
            const navItems = navRef.current?.querySelectorAll('a');
            navItems?.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, { 
                        scale: 1.1, 
                        color: '#ec4899',
                        duration: 0.3, 
                        ease: 'power2.out' 
                    });
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, { 
                        scale: 1, 
                        color: '#374151',
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

    return(
        <header 
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div ref={logoRef} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                            Cooking Dreams
                        </h1>
                    </div>
                    
                    {/* Navigation */}
                    <nav ref={navRef} className="hidden md:flex items-center space-x-8">
                        <Link href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                            Recipes
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                            Ingredients
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                            About Us
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                            Contact Us
                        </Link>
                    </nav>
                    
                    {/* Menu Items */}
                    <div ref={menuRef} className="flex items-center space-x-4">
                        {/* Search Button */}
                        <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors rounded-lg hover:bg-pink-50">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        
                        {/* Shopping Cart */}
                        <div className="relative">
                            <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors rounded-lg hover:bg-pink-50">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                </svg>
                            </button>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">3</span>
                            </div>
                        </div>
                        
                        {/* Login Button */}
                        <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-orange-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                            Login
                        </button>
                        
                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header