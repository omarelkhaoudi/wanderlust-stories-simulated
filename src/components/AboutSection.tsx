import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Compass, Camera, Globe } from 'lucide-react';
import aboutImage from '@/assets/about-travel.jpg';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Compass,
      title: 'Découverte',
      description: 'Explorer de nouveaux horizons et cultures fascinantes'
    },
    {
      icon: Heart,
      title: 'Aventure',
      description: 'Vivre des expériences authentiques et mémorables'
    },
    {
      icon: Camera,
      title: 'Inspiration',
      description: 'Capturer et partager la beauté du monde'
    },
    {
      icon: Globe,
      title: 'Connexion',
      description: 'Créer des liens avec les communautés locales'
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notre passion pour le voyage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wanderlust est né de notre amour profond pour l'exploration et la découverte. 
            Chaque voyage est une nouvelle page de notre histoire.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="animate-slide-up">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Voyageur contemplant un paysage"
                className="rounded-2xl shadow-travel-elevated w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl" />
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-up">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Une communauté de passionnés
            </h3>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Depuis notre création, nous parcourons le monde pour vous offrir les plus beaux 
              récits de voyage. Notre équipe de globe-trotters expérimentés partage avec vous 
              ses découvertes, conseils et coups de cœur.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Que vous soyez un voyageur chevronné ou que vous prépariez votre première 
              aventure, Wanderlust est votre compagnon idéal pour explorer le monde 
              avec confiance et émerveillement.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-secondary">
                <Globe className="h-5 w-5 mr-2" />
                <span className="font-semibold">50+ pays visités</span>
              </div>
              <div className="flex items-center text-secondary">
                <Camera className="h-5 w-5 mr-2" />
                <span className="font-semibold">200+ articles</span>
              </div>
              <div className="flex items-center text-secondary">
                <Heart className="h-5 w-5 mr-2" />
                <span className="font-semibold">10k+ lecteurs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-travel-elevated transition-travel group cursor-pointer"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-travel">
                <value.icon className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;