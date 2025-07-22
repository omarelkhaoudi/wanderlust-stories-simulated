import React, { useState, useEffect } from 'react';
import NavbarMorocco from '@/components/NavbarMorocco';
import HeroMorocco from '@/components/HeroMorocco';
import AboutMorocco from '@/components/AboutMorocco';
import BlogMorocco from '@/components/BlogMorocco';
import ContactMorocco from '@/components/ContactMorocco';
import AuthMorocco from '@/components/AuthMorocco';
import FooterMorocco from '@/components/FooterMorocco';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('morocco-blog-auth');
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
    localStorage.setItem('morocco-blog-auth', JSON.stringify({ 
      email,
      timestamp: Date.now() 
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    
    // Remove auth state from localStorage
    localStorage.removeItem('morocco-blog-auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarMorocco 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />
      
      <main>
        <HeroMorocco />
        <AboutMorocco />
        <BlogMorocco isAuthenticated={isAuthenticated} />
        <ContactMorocco />
        <AuthMorocco 
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          userEmail={userEmail}
        />
      </main>
      
      <FooterMorocco />
    </div>
  );
};

export default Index;
