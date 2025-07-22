import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, User, Edit, Trash2, Plus, BookOpen, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import blogMarrakech from '@/assets/blog-marrakech.jpg';
import blogSahara from '@/assets/blog-sahara.jpg';
import blogChefchaouen from '@/assets/blog-chefchaouen.jpg';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  author: string;
  location: string;
}

interface BlogMoroccoProps {
  isAuthenticated: boolean;
}

const BlogMorocco: React.FC<BlogMoroccoProps> = ({ isAuthenticated }) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    summary: '',
    image: '',
    location: '',
  });

  // Initialize with Morocco-specific mock data
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Marrakech : La Perle Rouge du Maroc',
        summary: 'Plongez dans l\'effervescence de la médina de Marrakech, ses souks colorés, ses riads somptueux et la magie de la place Jemaa el-Fna. Une expérience sensorielle inoubliable au cœur du Maroc impérial.',
        image: blogMarrakech,
        date: '2024-01-15',
        author: 'Youssef El Amrani',
        location: 'Marrakech'
      },
      {
        id: '2',
        title: 'Sahara : Nuits Étoilées et Dunes Dorées',
        summary: 'Découvrez la majesté du désert du Sahara, de Merzouga à Erg Chebbi. Randonnées à dos de chameau, nuits sous les étoiles et hospitalité nomade vous attendent dans cette aventure extraordinaire.',
        image: blogSahara,
        date: '2024-01-10',
        author: 'Aicha Berrada',
        location: 'Merzouga, Sahara'
      },
      {
        id: '3',
        title: 'Chefchaouen : La Ville Bleue des Montagnes',
        summary: 'Explorez les ruelles bleutées de Chefchaouen, perchée dans les montagnes du Rif. Architecture andalouse, artisanat local et panoramas époustouflants vous séduiront dans cette perle du nord marocain.',
        image: blogChefchaouen,
        date: '2024-01-05',
        author: 'Omar Benali',
        location: 'Chefchaouen'
      }
    ];

    // Load from localStorage or use mock data
    const savedPosts = localStorage.getItem('morocco-blog-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(mockPosts);
      localStorage.setItem('morocco-blog-posts', JSON.stringify(mockPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('morocco-blog-posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.summary) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      summary: newPost.summary,
      image: newPost.image || blogMarrakech, // Use default Morocco image
      location: newPost.location || 'Maroc',
      date: new Date().toISOString().split('T')[0],
      author: 'Auteur connecté'
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', summary: '', image: '', location: '' });
    setShowAddForm(false);
    
    toast({
      title: "Article ajouté",
      description: "Votre nouvel article sur le Maroc a été publié !",
    });
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé avec succès.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 text-secondary mr-3 animate-float-medina" />
            <span className="text-secondary font-semibold text-lg">🏛️ Nos aventures marocaines</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-morocco">
            Blog
            <span className="block bg-gradient-morocco bg-clip-text text-transparent">
              Maroc
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez nos dernières aventures à travers le royaume chérifien. 
            De l'Atlas au Sahara, de Fès à Essaouira, laissez-vous transporter par nos récits authentiques.
          </p>

          {/* Add Post Button (Only if authenticated) */}
          {isAuthenticated && (
            <Button
              variant="medina"
              onClick={() => setShowAddForm(!showAddForm)}
              className="mb-8 animate-slide-caravan"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un article
            </Button>
          )}
        </div>

        {/* Add Post Form */}
        {isAuthenticated && showAddForm && (
          <Card className="p-6 mb-12 animate-fade-in-morocco shadow-medina">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Nouvel article sur le Maroc
            </h3>
            <div className="space-y-4">
              <Input
                placeholder="Titre de l'article"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Input
                placeholder="Lieu au Maroc (ex: Marrakech, Fès, Sahara...)"
                value={newPost.location}
                onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
              />
              <Textarea
                placeholder="Résumé de votre expérience au Maroc"
                rows={4}
                value={newPost.summary}
                onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
              />
              <Input
                placeholder="URL de l'image (optionnel)"
                value={newPost.image}
                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
              />
              <div className="flex gap-4">
                <Button onClick={handleAddPost} variant="morocco">
                  Publier l'article
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-medina transition-moroccan group animate-fade-in-morocco hover-scale-morocco"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-moroccan"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-moroccan" />
                <div className="absolute top-4 left-4">
                  <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {post.location}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="link" className="p-0 h-auto text-secondary">
                    Lire la suite
                  </Button>
                  
                  {/* Admin Actions (Only if authenticated) */}
                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Aucun article pour le moment
            </h3>
            <p className="text-muted-foreground">
              {isAuthenticated 
                ? "Commencez par ajouter votre première aventure marocaine !" 
                : "Les récits de voyage au Maroc seront bientôt disponibles."}
            </p>
          </div>
        )}

        {/* Cultural Note */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-gradient-sahara rounded-2xl shadow-morocco max-w-2xl">
            <p className="text-lg font-medium text-foreground mb-2">
              🕌 "Qui n'a pas vu Marrakech n'a rien vu"
            </p>
            <p className="text-muted-foreground">
              Proverbe marocain - Chaque ville, chaque région du Maroc raconte une histoire unique
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogMorocco;