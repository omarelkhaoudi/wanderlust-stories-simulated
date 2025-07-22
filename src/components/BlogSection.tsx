import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, User, Edit, Trash2, Plus, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import blog1 from '@/assets/blog1.jpg';
import blog2 from '@/assets/blog2.jpg';
import blog3 from '@/assets/blog3.jpg';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  author: string;
}

interface BlogSectionProps {
  isAuthenticated: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isAuthenticated }) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    summary: '',
    image: '',
  });

  // Initialize with mock data
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Paradis tropical aux Maldives',
        summary: 'Découvrez les eaux cristallines et les plages de sable blanc de cet archipel paradisiaque. Une expérience inoubliable entre détente et aventures aquatiques.',
        image: blog1,
        date: '2024-01-15',
        author: 'Marie Dubois'
      },
      {
        id: '2',
        title: 'Trekking dans les Alpes suisses',
        summary: 'Un voyage époustouflant à travers les sommets enneigés et les vallées verdoyantes. Randonnées spectaculaires et paysages à couper le souffle.',
        image: blog2,
        date: '2024-01-10',
        author: 'Thomas Martin'
      },
      {
        id: '3',
        title: 'Architecture européenne à Prague',
        summary: 'Plongez dans l\'histoire fascinante de Prague, entre châteaux médiévaux, ponts légendaires et une architecture gothique préservée.',
        image: blog3,
        date: '2024-01-05',
        author: 'Sophie Laurent'
      }
    ];

    // Load from localStorage or use mock data
    const savedPosts = localStorage.getItem('wanderlust-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(mockPosts);
      localStorage.setItem('wanderlust-posts', JSON.stringify(mockPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('wanderlust-posts', JSON.stringify(posts));
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
      image: newPost.image || blog1, // Use default image if none provided
      date: new Date().toISOString().split('T')[0],
      author: 'Auteur connecté'
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', summary: '', image: '' });
    setShowAddForm(false);
    
    toast({
      title: "Article ajouté",
      description: "Votre nouvel article a été publié avec succès !",
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
            <BookOpen className="h-8 w-8 text-secondary mr-3" />
            <span className="text-secondary font-semibold text-lg">Nos aventures</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Blog de voyage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explorez nos dernières aventures et laissez-vous inspirer par nos récits de voyage 
            aux quatre coins du monde.
          </p>

          {/* Add Post Button (Only if authenticated) */}
          {isAuthenticated && (
            <Button
              variant="travel"
              onClick={() => setShowAddForm(!showAddForm)}
              className="mb-8"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un article
            </Button>
          )}
        </div>

        {/* Add Post Form */}
        {isAuthenticated && showAddForm && (
          <Card className="p-6 mb-12 animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Nouvel article
            </h3>
            <div className="space-y-4">
              <Input
                placeholder="Titre de l'article"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Résumé de l'article"
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
                <Button onClick={handleAddPost}>
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
              className="overflow-hidden hover:shadow-travel-elevated transition-travel group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-travel"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-travel" />
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
                  <Button variant="link" className="p-0 h-auto">
                    Lire la suite
                  </Button>
                  
                  {/* Admin Actions (Only if authenticated) */}
                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
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
                ? "Commencez par ajouter votre premier article !" 
                : "Les articles seront bientôt disponibles."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;