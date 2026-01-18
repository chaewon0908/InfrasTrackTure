"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Camera,
  Upload,
  Mic,
  MapPin,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  X,
  Image as ImageIcon,
  Video,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Input, { Textarea } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { cn, BARANGAYS_SAN_MATEO, ISSUE_CATEGORIES, generateReportId } from "@/lib/utils";

// Dynamic import for map (no SSR)
const LocationPicker = dynamic(
  () => import("@/components/maps/LocationPicker"),
  { ssr: false, loading: () => <div className="h-[300px] bg-[#f1f5f9] rounded-xl animate-pulse" /> }
);

interface ReportFormData {
  category: string;
  description: string;
  barangay: string;
  streetAddress: string;
  latitude: number | null;
  longitude: number | null;
  images: File[];
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
}

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");
  const [formData, setFormData] = useState<ReportFormData>({
    category: "",
    description: "",
    barangay: "",
    streetAddress: "",
    latitude: null,
    longitude: null,
    images: [],
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const steps = [
    { number: 1, title: "Issue Details", icon: FileText },
    { number: 2, title: "Location", icon: MapPin },
    { number: 3, title: "Your Info", icon: CheckCircle },
  ];

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newReportId = generateReportId();
    setReportId(newReportId);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.category && formData.description.length >= 20;
      case 2:
        return formData.barangay && formData.latitude && formData.longitude;
      case 3:
        return formData.reporterName && (formData.reporterPhone || formData.reporterEmail);
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4">
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center animate-pulse-glow">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-[#0f172a] mb-4">
                  Report Submitted Successfully!
                </h1>
                <p className="text-[#64748b] mb-8">
                  Thank you for helping improve San Mateo. Your report has been received
                  and will be reviewed by the appropriate department.
                </p>

                <div className="bg-[#f0fdfa] rounded-2xl p-6 mb-8">
                  <p className="text-sm text-[#64748b] mb-2">Your Report ID</p>
                  <p className="text-2xl font-mono font-bold text-[#0d9488]">
                    {reportId}
                  </p>
                  <p className="text-sm text-[#64748b] mt-2">
                    Save this ID to track your report status
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={`/track?id=${reportId}`}>
                    <Button>
                      Track Your Report
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">
            Report Infrastructure Issue
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Help Us Improve Your Community
          </h1>
          <p className="text-white/80">
            Your report helps the LGU prioritize and address infrastructure issues faster
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      currentStep >= step.number
                        ? "bg-gradient-to-br from-[#0d9488] to-[#14b8a6] text-white"
                        : "bg-[#f1f5f9] text-[#94a3b8]"
                    )}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        currentStep >= step.number ? "text-[#0f172a]" : "text-[#94a3b8]"
                      )}
                    >
                      Step {step.number}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        currentStep >= step.number ? "text-[#64748b]" : "text-[#cbd5e1]"
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-4 rounded-full transition-all",
                      currentStep > step.number ? "bg-[#14b8a6]" : "bg-[#e2e8f0]"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "What's the issue?"}
              {currentStep === 2 && "Where is it located?"}
              {currentStep === 3 && "Your contact information"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Select a category and describe the problem in detail"}
              {currentStep === 2 && "Help us find the exact location of the issue"}
              {currentStep === 3 && "We'll use this to send you updates about your report"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Step 1: Issue Details */}
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#334155] mb-4">
                    Select Issue Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ISSUE_CATEGORIES.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => handleCategorySelect(category.value)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          formData.category === category.value
                            ? "border-[#14b8a6] bg-[#f0fdfa]"
                            : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                        )}
                      >
                        <span className="text-3xl">{category.icon}</span>
                        <span className="text-sm font-medium text-[#334155] text-center">
                          {category.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <Textarea
                  label="Describe the Issue"
                  placeholder="Please provide as much detail as possible. What is the problem? How severe is it? How long has it been like this?"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  helperText={`${formData.description.length}/500 characters (minimum 20)`}
                  className="min-h-[150px]"
                />

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#334155] mb-4">
                    Upload Photos/Videos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-[#e2e8f0] rounded-xl p-8 text-center hover:border-[#14b8a6] transition-colors">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#f0fdfa] flex items-center justify-center">
                          <Upload className="w-8 h-8 text-[#14b8a6]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#0f172a]">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-[#64748b]">
                            PNG, JPG, MP4 up to 10MB (max 5 files)
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[#64748b]">
                          <span className="flex items-center gap-1">
                            <Camera className="w-4 h-4" />
                            Photo
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            Video
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {previewImages.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-xl border-2 border-[#e2e8f0]"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#ef4444] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Voice Input */}
                <div className="flex items-center gap-4 p-4 bg-[#f1f5f9] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Mic className="w-6 h-6 text-[#64748b]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#0f172a]">Voice-to-Text</p>
                    <p className="text-sm text-[#64748b]">
                      Click to speak your report (coming soon)
                    </p>
                  </div>
                  <Badge>Coming Soon</Badge>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Barangay Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#334155] mb-2">
                    Barangay
                  </label>
                  <select
                    value={formData.barangay}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, barangay: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e2e8f0] bg-white text-[#0f172a] focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10 transition-all"
                  >
                    <option value="">Select a barangay...</option>
                    {BARANGAYS_SAN_MATEO.map((barangay) => (
                      <option key={barangay} value={barangay}>
                        {barangay}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Street Address */}
                <Input
                  label="Street Address / Landmark"
                  placeholder="e.g., Near Jollibee, Gen. Luna Street"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, streetAddress: e.target.value }))
                  }
                  helperText="Provide nearby landmarks for easier identification"
                />

                {/* Map */}
                <div>
                  <label className="block text-sm font-medium text-[#334155] mb-2">
                    Pin Exact Location
                  </label>
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    initialLocation={
                      formData.latitude && formData.longitude
                        ? { lat: formData.latitude, lng: formData.longitude }
                        : undefined
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-[#fef3c7] rounded-xl">
                  <AlertCircle className="w-5 h-5 text-[#92400e] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#92400e]">Privacy Notice</p>
                    <p className="text-sm text-[#a16207]">
                      Your information is protected under the Data Privacy Act of 2012.
                      We only use it to send you updates about your report.
                    </p>
                  </div>
                </div>

                <Input
                  label="Full Name"
                  placeholder="Juan Dela Cruz"
                  value={formData.reporterName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reporterName: e.target.value }))
                  }
                />

                <Input
                  label="Phone Number"
                  placeholder="09XX XXX XXXX"
                  type="tel"
                  value={formData.reporterPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reporterPhone: e.target.value }))
                  }
                />

                <Input
                  label="Email Address (Optional)"
                  placeholder="juan@email.com"
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reporterEmail: e.target.value }))
                  }
                  helperText="For email notifications"
                />

                {/* Summary */}
                <div className="bg-[#f1f5f9] rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-[#0f172a]">Report Summary</h4>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Category:</span>
                      <span className="text-[#0f172a] font-medium">
                        {ISSUE_CATEGORIES.find((c) => c.value === formData.category)?.label || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Location:</span>
                      <span className="text-[#0f172a] font-medium">
                        {formData.barangay || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Photos:</span>
                      <span className="text-[#0f172a] font-medium">
                        {formData.images.length} attached
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between p-6 border-t border-[#e2e8f0]">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button onClick={() => setCurrentStep((prev) => prev + 1)} disabled={!canProceed()}>
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed()} isLoading={isSubmitting}>
                <CheckCircle className="w-4 h-4" />
                Submit Report
              </Button>
            )}
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  );
}
