"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  FileText,
  Bell,
  CheckCircle,
  ArrowRight,
  Camera,
  Mic,
  Navigation,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Zap,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Stats counter animation
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="number-display">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Camera,
      title: "Photo & Video Upload",
      description:
        "Capture and submit visual evidence of infrastructure issues for faster verification and response.",
      gradient: "linear-gradient(135deg, #14b8a6, #0d9488)",
    },
    {
      icon: Navigation,
      title: "GPS Location Tagging",
      description:
        "Automatic location detection ensures your report reaches the exact spot that needs attention.",
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    },
    {
      icon: Mic,
      title: "Voice-to-Text",
      description:
        "Speak your report for hands-free submission, making it accessible for everyone.",
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    },
    {
      icon: Bell,
      title: "Real-Time Updates",
      description:
        "Get notified instantly when your report status changes, from submission to resolution.",
      gradient: "linear-gradient(135deg, #f43f5e, #e11d48)",
    },
    {
      icon: Shield,
      title: "Data Privacy Compliant",
      description:
        "Your information is protected under the Data Privacy Act of 2012 with secure encryption.",
      gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
    },
    {
      icon: TrendingUp,
      title: "AI-Powered Classification",
      description:
        "Smart image recognition automatically categorizes issues for faster routing to the right department.",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
  ];

  const stats = [
    { value: 2847, label: "Reports Submitted", suffix: "+" },
    { value: 89, label: "Resolution Rate", suffix: "%" },
    { value: 24, label: "Avg Response Time", suffix: "hrs" },
    { value: 14, label: "Barangays Covered", suffix: "" },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Submit Your Report",
      description:
        "Take a photo, describe the issue, and let GPS tag the location automatically.",
      icon: FileText,
    },
    {
      step: 2,
      title: "AI Categorization",
      description:
        "Our system analyzes your report and routes it to the appropriate LGU department.",
      icon: Zap,
    },
    {
      step: 3,
      title: "Track Progress",
      description:
        "Receive real-time updates as your report moves through the resolution process.",
      icon: Bell,
    },
    {
      step: 4,
      title: "Issue Resolved",
      description:
        "Get notified when the infrastructure issue has been fixed by the local government.",
      icon: CheckCircle,
    },
  ];

  const recentReports = [
    {
      id: "SM-2K4X-AB12",
      category: "Roads & Potholes",
      location: "Brgy. Guinayang",
      status: "in-progress",
      time: "2 hours ago",
      icon: "🛣️",
    },
    {
      id: "SM-3Y5Z-CD34",
      category: "Streetlights",
      location: "Brgy. Malanday",
      status: "resolved",
      time: "5 hours ago",
      icon: "💡",
    },
    {
      id: "SM-1W2X-EF56",
      category: "Drainage",
      location: "Brgy. Ampid I",
      status: "pending",
      time: "8 hours ago",
      icon: "🌊",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 pattern-grid opacity-20" />

        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#14b8a6]/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f43f5e]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />

        <div className="section-container relative z-10 py-24">
          <div className="text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-sm font-medium">
                Now serving San Mateo, Rizal
              </span>
            </div>

            {/* Main heading */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Report. Track.
              <br />
              <span className="bg-gradient-to-r from-[#5eead4] via-[#2dd4bf] to-[#fb7185] bg-clip-text text-transparent">
                Transform Your Community.
              </span>
          </h1>

            <p
              className={`text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              InfrasTrackTure connects citizens with local government for faster
              infrastructure repairs. Submit reports, track progress, and see your
              community improve.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="/report">
                <Button size="lg" className="min-w-[200px] text-base">
                  <FileText className="w-5 h-5" />
                  Report an Issue
                </Button>
              </Link>
              <Link href="/track">
                <Button variant="outline" size="lg" className="min-w-[200px] text-base border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <Bell className="w-5 h-5" />
                  Track Your Report
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`stats-grid transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-50" />
        
        <div className="section-container relative">
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4">
              Everything You Need to
              <span className="text-[#14b8a6]"> Make a Difference</span>
            </h2>
            <p className="text-[#64748b] max-w-2xl mx-auto">
              Our platform is designed to make infrastructure reporting as simple and
              effective as possible for both citizens and government officials.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div 
                  className="icon-box"
                  style={{ background: feature.gradient }}
                >
                  <feature.icon style={{ width: '36px', height: '36px', color: 'white' }} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4">
              How It <span className="text-[#14b8a6]">Works</span>
            </h2>
            <p className="text-[#64748b] max-w-2xl mx-auto">
              From report to resolution in four simple steps
            </p>
          </div>

          <div className="how-it-works-grid">
            {howItWorks.map((item, index) => (
              <div key={index} className="step-card">
                <div className="icon-wrapper">
                  <div className="step-icon-box">
                    <item.icon style={{ width: '48px', height: '48px', color: '#0d9488' }} />
                  </div>
                  <div className="step-number">{item.step}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reports Preview */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14b8a6]/10 rounded-full blur-3xl" />

        <div className="section-container relative">
          <div className="two-column-grid">
            <div>
              <Badge variant="warning" className="mb-4">Live Feed</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                See What&apos;s Being
                <span className="text-[#14b8a6]"> Reported</span>
              </h2>
              <p className="text-[#94a3b8] mb-8 leading-relaxed">
                Join hundreds of active citizens in San Mateo who are making their
                community better, one report at a time. Every report helps the LGU
                prioritize and address infrastructure issues faster.
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] border-2 border-[#0f172a] flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold">500+ Active Users</div>
                  <div className="text-[#64748b] text-sm">and growing daily</div>
                </div>
              </div>

              <Link href="/report">
                <Button size="lg">
                  Join the Movement
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{report.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">
                          {report.category}
                        </span>
                        <Badge
                          variant={
                            report.status === "resolved"
                              ? "success"
                              : report.status === "in-progress"
                              ? "progress"
                              : "pending"
                          }
                        >
                          {report.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-[#94a3b8] text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.time}
                        </span>
                      </div>
                      <div className="text-[#64748b] text-xs mt-2 font-mono">
                        ID: {report.id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        
        <div className="section-container relative text-center">
          <div className="cta-card">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Your report could be the one that fixes your street, lights up your
              neighborhood, or clears the drainage. Every submission matters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/report">
                <Button
                  variant="secondary"
                  size="lg"
                  className="min-w-[200px] bg-white text-[#0d9488] hover:bg-[#f0fdfa]"
                >
                  <FileText className="w-5 h-5" />
                  Submit a Report
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] border-white/30 text-white hover:bg-white/10"
                >
                  LGU Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </main>
  );
}
