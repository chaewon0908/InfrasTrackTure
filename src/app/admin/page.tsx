"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreVertical,
  Eye,
  UserCheck,
  XCircle,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cn, formatDateTime, getCategoryIcon } from "@/lib/utils";

// Mock data
const stats = [
  {
    title: "Total Reports",
    value: 2847,
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    color: "from-[#14b8a6] to-[#0d9488]",
  },
  {
    title: "Pending Review",
    value: 124,
    change: "-8.3%",
    trend: "down",
    icon: Clock,
    color: "from-[#f59e0b] to-[#d97706]",
  },
  {
    title: "In Progress",
    value: 89,
    change: "+23.1%",
    trend: "up",
    icon: Activity,
    color: "from-[#3b82f6] to-[#1d4ed8]",
  },
  {
    title: "Resolved",
    value: 2634,
    change: "+15.7%",
    trend: "up",
    icon: CheckCircle,
    color: "from-[#22c55e] to-[#16a34a]",
  },
];

const recentReports = [
  {
    id: "SM-2K4X-AB12",
    category: "roads",
    title: "Large pothole near elementary school",
    location: "Brgy. Guinayang",
    status: "in-progress",
    priority: "high",
    submittedAt: new Date("2025-01-18T14:30:00"),
    reporter: "Juan D.",
  },
  {
    id: "SM-3Y5Z-CD34",
    category: "streetlights",
    title: "Broken streetlight - safety hazard",
    location: "Brgy. Malanday",
    status: "pending",
    priority: "medium",
    submittedAt: new Date("2025-01-18T12:15:00"),
    reporter: "Maria S.",
  },
  {
    id: "SM-4Z6A-EF56",
    category: "drainage",
    title: "Clogged drainage causing flooding",
    location: "Brgy. Ampid I",
    status: "pending",
    priority: "critical",
    submittedAt: new Date("2025-01-18T10:45:00"),
    reporter: "Pedro R.",
  },
  {
    id: "SM-5B7C-GH78",
    category: "garbage",
    title: "Garbage not collected for 3 days",
    location: "Brgy. Santo Niño",
    status: "assigned",
    priority: "medium",
    submittedAt: new Date("2025-01-18T09:20:00"),
    reporter: "Ana L.",
  },
  {
    id: "SM-6D8E-IJ90",
    category: "sidewalks",
    title: "Cracked sidewalk - tripping hazard",
    location: "Brgy. Guitnang Bayan I",
    status: "resolved",
    priority: "low",
    submittedAt: new Date("2025-01-17T16:30:00"),
    reporter: "Jose M.",
  },
];

const categoryStats = [
  { name: "Roads", count: 847, percentage: 30, color: "#14b8a6" },
  { name: "Streetlights", count: 623, percentage: 22, color: "#f59e0b" },
  { name: "Drainage", count: 512, percentage: 18, color: "#3b82f6" },
  { name: "Garbage", count: 398, percentage: 14, color: "#22c55e" },
  { name: "Others", count: 467, percentage: 16, color: "#8b5cf6" },
];

const barangayStats = [
  { name: "Guinayang", reports: 234 },
  { name: "Malanday", reports: 198 },
  { name: "Ampid I", reports: 176 },
  { name: "Santo Niño", reports: 165 },
  { name: "Guitnang Bayan I", reports: 142 },
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "reports", label: "All Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Citizens", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "pending" | "progress" | "success" | "error"> = {
      pending: "pending",
      assigned: "progress",
      "in-progress": "progress",
      resolved: "success",
      rejected: "error",
    };
    return variants[status] || "pending";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "text-[#22c55e]",
      medium: "text-[#f59e0b]",
      high: "text-[#f97316]",
      critical: "text-[#ef4444]",
    };
    return colors[priority] || "text-[#64748b]";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#e2e8f0] z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#0f172a]">
                  Infras<span className="text-[#14b8a6]">Track</span>Ture
                </span>
                <p className="text-[10px] text-[#64748b] -mt-1">Admin Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6]"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[#f1f5f9] transition-colors">
              <Bell className="w-5 h-5 text-[#64748b]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f43f5e]" />
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#e2e8f0]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white font-medium text-sm">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#0f172a]">Admin User</p>
                <p className="text-xs text-[#64748b]">Engineering Office</p>
              </div>
              <ChevronDown className="w-4 h-4 text-[#64748b]" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-[#e2e8f0] z-40 hidden lg:block">
        <div className="p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
                  selectedTab === item.id
                    ? "bg-gradient-to-r from-[#f0fdfa] to-[#ccfbf1] text-[#0d9488] font-medium"
                    : "text-[#64748b] hover:bg-[#f8fafc]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Stats in Sidebar */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Today&apos;s Activity</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/70">New Reports</p>
                <p className="text-xl font-bold">24</p>
              </div>
              <div>
                <p className="text-white/70">Resolved</p>
                <p className="text-xl font-bold">18</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard Overview</h1>
              <p className="text-[#64748b]">
                Welcome back! Here&apos;s what&apos;s happening in San Mateo today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4" />
                Jan 18, 2025
              </Button>
              <Button size="sm">
                <FileText className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} hover className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        stat.trend === "up" ? "text-[#22c55e]" : "text-[#ef4444]"
                      )}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#0f172a] mb-1 number-display">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-[#64748b] text-sm">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Reports */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Reports</CardTitle>
                  <div className="flex items-center gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors group"
                      >
                        <div className="text-3xl">
                          {getCategoryIcon(report.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-[#0f172a] truncate">
                              {report.title}
                            </h4>
                            <span
                              className={cn(
                                "text-xs font-medium",
                                getPriorityColor(report.priority)
                              )}
                            >
                              • {report.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#64748b]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {report.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDateTime(report.submittedAt)}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] mt-1 font-mono">
                            {report.id} • by {report.reporter}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadge(report.status)}>
                            {report.status.replace("-", " ")}
                          </Badge>
                          <button className="p-1.5 rounded-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4 text-[#64748b]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" className="w-full mt-4">
                    View All Reports
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Category Distribution */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#14b8a6]" />
                    Reports by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryStats.map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#0f172a]">
                            {category.name}
                          </span>
                          <span className="text-sm text-[#64748b]">
                            {category.count} ({category.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
                    <h4 className="font-medium text-[#0f172a] mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#14b8a6]" />
                      Top Barangays
                    </h4>
                    <div className="space-y-3">
                      {barangayStats.map((brgy, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-[#64748b]">
                            {index + 1}. {brgy.name}
                          </span>
                          <span className="font-medium text-[#0f172a]">
                            {brgy.reports}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-[#f0fdfa] to-[#f8fafc]">
            <CardContent className="py-6">
              <h3 className="font-semibold text-[#0f172a] mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start">
                  <Eye className="w-4 h-4" />
                  Review Pending
                  <Badge className="ml-auto">124</Badge>
                </Button>
                <Button variant="outline" className="justify-start">
                  <UserCheck className="w-4 h-4" />
                  Assign Reports
                </Button>
                <Button variant="outline" className="justify-start">
                  <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                  Critical Issues
                  <Badge variant="error" className="ml-auto">8</Badge>
                </Button>
                <Button variant="outline" className="justify-start">
                  <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                  Mark Resolved
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
