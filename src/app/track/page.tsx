"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileText,
  User,
  Calendar,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { cn, formatDateTime, getCategoryIcon } from "@/lib/utils";

// Mock data for demonstration
const mockReports: Record<string, Report> = {
  "SM-2K4X-AB12": {
    id: "SM-2K4X-AB12",
    category: "Roads & Potholes",
    description:
      "Large pothole on the main road near the elementary school. Approximately 1 meter wide and 6 inches deep. Multiple vehicles have been damaged.",
    barangay: "Brgy. Guinayang",
    streetAddress: "Near San Mateo Elementary School",
    latitude: 14.6978,
    longitude: 121.1203,
    status: "in-progress",
    priority: "high",
    submittedAt: new Date("2025-01-17T14:30:00"),
    updatedAt: new Date("2025-01-18T09:15:00"),
    department: "Engineering Office",
    assignedTo: "Road Maintenance Team A",
    updates: [
      {
        date: new Date("2025-01-17T14:30:00"),
        status: "submitted",
        message: "Report received and logged into the system.",
      },
      {
        date: new Date("2025-01-17T16:45:00"),
        status: "reviewed",
        message: "Report reviewed and categorized as high priority.",
      },
      {
        date: new Date("2025-01-18T08:00:00"),
        status: "assigned",
        message: "Assigned to Road Maintenance Team A for repair.",
      },
      {
        date: new Date("2025-01-18T09:15:00"),
        status: "in-progress",
        message: "Team dispatched to location. Repair work in progress.",
      },
    ],
    images: ["/placeholder-road.jpg"],
  },
  "SM-3Y5Z-CD34": {
    id: "SM-3Y5Z-CD34",
    category: "Streetlights",
    description:
      "Streetlight not working for over a week. Very dark at night and poses safety hazard for pedestrians.",
    barangay: "Brgy. Malanday",
    streetAddress: "Corner of Rizal Ave and Luna St",
    latitude: 14.7012,
    longitude: 121.1189,
    status: "resolved",
    priority: "medium",
    submittedAt: new Date("2025-01-15T10:00:00"),
    updatedAt: new Date("2025-01-17T16:30:00"),
    department: "Electrical Division",
    assignedTo: "Electrical Team B",
    updates: [
      {
        date: new Date("2025-01-15T10:00:00"),
        status: "submitted",
        message: "Report received and logged into the system.",
      },
      {
        date: new Date("2025-01-15T14:20:00"),
        status: "reviewed",
        message: "Report verified and forwarded to Electrical Division.",
      },
      {
        date: new Date("2025-01-16T09:00:00"),
        status: "assigned",
        message: "Assigned to Electrical Team B.",
      },
      {
        date: new Date("2025-01-17T14:00:00"),
        status: "in-progress",
        message: "Technician on-site. Bulb replacement in progress.",
      },
      {
        date: new Date("2025-01-17T16:30:00"),
        status: "resolved",
        message: "Streetlight repaired and tested. Issue resolved.",
      },
    ],
    images: [],
  },
};

interface Update {
  date: Date;
  status: string;
  message: string;
}

interface Report {
  id: string;
  category: string;
  description: string;
  barangay: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
  status: string;
  priority: string;
  submittedAt: Date;
  updatedAt: Date;
  department: string;
  assignedTo: string;
  updates: Update[];
  images: string[];
}

