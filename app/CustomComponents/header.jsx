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
        >

        </header>
    )
}

export default Header