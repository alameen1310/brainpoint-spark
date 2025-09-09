import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  Trophy, 
  BarChart3, 
  Shield, 
  Zap,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RankMeLanding = () => {
  const [signupData, setSignupData] = useState({
    schoolName: "",
    adminEmail: "",
    password: ""
  });
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.schoolName || !signupData.adminEmail || !signupData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Generate subdomain from school name
    const subdomain = signupData.schoolName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20);

    // TODO: Integrate with Paystack payment
    toast.success(`School account created! Subdomain: ${subdomain}.rankme.edu`);
    
    // For now, redirect to the existing portal
    navigate("/portal");
  };

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "For Principals",
      description: "Manage your entire school with comprehensive admin tools",
      benefits: ["Add/remove teachers and students", "View school-wide leaderboards", "Compare with other schools", "Generate reports"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "For Teachers", 
      description: "Engage students with gamified learning experiences",
      benefits: ["Create assignments and quizzes", "Award points and badges", "Post announcements", "Track student progress"]
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "For Students",
      description: "Excel academically through competitive learning",
      benefits: ["Real-time leaderboards", "Earn points and badges", "Complete assignments", "Track academic progress"]
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: "₦15,000",
      yearlyPrice: "₦150,000",
      description: "Perfect for small schools",
      features: ["Up to 100 students", "5 teachers", "Basic analytics", "Email support"],
      recommended: false
    },
    {
      name: "Pro",
      monthlyPrice: "₦35,000", 
      yearlyPrice: "₦350,000",
      description: "Ideal for growing schools",
      features: ["Up to 500 students", "20 teachers", "Advanced analytics", "Priority support", "Custom branding"],
      recommended: true
    },
    {
      name: "Enterprise",
      monthlyPrice: "₦75,000",
      yearlyPrice: "₦750,000", 
      description: "For large institutions",
      features: ["Unlimited students", "Unlimited teachers", "Advanced reporting", "24/7 support", "API access", "White-label solution"],
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: "Dr. Adebayo Ogundimu",
      title: "Principal, Lagos International College",
      content: "RankMe transformed our school's academic culture. Student engagement increased by 85% and our WAEC results improved significantly.",
      rating: 5
    },
    {
      name: "Mrs. Chinelo Okoro",
      title: "Vice Principal, Green Valley School",
      content: "The leaderboard system motivated our students like never before. Teachers love the easy assignment management tools.",
      rating: 5
    },
    {
      name: "Mr. Emeka Nwankwo",
      title: "Academic Director, Royal Crown Academy",
      content: "Since implementing RankMe, parent satisfaction has increased and our students are more competitive than ever.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How does the subdomain system work?",
      answer: "When you sign up, we create a unique subdomain for your school (e.g., yourschool.rankme.edu). Teachers and students log in through this subdomain while you manage everything from the main admin dashboard."
    },
    {
      question: "Can I try RankMe before committing?",
      answer: "Yes! We offer a 14-day free trial for all new schools. You can explore all features and see how RankMe transforms your academic environment."
    },
    {
      question: "Is student data secure?",
      answer: "Absolutely. We use bank-level encryption and comply with international data protection standards. Student information is never shared with third parties."
    },
    {
      question: "How do points and rankings work?",
      answer: "Teachers award points for assignments, participation, and good behavior. Students are ranked based on total points within their school. Rankings update in real-time to maintain engagement."
    },
    {
      question: "Can parents track their child's progress?",
      answer: "Yes, we provide parent dashboards where they can monitor their child's points, ranking, assignments, and overall academic progress."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Nigeria&apos;s #1 School Management Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Transform Your School with
              <br />
              <span className="text-primary">RankMe</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Gamify education, boost engagement, and achieve academic excellence through competitive learning and real-time rankings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg border-2 hover:bg-primary/5"
                onClick={() => navigate("/portal")}
              >
                View Demo Portal
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Schools</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Engagement ↑</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">92%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Built for Everyone in Your School
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              RankMe provides tailored experiences for principals, teachers, and students to create a thriving academic ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-lg">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your school. All plans include core features with 14-day free trial.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <Label className={selectedPlan === "monthly" ? "font-semibold" : ""}>Monthly</Label>
              <Button
                variant="outline"
                size="sm"
                className="relative"
                onClick={() => setSelectedPlan(selectedPlan === "monthly" ? "yearly" : "monthly")}
              >
                <div className={`absolute inset-0 bg-primary rounded-md transition-transform duration-200 ${selectedPlan === "yearly" ? "translate-x-0" : "-translate-x-full"}`}></div>
                <span className="relative z-10 px-3">Toggle</span>
              </Button>
              <Label className={selectedPlan === "yearly" ? "font-semibold" : ""}>
                Yearly 
                <Badge variant="secondary" className="ml-2">Save 17%</Badge>
              </Label>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : 'border-2'} hover:shadow-xl transition-all duration-300`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      {selectedPlan === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-muted-foreground">/{selectedPlan === "monthly" ? "month" : "year"}</span>
                  </div>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.recommended ? 'bg-gradient-to-r from-primary to-accent' : ''}`}
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Trusted by Leading Schools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how RankMe is transforming education across Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about RankMe.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-4">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-left">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up Section */}
      <section id="signup" className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your School?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join hundreds of schools already using RankMe. Start your 14-day free trial today.
              </p>
            </div>

            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Your School Account</CardTitle>
                <CardDescription className="text-lg">
                  Setup takes less than 2 minutes. No credit card required for trial.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input
                      id="schoolName"
                      placeholder="e.g. Green Valley Academy"
                      value={signupData.schoolName}
                      onChange={(e) => setSignupData({...signupData, schoolName: e.target.value})}
                      className="mt-2"
                    />
                    {signupData.schoolName && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Your subdomain will be: <strong>{signupData.schoolName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20)}.rankme.edu</strong>
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="principal@yourschool.com"
                      value={signupData.adminEmail}
                      onChange={(e) => setSignupData({...signupData, adminEmail: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    Start Free Trial
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                    <br />
                    No credit card required. Cancel anytime during trial.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">RankMe</span>
              </div>
              <p className="text-muted-foreground">
                Transforming education through gamification and competitive learning.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 RankMe. All rights reserved. Made in Nigeria 🇳🇬</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RankMeLanding;