import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À propos' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'auth', label: isAuthenticated ? 'Déconnexion' : 'Connexion' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-moroccan ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-morocco' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-secondary animate-float-medina" />
            <span className="text-xl font-bold text-foreground">Maroc Découverte</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'auth' && isAuthenticated) {
                    onLogout();
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className="text-foreground hover:text-secondary transition-moroccan font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden animate-fade-in-morocco">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg mt-2 shadow-medina">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'auth' && isAuthenticated) {
                      onLogout();
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-secondary hover:bg-primary/10 rounded-md transition-moroccan"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;