import { useState } from "react";
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
  Medal,
  Target,
  TrendingUp,
  Award,
  Coins
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
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
  const navigate = useNavigate();

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
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight"
              >
                Bringing out the healthy competitor in me with{" "}
                <span className="text-primary font-extrabold">RankMe</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Transform learning into an exciting adventure with gamified education, real-time rankings, and achievement rewards.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
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
            
            {/* Animation Container */}
            <div className="relative flex justify-center lg:justify-end h-[500px] lg:h-[600px]">
              {/* Background Elements */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-accent/10"
              />
              
              {/* Floating Student Characters */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.5 }}
                className="absolute top-16 left-8 bg-white rounded-full p-3 shadow-lg border-2 border-primary/20"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.7 }}
                className="absolute top-20 right-12 bg-white rounded-full p-3 shadow-lg border-2 border-accent/20"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  B
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.9 }}
                className="absolute bottom-24 left-4 bg-white rounded-full p-3 shadow-lg border-2 border-primary/20"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  C
                </div>
              </motion.div>

              {/* Smartphone Container */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-10"
              >
                {/* Phone Frame */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 0.7, 0.7] }}
                  transition={{ duration: 0.8, delay: 2.5, times: [0, 0.5, 1] }}
                  className="relative w-48 h-96 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl mx-auto"
                >
                  {/* Phone Screen */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-[2rem] overflow-hidden relative">
                    {/* App Interface Elements */}
                    <div className="p-4 h-full flex flex-col">
                      <div className="text-center mb-4">
                        <div className="text-xs font-bold text-primary">RankMe</div>
                        <div className="text-[0.5rem] text-muted-foreground">School Portal</div>
                      </div>
                      
                      {/* Mini Leaderboard */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-white/80 rounded-lg p-2 mb-3"
                      >
                        <div className="text-[0.4rem] font-semibold mb-1">Top Students</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[0.35rem]">
                            <span>Alex M.</span>
                            <span className="text-primary font-bold">1,250pts</span>
                          </div>
                          <div className="flex justify-between text-[0.35rem]">
                            <span>Sarah K.</span>
                            <span className="text-accent font-bold">1,180pts</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Dolphin in Phone */}
                      <motion.div
                        initial={{ scale: 1, y: 0 }}
                        animate={{ 
                          scale: [1, 1.1, 1, 1.1, 1],
                          y: [0, -5, 0, -3, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="flex-1 flex items-center justify-center relative"
                      >
                        <motion.img
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                          src={dolphinMascot}
                          alt="Dolphin in phone"
                          className="w-16 h-16 object-contain"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Jumping Dolphin */}
                <motion.img
                  initial={{ 
                    scale: 0.8, 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    scale: [0.8, 2.5, 2.2],
                    x: [0, 60, 50],
                    y: [0, -120, -100],
                    opacity: [0, 1, 1],
                    rotate: [0, 15, 10]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 2.5,
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                  }}
                  src={dolphinMascot}
                  alt="Jumping Dolphin"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 object-contain z-20"
                />

                {/* Water Splash Effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 0.8, delay: 2.6 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 z-15"
                />
              </motion.div>

              {/* Scattered Gamification Elements */}
              {/* Coins */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 1], 
                  opacity: [0, 1, 1],
                  x: [-80, -120, -100],
                  y: [-40, -80, -60]
                }}
                transition={{ duration: 0.8, delay: 3.0, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  <Coins className="w-5 h-5 text-yellow-800" />
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 1], 
                  opacity: [0, 1, 1],
                  x: [80, 120, 100],
                  y: [-60, -100, -80]
                }}
                transition={{ duration: 0.8, delay: 3.1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  <Coins className="w-4 h-4 text-yellow-800" />
                </div>
              </motion.div>

              {/* Trophies */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 1], 
                  opacity: [0, 1, 1],
                  x: [40, 80, 70],
                  y: [60, 120, 100]
                }}
                transition={{ duration: 0.8, delay: 3.2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 shadow-lg">
                  <Trophy className="w-6 h-6 text-yellow-800" />
                </div>
              </motion.div>

              {/* Stars */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 1], 
                  opacity: [0, 1, 1],
                  x: [-60, -100, -80],
                  y: [80, 140, 120],
                  rotate: [0, 360, 360]
                }}
                transition={{ duration: 1, delay: 3.3, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-2 shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              {/* Medals */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 1], 
                  opacity: [0, 1, 1],
                  x: [100, 150, 130],
                  y: [40, 80, 60]
                }}
                transition={{ duration: 0.8, delay: 3.4, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-full p-2 shadow-lg">
                  <Medal className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              {/* Floating Leaderboard Card */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 30, y: 0 }}
                animate={{ 
                  scale: [0, 1, 1], 
                  opacity: [0, 1, 1],
                  x: [30, -120, -100],
                  y: [0, -20, 0]
                }}
                transition={{ duration: 0.8, delay: 3.1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-white rounded-lg p-3 shadow-xl border border-primary/20 min-w-[120px]">
                  <div className="text-xs font-bold text-primary mb-2 text-center">🏆 Leaderboard</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[0.6rem]">
                      <span>🥇 Alex</span>
                      <span className="text-primary font-bold">1,250</span>
                    </div>
                    <div className="flex justify-between text-[0.6rem]">
                      <span>🥈 Sarah</span>
                      <span className="text-accent font-bold">1,180</span>
                    </div>
                    <div className="flex justify-between text-[0.6rem]">
                      <span>🥉 Mike</span>
                      <span className="text-muted-foreground font-bold">980</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sparkle Effects */}
              {Array.from({length: 6}).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 3.5 + (i * 0.1),
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute"
                  style={{
                    top: `${30 + (i * 10)}%`,
                    left: `${20 + (i * 15)}%`,
                  }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div>
                </motion.div>
              ))}

              {/* Final Settling Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ duration: 1, delay: 5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [10, 15, 10]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >

                  {/* Badge on dolphin's nose */}
                 
                </motion.div>
              </motion.div>
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