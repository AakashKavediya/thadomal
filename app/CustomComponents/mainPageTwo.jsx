"use client"
import React, { useState } from 'react';

const MainPageTwo = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const craveWorthyDishes = [
        {
            id: 1,
            title: "Easy Chicken Dinners, Deliciously Quick",
            image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
            description: "Quick and delicious chicken recipes perfect for busy weeknights."
        },
        {
            id: 2,
            title: "Sweet, Golden French Toast Favorites!",
            image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
            description: "Indulge in our collection of golden, crispy French toast recipes."
        },
        {
            id: 3,
            title: "Fresh, Flavorful Salads with Power!",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
            description: "Nutritious and delicious salads packed with fresh ingredients."
        }
    ];

    const fanFavorites = [
        {
            id: 1,
            title: "Mozzarella Sticks",
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop"
        },
        {
            id: 2,
            title: "Broiled Steak",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop"
        },
        {
            id: 3,
            title: "Oven Crisp Chicken Wings",
            image: "https://images.unsplash.com/photo-1567620832904-9fe5cf23db13?w=200&h=200&fit=crop"
        },
        {
            id: 4,
            title: "Broccoli and Garlic Pasta",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=200&h=200&fit=crop"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % craveWorthyDishes.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + craveWorthyDishes.length) % craveWorthyDishes.length);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white">Forkful</h1>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Popular</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Meat & Seafood</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Healthy & Diet</a>
                        </nav>

                        {/* Utility Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-300 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-300 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Hero Section */}
                        <section className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                                    88 All-Time Best Dinner Recipes to{' '}
                                    <span className="text-orange-500">Savor</span>
                                </h2>
                                <p className="text-xl text-gray-300 max-w-2xl">
                                    Explore 88 all-time best dinner recipes packed with flavor, perfect for family meals and special occasions.
                                </p>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center space-x-2">
                                    <span>See Them All</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Hero Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=500&fit=crop" 
                                    alt="Gourmet dinner dish"
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                        </section>

                        {/* Crave-Worthy Dishes Section */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-4xl font-bold mb-2">Crave-Worthy Dishes You'll Love</h3>
                                    <p className="text-gray-300 text-lg">
                                        Discover crave-worthy dishes you'll love—easy to make, full of flavor, and always satisfying.
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={prevSlide}
                                        className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={nextSlide}
                                        className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Recipe Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {craveWorthyDishes.map((dish, index) => (
                                    <div 
                                        key={dish.id}
                                        className={`bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                                            index === currentSlide ? 'ring-2 ring-orange-500' : ''
                                        }`}
                                    >
                                        <div className="relative">
                                            <img 
                                                src={dish.image} 
                                                alt={dish.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <button className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-semibold mb-2">{dish.title}</h4>
                                            <p className="text-gray-400 text-sm">{dish.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Fan Favorites */}
                        <section className="bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-6">Fan Favorites</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {fanFavorites.map((item) => (
                                    <div key={item.id} className="space-y-3">
                                        <div className="relative rounded-xl overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        </div>
                                        <h4 className="text-sm font-semibold text-center">{item.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Dinner Favorites */}
                        <section className="bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-4">Dinner Favorites You'll Crave Again and Again</h3>
                            <p className="text-gray-300 mb-6">
                                Discover 88 delicious dinner recipes that are easy to make, full of flavor, and family-approved.
                            </p>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2">
                                <span>View Recipes Now</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <div className="mt-6">
                                <div className="w-full h-48 bg-gray-800 rounded-xl flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <div className="text-4xl mb-2">🍽️</div>
                                        <p className="text-sm">Recipe Collection Image</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 mt-16">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">All Categories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Site Map</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                            </ul>
                        </div>

                        {/* Get In Touch */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
                            <ul className="space-y-2 text-gray-300 mb-6">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                            
                            {/* Email Subscription */}
                            <div>
                                <h5 className="font-semibold mb-2">Stay Updated</h5>
                                <div className="flex space-x-2">
                                    <input 
                                        type="email" 
                                        placeholder="Enter Email" 
                                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="md:col-span-3 pt-8 border-t border-gray-800">
                            <p className="text-gray-400 text-center">© 2025 - All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainPageTwo;
