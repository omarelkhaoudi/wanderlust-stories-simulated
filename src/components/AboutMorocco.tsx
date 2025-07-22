import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Compass, Camera, Mountain, Tent, Users } from 'lucide-react';
import aboutImage from '@/assets/about-morocco.jpg';

const AboutMorocco: React.FC = () => {
  const values = [
    {
      icon: Compass,
      title: 'Découverte',
      description: 'Explorer les trésors cachés du Maroc authentique'
    },
    {
      icon: Mountain,
      title: 'Aventure',
      description: 'Vivre des expériences uniques dans l\'Atlas et le Sahara'
    },
    {
      icon: Camera,
      title: 'Inspiration',
      description: 'Capturer la beauté des paysages marocains'
    },
    {
      icon: Users,
      title: 'Culture',
      description: 'Partager la richesse des traditions berbères'
    }
  ];

  const stats = [
    { icon: Mountain, label: '15+ régions visitées', value: '15+' },
    { icon: Camera, label: 'Articles publiés', value: '120+' },
    { icon: Heart, label: 'Lecteurs fidèles', value: '5k+' },
    { icon: Tent, label: 'Aventures partagées', value: '50+' }
  ];

  return (
    <section id="apropos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-morocco">
            Notre passion pour le
            <span className="block bg-gradient-morocco bg-clip-text text-transparent">
              Maroc
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Maroc Découverte est né de notre fascination pour la diversité et l'authenticité 
            du royaume chérifien. Chaque voyage est une invitation à explorer l'âme marocaine.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="animate-slide-caravan">
            <div className="relative group">
              <img
                src={aboutImage}
                alt="Explorateur au Maroc"
                className="rounded-2xl shadow-medina w-full h-96 object-cover group-hover:scale-105 transition-moroccan"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">
                    🏔️ Explorant les villages berbères de l'Atlas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in-morocco">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Une communauté de passionnés du Maroc
            </h3>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Depuis notre création, nous parcourons le Maroc de Tanger à Ouarzazate, 
              des souks de Marrakech aux dunes de Merzouga. Notre équipe de guides 
              expérimentés partage avec vous les secrets du royaume.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Du thé à la menthe dans un riad de Fès aux nuits étoilées du désert, 
              nous vous invitons à découvrir un Maroc authentique, loin des sentiers battus.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gradient-sahara rounded-lg hover-scale-morocco"
                >
                  <stat.icon className="h-6 w-6 text-secondary mr-3" />
                  <div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-medina transition-moroccan group cursor-pointer animate-fade-in-morocco"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-moroccan group-hover:scale-110">
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-gradient-morocco rounded-2xl shadow-medina">
            <p className="text-lg font-medium text-accent-foreground mb-2">
              🌟 Rejoignez notre communauté de voyageurs
            </p>
            <p className="text-accent-foreground/80">
              Découvrez le Maroc à travers nos yeux et partagez vos propres aventures
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMorocco;