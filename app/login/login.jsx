"use client"

import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Eye, EyeOff, Zap } from 'lucide-react';

const CulinaryMagicAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [shadowIntensity, setShadowIntensity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShadowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login' : 'Register', formData);
  };

  const shadowStyle = {
    boxShadow: `
      0 0 ${20 + shadowIntensity / 5}px rgba(99, 102, 241, 0.35),
      0 0 ${40 + shadowIntensity / 3}px rgba(139, 92, 246, 0.25),
      inset 0 0 ${30 + shadowIntensity / 4}px rgba(0, 0, 0, 0.5),
      0 ${10 + shadowIntensity / 10}px ${30 + shadowIntensity / 5}px rgba(0, 0, 0, 0.8)
    `
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-500 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 2 + 1}rem`
            }}
          >
            🍳
          </div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={i + 20}
            className="absolute text-indigo-400 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`
            }}
          >
            🤖
          </div>
        ))}
      </div>

      {/* Combat Energy Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute left-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute right-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Main Container */}
      <div 
        className="relative bg-gray-900 border-2 border-purple-600 rounded-lg p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300"
        style={shadowStyle}
      >
        {/* Glowing Corner Accents */}
        <div className="absolute -top-1 -left-1 w-8 h-8 bg-red-600 rotate-45 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-orange-600 rotate-45 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-orange-600 rotate-45 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 rotate-45 transform translate-x-1/2 translate-y-1/2"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2 animate-pulse">🤖🍳</div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">
            CULINARY
            <span className="ml-2 text-accent animate-pulse">MAGIC</span>
          </h1>
          <p className="text-gray-300 text-sm font-semibold tracking-widest">COOKING BETTER WITH AI</p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-2 animate-pulse"></div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
              isLogin 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setIsLogin(true)}
          >
            <Zap className="inline w-4 h-4 mr-1" />
            LOGIN
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
              !isLogin 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setIsLogin(false)}
          >
            <Zap className="inline w-4 h-4 mr-1" />
            REGISTER
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                name="name"
                placeholder="CHEF NAME"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:shadow-lg focus:shadow-purple-500/20 transition-all uppercase tracking-wider"
                required
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all uppercase tracking-wider"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="RECIPE PASSWORD"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all uppercase tracking-wider"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative group">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="CONFIRM RECIPE PASSWORD"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:shadow-lg focus:shadow-purple-500/20 transition-all uppercase tracking-wider"
                required
              />
            </div>
          )}

          <div
            type="submit"
            onClick={handleSubmit}
            className={`w-full py-3 rounded-md font-bold text-white uppercase tracking-widest transition-all duration-300 transform hover:scale-105 cursor-pointer text-center ${
              isLogin
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-600/40'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-600/40'
            }`}
          >
            {isLogin ? '🤖 START COOKING' : '👨‍🍳 JOIN AI KITCHEN'}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <a href="#" className="text-gray-400 text-sm hover:text-red-500 transition-colors">
            Forgot your recipe password?
          </a>
        </div>

        {/* AI Cooking Stats Display */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-between text-xs text-gray-500">
            <span>AI CHEFS ONLINE: 2,847</span>
            <span>RECIPES PERFECTED: 15,432</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulinaryMagicAuth;