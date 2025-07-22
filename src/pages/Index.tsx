import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import AuthSection from '@/components/AuthSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('wanderlust-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserEmail(authData.email);
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    
    // Save auth state to localStorage
    localStorage.setItem('wanderlust-auth', JSON.stringify({ 
      email,
      timestamp: Date.now() 
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    
    // Remove auth state from localStorage
    localStorage.removeItem('wanderlust-auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />
      
      <main>
        <HeroSection />
        <AboutSection />
        <BlogSection isAuthenticated={isAuthenticated} />
        <ContactSection />
        <AuthSection 
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          userEmail={userEmail}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
