import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactMorocco: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre intérêt pour le Maroc. Nous vous répondrons bientôt !",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@maroc-decouverte.com',
      description: 'Écrivez-nous à tout moment',
      color: 'text-secondary'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+212 5 24 00 00 00',
      description: 'Sam-Jeu 9h-18h (GMT+1)',
      color: 'text-primary'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      content: 'Marrakech, Maroc',
      description: 'Au cœur du royaume',
      color: 'text-accent'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-8 w-8 text-secondary mr-3 animate-float-medina" />
            <span className="text-secondary font-semibold text-lg">💬 Restons en contact</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-morocco">
            Contactez
            <span className="block bg-gradient-morocco bg-clip-text text-transparent">
              nous
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une question sur nos aventures marocaines ? Envie de partager votre propre expérience ? 
            Besoin de conseils pour votre prochain voyage au Maroc ? Nous sommes là pour vous !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 animate-slide-caravan shadow-medina">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Votre message sur le Maroc..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" variant="morocco">
                <Send className="h-5 w-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="animate-fade-in-morocco">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Informations de contact
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 hover:shadow-medina transition-moroccan hover-scale-morocco">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <info.icon className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg mb-1">
                        {info.title}
                      </h4>
                      <p className="text-foreground font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Additional Info Cards */}
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-sahara">
                <h4 className="font-semibold text-foreground text-lg mb-3">
                  🕒 Temps de réponse
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Nous nous efforçons de répondre à tous les messages dans les 24 heures. 
                  Pour les questions urgentes concernant vos voyages au Maroc, n'hésitez pas à nous appeler.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10">
                <h4 className="font-semibold text-foreground text-lg mb-3">
                  🗣️ Langues parlées
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Français', 'Arabe', 'Berbère', 'Anglais'].map((lang) => (
                    <span key={lang} className="bg-background/60 px-3 py-1 rounded-full text-sm font-medium text-foreground">
                      {lang}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Cultural Quote */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-gradient-morocco rounded-2xl shadow-medina max-w-2xl">
            <p className="text-lg font-medium text-accent-foreground mb-2">
              🤝 "L'hospitalité est la vertu des grands cœurs"
            </p>
            <p className="text-accent-foreground/80">
              Tradition marocaine - Votre message est le bienvenu dans notre communauté
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMorocco;