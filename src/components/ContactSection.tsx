import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
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
        description: "Nous vous répondrons dans les plus brefs délais.",
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
      content: 'contact@wanderlust.com',
      description: 'Écrivez-nous à tout moment'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+33 1 23 45 67 89',
      description: 'Lun-Ven 9h-18h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Paris, France',
      description: 'Siège social'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Send className="h-8 w-8 text-secondary mr-3" />
            <span className="text-secondary font-semibold text-lg">Restons en contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une question sur nos voyages ? Une suggestion d'article ? 
            N'hésitez pas à nous contacter, nous serions ravis d'échanger avec vous !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 animate-slide-up">
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
                  placeholder="Votre message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="h-5 w-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Informations de contact
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 hover:shadow-travel transition-travel">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-secondary" />
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

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h4 className="font-semibold text-foreground text-lg mb-3">
                Temps de réponse
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous efforçons de répondre à tous les messages dans les 24 heures. 
                Pour les demandes urgentes, n'hésitez pas à nous appeler directement.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;