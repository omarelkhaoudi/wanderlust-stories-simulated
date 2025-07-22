import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';

const HeroSection: React.FC = () => {
  const scrollToBlog = () => {
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/80 via-accent/60 to-secondary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="h-8 w-8 text-primary mr-3" />
            <span className="text-primary/90 font-semibold text-lg tracking-wide">
              Explorez le monde avec nous
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-accent-foreground mb-6 leading-tight">
            Laissez votre
            <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              âme voyager
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez des destinations extraordinaires, vivez des aventures inoubliables 
            et laissez-vous inspirer par les récits de nos voyages autour du globe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToBlog}
              className="animate-bounce-in"
            >
              Découvrir le blog
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-background/20 border-accent-foreground/30 text-accent-foreground hover:bg-background/30"
              onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;