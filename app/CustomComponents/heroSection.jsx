"use client"
import React from 'react';

const HeroSection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden">
            {/* Navigation Bar */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-3xl font-bold text-pink-600">
                        Cube Dreams
                    </div>
                    
                    {/* Menu Items */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Shop Cubes</a>
                        <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Offers</a>
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
                <div className="flex-1 max-w-2xl">
                    {/* Main Heading */}
                    <h1 className="text-8xl md:text-9xl font-black text-pink-500 leading-none mb-6 transform -skew-x-12">
                        CUBE
                        <br />
                        <span className="text-pink-400">DREAMS</span>
                    </h1>
                    
                    {/* Tagline */}
                    <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium leading-relaxed">
                        Experience our innovative,<br />
                        <span className="text-pink-600 font-bold">mind-bending cubes</span>
                    </p>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-12 max-w-lg leading-relaxed">
                        Discover the perfect blend of technology and creativity with our premium cube collection. Each cube is crafted with precision and designed to inspire.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-12">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">Premium materials</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">Innovative design</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">Perfect precision</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Cube Model Placeholder */}
                <div className="flex-1 flex justify-center items-center relative">
                    {/* Cube Model Placeholder */}
                    <div className="w-80 h-80 bg-gradient-to-br from-pink-200 to-pink-400 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                        {/* Placeholder for your custom cube model */}
                        <div className="text-center text-white">
                            <div className="text-6xl mb-4">🧊</div>
                            <p className="text-xl font-bold">Your Cube Model</p>
                            <p className="text-sm opacity-80">Will be placed here</p>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
                        <div className="absolute top-1/2 left-4 w-4 h-4 bg-white bg-opacity-25 rounded-full"></div>
                    </div>
                    
                    {/* Floating decorative elements */}
                    <div className="absolute top-20 right-20 w-4 h-4 bg-pink-300 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-32 left-20 w-6 h-6 bg-green-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 right-10 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
                </div>
            </div>

            {/* Order Now Button */}
            <div className="absolute bottom-8 right-8">
                <button className="group relative w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 shadow-2xl">
                    <div className="text-white font-bold text-sm text-center leading-tight">
                        ORDER<br />NOW
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-white border-dashed opacity-30 group-hover:opacity-50 animate-spin-slow"></div>
                </button>
            </div>

            {/* Decorative Arrow */}
            <div className="absolute bottom-32 left-16">
                <div className="flex items-center space-x-2 text-orange-500">
                    <svg className="w-8 h-8 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium">Premium quality</span>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-xl"></div>
        </div>
    );
};

export default HeroSection;