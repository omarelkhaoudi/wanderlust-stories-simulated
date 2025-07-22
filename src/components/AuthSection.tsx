import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthSectionProps {
  isAuthenticated: boolean;
  onLogin: (email: string) => void;
  onLogout: () => void;
  userEmail: string | null;
}

const AuthSection: React.FC<AuthSectionProps> = ({ 
  isAuthenticated, 
  onLogin, 
  onLogout, 
  userEmail 
}) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!loginData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (!registerData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!registerData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!registerData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateLogin()) {
      // Simulate login - in real app, this would be an API call
      onLogin(loginData.email);
      
      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${loginData.email}`,
      });
      
      setLoginData({ email: '', password: '' });
      setErrors({});
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateRegister()) {
      // Simulate registration - in real app, this would be an API call
      onLogin(registerData.email);
      
      toast({
        title: "Inscription réussie !",
        description: `Bienvenue ${registerData.name} !`,
      });
      
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    }
  };

  const handleInputChange = (form: 'login' | 'register', field: string, value: string) => {
    if (form === 'login') {
      setLoginData({ ...loginData, [field]: value });
    } else {
      setRegisterData({ ...registerData, [field]: value });
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (isAuthenticated) {
    return (
      <section id="auth" className="py-20 bg-background">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Connecté
              </h2>
              <p className="text-muted-foreground">
                {userEmail}
              </p>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Vous êtes maintenant connecté et pouvez gérer le contenu du blog.
            </p>
            
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="w-full"
            >
              Se déconnecter
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="auth" className="py-20 bg-muted/30">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-secondary mr-3" />
            <span className="text-secondary font-semibold text-lg">Espace membre</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Connexion
          </h2>
          <p className="text-muted-foreground">
            Connectez-vous pour gérer le contenu du blog
          </p>
        </div>

        <Card className="p-6 animate-slide-up">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Inscription
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    value={loginData.password}
                    onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Input
                    placeholder="Nom complet"
                    value={registerData.name}
                    onChange={(e) => handleInputChange('register', 'name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    value={registerData.password}
                    onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    value={registerData.confirmPassword}
                    onChange={(e) => handleInputChange('register', 'confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  S'inscrire
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default AuthSection;