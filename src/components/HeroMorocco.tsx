import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Star, Palmtree } from 'lucide-react';
import heroImage from '@/assets/hero-morocco.jpg';

const HeroMorocco: React.FC = () => {
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
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 via-accent/70 to-secondary/80" />
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-float-medina opacity-70"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-primary-light rounded-full animate-float-medina opacity-60" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-secondary rounded-full animate-float-medina opacity-80" style={{animationDelay: '2s'}}></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-morocco">
          <div className="flex items-center justify-center mb-8">
            <Star className="h-8 w-8 text-primary mr-3 animate-spin" style={{animationDuration: '8s'}} />
            <span className="text-primary font-semibold text-lg tracking-wide">
              🇲🇦 Explorez la magie du Maroc
            </span>
            <Star className="h-8 w-8 text-primary ml-3 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}} />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-accent-foreground mb-8 leading-tight">
            Découvrez le
            <span className="block bg-gradient-sahara bg-clip-text text-transparent animate-pulse">
              Maroc authentique
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-accent-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            De la majesté des montagnes de l'Atlas aux dunes dorées du Sahara, 
            en passant par les médinas colorées et l'hospitalité berbère. 
            Embarquez pour un voyage extraordinaire au cœur du royaume chérifien.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="morocco"
              size="lg"
              onClick={scrollToBlog}
              className="animate-slide-caravan min-w-[200px]"
            >
              <Palmtree className="mr-2 h-5 w-5" />
              Voir le blog
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-background/20 border-accent-foreground/30 text-accent-foreground hover:bg-background/30 min-w-[200px]"
              onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Notre histoire
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

      {/* Traditional Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background/20 to-transparent"></div>
    </section>
  );
};

export default HeroMorocco;