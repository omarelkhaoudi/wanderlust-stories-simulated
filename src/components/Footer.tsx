import React from 'react';
import { Plane, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@wanderlust.com', label: 'Email' },
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
      title: 'Destinations',
      links: [
        { label: 'Europe', href: '#' },
        { label: 'Asie', href: '#' },
        { label: 'Amérique', href: '#' },
        { label: 'Afrique', href: '#' },
      ]
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Guide voyage', href: '#' },
        { label: 'Conseils', href: '#' },
        { label: 'Newsletter', href: '#' },
        { label: 'FAQ', href: '#' },
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
                <Plane className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Wanderlust</span>
              </div>
              <p className="text-accent-foreground/80 mb-6 leading-relaxed">
                Votre compagnon de voyage pour explorer le monde avec passion et authenticité. 
                Découvrez des destinations extraordinaires à travers nos récits inspirants.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-travel group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-travel" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-accent-foreground/80 hover:text-primary transition-travel cursor-pointer"
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
            <h3 className="font-semibold text-lg mb-2">
              Restez connecté à nos aventures
            </h3>
            <p className="text-accent-foreground/80 mb-4">
              Recevez nos derniers articles et conseils de voyage
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-accent-foreground/20 text-accent-foreground placeholder-accent-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-travel font-medium">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-accent-foreground/60">
            <p>
              © {currentYear} Wanderlust. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-travel">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary transition-travel">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-primary transition-travel">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;