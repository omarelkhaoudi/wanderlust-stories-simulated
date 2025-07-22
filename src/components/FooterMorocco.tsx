import React from 'react';
import { MapPin, Instagram, Facebook, Twitter, Mail, Star } from 'lucide-react';

const FooterMorocco: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@maroc-decouverte.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil', href: '#accueil' },
        { label: 'À propos', href: '#apropos' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
      ]
    },
    {
      title: 'Destinations Maroc',
      links: [
        { label: 'Marrakech', href: '#' },
        { label: 'Casablanca', href: '#' },
        { label: 'Fès', href: '#' },
        { label: 'Chefchaouen', href: '#' },
      ]
    },
    {
      title: 'Expériences',
      links: [
        { label: 'Atlas & Montagnes', href: '#' },
        { label: 'Sahara & Désert', href: '#' },
        { label: 'Côtes Atlantique', href: '#' },
        { label: 'Médinas & Culture', href: '#' },
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-8 w-8 text-primary animate-float-medina" />
                <span className="text-2xl font-bold">Maroc Découverte</span>
              </div>
              <p className="text-accent-foreground/80 mb-6 leading-relaxed">
                Votre guide authentique pour explorer les merveilles du Maroc. 
                De l'Atlas au Sahara, découvrez la magie du royaume chérifien 
                à travers nos récits passionnés et nos conseils d'experts.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-moroccan group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-moroccan" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-4 text-primary">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-accent-foreground/80 hover:text-primary transition-moroccan cursor-pointer hover:translate-x-1"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-accent-foreground/20 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="flex items-center justify-center mb-3">
              <Star className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-semibold text-lg">
                Newsletter Maroc
              </h3>
              <Star className="h-5 w-5 text-primary ml-2" />
            </div>
            <p className="text-accent-foreground/80 mb-4">
              Recevez nos dernières aventures marocaines et conseils de voyage
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-accent-foreground/20 text-accent-foreground placeholder-accent-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary transition-moroccan"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-moroccan font-medium hover:scale-105">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Morocco Facts */}
        <div className="border-t border-accent-foreground/20 py-6">
          <div className="text-center mb-6">
            <h4 className="font-semibold text-primary mb-3">🇲🇦 Le saviez-vous ?</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-accent-foreground/70">
              <div>Le Maroc compte 4 chaînes de montagnes</div>
              <div>Plus de 3000 km de côtes</div>
              <div>12 sites classés UNESCO</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-accent-foreground/60">
            <p>
              © {currentYear} Maroc Découverte. Fait avec ❤️ pour le Maroc.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-moroccan">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary transition-moroccan">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-primary transition-moroccan">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMorocco;