import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  BarChart3, 
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  GraduationCap,
  Megaphone,
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import dolphinMascot from "@/assets/dolphin-mascot.png";
import dolphinMascotSmall from "@/assets/dolphin-mascot-small.png";

const RankMeLanding = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    schoolName: "",
    password: ""
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const navigate = useNavigate();
  const mascotControls = useAnimation();
  const phoneControls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      // Wait 2 seconds before starting animation
      setTimeout(async () => {
        setAnimationStarted(true);
        
        // Animate dolphin popping out and growing
        await mascotControls.start({
          scale: 1.5,
          y: -50,
          rotate: 10,
          transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0.4
          }
        });
        
        // Shrink phone
        phoneControls.start({
          scale: 0.8,
          transition: {
            duration: 0.6,
            ease: "easeInOut"
          }
        });
      }, 2000);
    };

    startAnimation();
  }, [mascotControls, phoneControls]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.schoolName || !signupData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Save school name to localStorage for Landing.tsx
    localStorage.setItem("schoolName", signupData.schoolName);

    // Generate subdomain from school name
    const subdomain = signupData.schoolName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20);

    toast.success(`School account created! Subdomain: ${subdomain}.rankme.edu`);
    
    // For now, redirect to the existing portal
    navigate("/portal");
  };

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Easy Assignment Management",
      description: "Create, distribute, and grade assignments with powerful tools that make teaching more efficient.",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Motivation through Leaderboards",
      description: "Real-time rankings and point systems that turn learning into an engaging competition.",
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "School-wide Announcements",
      description: "Keep everyone informed with instant announcements and important updates across your school.",
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "₦50k/month",
      description: "Perfect for small schools getting started",
      features: ["Leaderboard (within school)", "Assignments, notes, announcements", "Manage teachers & students", "Up to 200 students"],
      recommended: false,
      isPopular: false
    },
    {
      name: "Standard",
      price: "₦120k/month",
      description: "Great for medium-sized schools",
      features: ["Everything in Basic", "School-to-School comparison", "Reports & Analytics", "Up to 700 students"],
      recommended: true,
      isPopular: true
    },
    {
      name: "Premium",
      price: "₦250k/month",
      description: "Full features for large schools",
      features: ["Everything in Standard", "Custom Branding", "Unlimited students & teachers", "Priority support"],
      recommended: false,
      isPopular: false
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={dolphinMascotSmall} alt="RankMe Mascot" className="h-8 w-8" />
            <span className="text-2xl font-bold text-primary">RankMe</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/portal")}>
            Demo Portal
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative order-2 lg:order-1">
              <motion.h1 
                className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Bringing out the healthy competitor in me with{" "}
                <span className="text-primary font-extrabold">RankMe</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Making learning fun and engaging with RankMe
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Button 
                  size="lg" 
                  className="px-10 py-4 text-lg font-semibold bg-primary hover:bg-accent text-white"
                  onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-10 py-4 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate("/portal")}
                >
                  See Demo Portal
                </Button>
              </motion.div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 min-h-[500px]">
              {/* Background elements */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="w-64 h-64 rounded-full bg-primary/5"></div>
                <div className="absolute w-48 h-48 rounded-full bg-accent/10 -top-8 -right-8"></div>
                <div className="absolute w-32 h-32 rounded-full bg-primary/10 -bottom-4 -left-4"></div>
              </motion.div>

              {/* Phone Mockup */}
              <motion.div 
                className="relative z-20 flex items-center justify-center"
                animate={phoneControls}
                initial={{ scale: 1 }}
              >
                <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl">
                  <div className="bg-white rounded-[2rem] w-64 h-[480px] overflow-hidden relative">
                    {/* Phone screen content */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
                      <motion.img 
                        src={dolphinMascot} 
                        alt="RankMe Dolphin in Phone" 
                        className="w-32 h-32 object-contain"
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    
                    {/* Phone UI elements */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/80 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-600 font-medium">RankMe</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Popping Dolphin */}
              <motion.div
                className="absolute z-30 flex items-center justify-center"
                animate={mascotControls}
                initial={{ scale: 0, y: 0, rotate: 0, opacity: 0 }}
                style={{ opacity: animationStarted ? 1 : 0 }}
              >
                <img 
                  src={dolphinMascot} 
                  alt="RankMe Dolphin Mascot" 
                  className="w-48 h-48 object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating Educational Icons */}
              {animationStarted && (
                <>
                  <motion.div
                    className="absolute z-10 text-primary"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: -120, 
                      y: -80,
                      rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 3,
                      rotate: { repeat: Infinity, duration: 4 }
                    }}
                  >
                    <BookOpen className="h-8 w-8" />
                  </motion.div>

                  <motion.div
                    className="absolute z-10 text-yellow-500"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: 140, 
                      y: [-60, -50, -60]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 3.2,
                      y: { repeat: Infinity, duration: 3 }
                    }}
                  >
                    <Trophy className="h-8 w-8" />
                  </motion.div>

                  <motion.div
                    className="absolute z-10 text-purple-500"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: -100, 
                      y: 100,
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 3.4,
                      rotate: { repeat: Infinity, duration: 8 }
                    }}
                  >
                    <GraduationCap className="h-8 w-8" />
                  </motion.div>

                  <motion.div
                    className="absolute z-10 text-green-500"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [1, 1.2, 1],
                      x: 120, 
                      y: 80
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 3.6,
                      scale: { repeat: Infinity, duration: 2 }
                    }}
                  >
                    <TrendingUp className="h-8 w-8" />
                  </motion.div>

                  <motion.div
                    className="absolute z-10 text-red-500"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: [0, 15, -15, 0],
                      y: -120
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 3.8,
                      x: { repeat: Infinity, duration: 4 }
                    }}
                  >
                    <Star className="h-8 w-8" />
                  </motion.div>

                  <motion.div
                    className="absolute z-10 text-orange-500"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: -160, 
                      y: 20,
                      rotate: [0, -15, 15, 0]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 4,
                      rotate: { repeat: Infinity, duration: 3 }
                    }}
                  >
                    <Award className="h-8 w-8" />
                  </motion.div>

                  <motion.div
                    className="absolute z-10 text-blue-600"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: 160, 
                      y: [20, 10, 20]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 4.2,
                      y: { repeat: Infinity, duration: 2.5 }
                    }}
                  >
                    <Target className="h-8 w-8" />
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to make education more engaging and effective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-medium transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-xl text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your school. Start free, upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative border-2 transition-all duration-300 ${
                plan.isPopular 
                  ? 'border-primary shadow-large bg-white' 
                  : 'border-border hover:shadow-medium bg-white'
              }`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  </div>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.isPopular 
                        ? 'bg-primary hover:bg-accent hover:text-accent-foreground' 
                        : 'bg-primary hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {plan.name === "Basic" ? "Start Free Trial" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about RankMe
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-4 bg-white">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
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
      <section id="signup" className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Ready to Transform Your School?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join schools already using RankMe. Start your 14-day free trial today.
              </p>
            </div>

            <Card className="border-2 shadow-large bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Your School Account</CardTitle>
                <CardDescription className="text-lg">
                  Setup takes less than 2 minutes. No credit card required for trial.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="e.g. John Smith"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="principal@yourschool.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  
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
                    className="w-full py-6 text-lg bg-primary hover:bg-accent hover:text-accent-foreground"
                  >
                    Create My Account
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
      <footer className="bg-surface py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={dolphinMascotSmall} alt="RankMe Mascot" className="h-8 w-8" />
                <span className="text-2xl font-bold text-primary">RankMe</span>
              </div>
              <p className="text-muted-foreground">
                Making learning fun and engaging through healthy competition.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Training</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 RankMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RankMeLanding;