export default function TrackPage() {
  const [searchId, setSearchId] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) return;

    setIsSearching(true);
    setNotFound(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundReport = mockReports[searchId.toUpperCase()];
    if (foundReport) {
      setReport(foundReport);
      setNotFound(false);
    } else {
      setReport(null);
      setNotFound(true);
    }

    setIsSearching(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "pending" | "progress" | "success" | "error"> = {
      pending: "pending",
      submitted: "pending",
      reviewed: "pending",
      assigned: "progress",
      "in-progress": "progress",
      resolved: "success",
      rejected: "error",
    };
    return variants[status] || "pending";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-[#22c55e]" />;
      case "in-progress":
      case "assigned":
        return <RefreshCw className="w-5 h-5 text-[#3b82f6]" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-[#ef4444]" />;
      default:
        return <Clock className="w-5 h-5 text-[#f59e0b]" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#1e293b] to-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#f43f5e]/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Badge className="bg-white/10 text-white border-0 mb-4">
            Track Your Report
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Check Your Report Status
          </h1>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Enter your report ID to see real-time updates on your submitted
            infrastructure issue
          </p>

          {/* Search Form */}
          <div className="max-w-xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter Report ID (e.g., SM-2K4X-AB12)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-4 focus:ring-[#14b8a6]/20 font-mono text-center text-lg"
                />
              </div>
              <Button size="lg" onClick={handleSearch} isLoading={isSearching}>
                {isSearching ? "Searching..." : "Track"}
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-3">
              Demo IDs: SM-2K4X-AB12, SM-3Y5Z-CD34
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Not Found */}
        {notFound && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#fef3c7] flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
                Report Not Found
              </h3>
              <p className="text-[#64748b] mb-6">
                We couldn&apos;t find a report with ID &quot;{searchId}&quot;. Please check
                the ID and try again.
              </p>
              <Link href="/report">
                <Button>
                  <FileText className="w-4 h-4" />
                  Submit a New Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Report Found */}
        {report && (
          <div className="space-y-6">
            {/* Status Card */}
            <Card
              className={cn(
                "border-l-4",
                report.status === "resolved"
                  ? "border-l-[#22c55e]"
                  : report.status === "in-progress"
                  ? "border-l-[#3b82f6]"
                  : "border-l-[#f59e0b]"
              )}
            >
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">
                        {getCategoryIcon(report.category.toLowerCase().split(" ")[0])}
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-[#0f172a]">
                          {report.category}
                        </h2>
                        <p className="text-sm text-[#64748b] font-mono">
                          ID: {report.id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(report.status)}
                    <Badge variant={getStatusBadge(report.status)} className="text-sm px-4 py-1.5">
                      {report.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Report Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#64748b]">Location</p>
                      <p className="text-[#0f172a] font-medium">
                        {report.barangay}
                      </p>
                      <p className="text-sm text-[#64748b]">
                        {report.streetAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#64748b]">Description</p>
                      <p className="text-[#0f172a]">{report.description}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#64748b]">Submitted</p>
                      <p className="text-[#0f172a] font-medium">
                        {formatDateTime(report.submittedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#64748b]">Assigned To</p>
                      <p className="text-[#0f172a] font-medium">
                        {report.assignedTo || "Pending assignment"}
                      </p>
                      <p className="text-sm text-[#64748b]">{report.department}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#e2e8f0]" />

                    <div className="space-y-6">
                      {report.updates
                        .slice()
                        .reverse()
                        .map((update, index) => (
                          <div key={index} className="relative flex gap-4">
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full border-2 bg-white z-10 flex items-center justify-center",
                                index === 0
                                  ? "border-[#14b8a6]"
                                  : "border-[#e2e8f0]"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  index === 0 ? "bg-[#14b8a6]" : "bg-[#cbd5e1]"
                                )}
                              />
                            </div>
                            <div className="flex-1 pb-2">
                              <div className="flex items-center justify-between mb-1">
                                <Badge
                                  variant={getStatusBadge(update.status)}
                                  className="text-xs"
                                >
                                  {update.status.replace("-", " ")}
                                </Badge>
                                <span className="text-xs text-[#94a3b8]">
                                  {formatDateTime(update.date)}
                                </span>
                              </div>
                              <p className="text-sm text-[#64748b]">
                                {update.message}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <Card className="bg-gradient-to-r from-[#f0fdfa] to-[#f8fafc]">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-[#14b8a6]" />
                    <div>
                      <p className="font-medium text-[#0f172a]">
                        Need to provide more information?
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Contact the LGU for updates or additional details
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Contact LGU
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Default State */}
        {!report && !notFound && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#f1f5f9] flex items-center justify-center">
              <Search className="w-12 h-12 text-[#cbd5e1]" />
            </div>
            <h3 className="text-xl font-semibold text-[#475569] mb-2">
              Enter a Report ID Above
            </h3>
            <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
              Your report ID was provided when you submitted your report. Check
              your email or SMS for the confirmation.
            </p>
            <Link href="/report">
              <Button variant="outline">
                <FileText className="w-4 h-4" />
                Submit a New Report
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
