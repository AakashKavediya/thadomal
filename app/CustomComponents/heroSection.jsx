"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CookingModel3D from './CookingModel3D';

const HeroSection = () => {
  const heroRef = useRef(null);
  const loadingRef = useRef(null);
  const textRef = useRef(null);
  const modelRef = useRef(null);
  const buttonRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Loading animation timeline
    const loadingTl = gsap.timeline({
      onComplete: () => {
        // Hide loading screen when animation completes
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
          display: 'none'
        });
        
        // Start main animations
        animatePageElements();
      }
    });

    // Loading animation sequence
    loadingTl
      .fromTo('.loading-text', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo('.loading-bar', 
        { width: 0 },
        { width: '100%', duration: 1.5, ease: 'power2.out' }
      )
      .to('.loading-text', {
        y: -20,
        opacity: 0,
        duration: 0.5
      }, '-=0.3');

    // Main page animations
    const animatePageElements = () => {
      const mainTl = gsap.timeline();
      
      // Animate navigation
      mainTl.fromTo(navRef.current.children,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }
      );
      
      // Animate text content
      mainTl.fromTo(textRef.current.children,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
        '-=0.3'
      );
      
      // Animate 3D model container
      mainTl.fromTo(modelRef.current,
        { x: 100, opacity: 0, rotationY: 15 },
        { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: 'back.out(1.7)' },
        '-=0.5'
      );
      
      // Animate decorative elements
      mainTl.fromTo('.decorative-element',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5 },
        '-=0.3'
      );
      
      // Animate order button
      mainTl.fromTo(buttonRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.8)' },
        '-=0.2'
      );
      
      // Continuous animations
      gsap.to('.floating-element', {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to('.rotating-element', {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: 'none'
      });
    };

    return () => {
      // Clean up animations if needed
      loadingTl.kill();
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div 
        ref={loadingRef}
        className="fixed inset-0 bg-gradient-to-br from-pink-500 to-orange-400 z-50 flex flex-col items-center justify-center"
      >
        <div className="text-center">
          <h2 className="loading-text text-4xl font-bold text-white mb-8">Cooking Dreams</h2>
          <div className="w-64 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div className="loading-bar h-full bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={heroRef}
        className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden"
      >
        {/* Navigation Bar */}
        <nav ref={navRef} className="absolute top-0 left-0 right-0 z-50 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="text-3xl font-bold text-pink-600">
              Cooking Dreams
            </div>
            
            {/* Menu Items */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Recipes</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Ingredients</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">About Us</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Contact Us</a>
            </div>
            
            {/* Shopping Bag & Login */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors font-medium">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex items-center justify-between min-h-screen pt-20 px-6">
          {/* Left Side - Text Content */}
          <div ref={textRef} className="flex-1 max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-8xl md:text-9xl font-black text-pink-500 leading-none mb-6 transform -skew-x-12">
              COOKING
              <br />
              <span className="text-pink-400">DREAMS</span>
            </h1>
            
            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium leading-relaxed">
              Experience our innovative,<br />
              <span className="text-pink-600 font-bold">culinary adventures</span>
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-12 max-w-lg leading-relaxed">
              Discover the perfect blend of technology and creativity with our premium cooking collection. Each recipe is crafted with precision and designed to inspire.
            </p>
            
            {/* Features */}
            <div className="space-y-3 mb-12">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Fresh ingredients</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Chef-approved recipes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Perfect flavors</span>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Cooking Model */}
          <div className="flex-1 flex justify-center items-center relative">
            {/* 3D Cooking Model Container */}
            <div 
              ref={modelRef}
              className="w-80 h-80 bg-gradient-to-br from-pink-200 to-pink-400 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* 3D Cooking Model */}
              <CookingModel3D modelPath="/three_d_models/3december_2021_day_9_cooking.glb" />
              
              {/* Decorative elements */}
              <div className="decorative-element absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
              <div className="decorative-element absolute bottom-4 left-4 w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
              <div className="decorative-element absolute top-1/2 left-4 w-4 h-4 bg-white bg-opacity-25 rounded-full"></div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="floating-element absolute top-20 right-20 w-4 h-4 bg-pink-300 rounded-full"></div>
            <div className="floating-element absolute bottom-32 left-20 w-6 h-6 bg-green-300 rounded-full"></div>
            <div className="rotating-element absolute top-1/3 right-10 w-3 h-3 bg-yellow-300 rounded-full"></div>
          </div>
        </div>

        {/* Order Now Button */}
        <div className="absolute bottom-8 right-8">
          <button 
            ref={buttonRef}
            className="group relative w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 shadow-2xl"
          >
            <div className="text-white font-bold text-sm text-center leading-tight">
              ORDER<br />NOW
            </div>
            <div className="rotating-element absolute inset-0 rounded-full border-2 border-white border-dashed opacity-30 group-hover:opacity-50"></div>
          </button>
        </div>

        {/* Decorative Arrow */}
        <div className="absolute bottom-32 left-16">
          <div className="flex items-center space-x-2 text-orange-500">
            <svg className="w-8 h-8 floating-element" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">Premium quality</span>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="decorative-element absolute top-1/4 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
        <div className="decorative-element absolute bottom-1/4 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-xl"></div>
      </div>
    </>
  );
};

export default HeroSection;