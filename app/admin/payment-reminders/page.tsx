"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Send,
  Users,
  AlertTriangle,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  Plus,
  Play,
  Pause,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Mock data for payment reminders
const reminderCampaigns = [
  {
    id: 1,
    name: "7-Day Payment Reminder",
    type: "automatic",
    status: "active",
    trigger: "7_days_before",
    channels: ["sms", "email"],
    recipients: 156,
    sentCount: 1240,
    openRate: 78,
    responseRate: 45,
    lastRun: "2024-03-15T10:30:00",
    nextRun: "2024-03-16T10:30:00",
    template: {
      sms: "Hi {name}, your RentE@sy payment of {amount} is due in 7 days on {due_date}. Pay now: {payment_link}",
      email: "Payment Reminder - 7 Days Notice",
    },
  },
  {
    id: 2,
    name: "Overdue Payment Alert",
    type: "automatic",
    status: "active",
    trigger: "1_day_overdue",
    channels: ["sms", "email", "call"],
    recipients: 23,
    sentCount: 89,
    openRate: 92,
    responseRate: 67,
    lastRun: "2024-03-15T09:00:00",
    nextRun: "2024-03-16T09:00:00",
    template: {
      sms: "URGENT: Your RentE@sy payment of {amount} is overdue. Please pay immediately to avoid penalties.",
      email: "Overdue Payment - Immediate Action Required",
    },
  },
  {
    id: 3,
    name: "Payment Confirmation",
    type: "automatic",
    status: "active",
    trigger: "payment_received",
    channels: ["sms", "email"],
    recipients: 89,
    sentCount: 445,
    openRate: 95,
    responseRate: 12,
    lastRun: "2024-03-15T14:22:00",
    nextRun: "immediate",
    template: {
      sms: "Payment received! Thank you for your RentE@sy payment of {amount}. Next payment due: {next_due_date}",
      email: "Payment Confirmation - RentE@sy",
    },
  },
]

const upcomingReminders = [
  {
    id: 1,
    tenantName: "Kemi Adebayo",
    propertyTitle: "Modern 2-Bedroom Apartment",
    amount: 75000,
    dueDate: "2024-03-20",
    daysUntilDue: 5,
    phone: "+234 801 234 5678",
    email: "kemi.adebayo@email.com",
    reminderType: "7_days_before",
    status: "scheduled",
    lastContact: "2024-03-10",
    paymentHistory: "good",
  },
  {
    id: 2,
    tenantName: "John Okafor",
    propertyTitle: "Luxury Self-Contained Studio",
    amount: 55000,
    dueDate: "2024-03-18",
    daysUntilDue: 3,
    phone: "+234 802 345 6789",
    email: "john.okafor@email.com",
    reminderType: "3_days_before",
    status: "scheduled",
    lastContact: "2024-03-12",
    paymentHistory: "excellent",
  },
  {
    id: 3,
    tenantName: "Sarah Ibrahim",
    propertyTitle: "Spacious 3-Bedroom Duplex",
    amount: 125000,
    dueDate: "2024-03-16",
    daysUntilDue: 1,
    phone: "+234 803 456 7890",
    email: "sarah.ibrahim@email.com",
    reminderType: "1_day_before",
    status: "scheduled",
    lastContact: "2024-03-14",
    paymentHistory: "good",
  },
]

const overduePayments = [
  {
    id: 1,
    tenantName: "Ahmed Hassan",
    propertyTitle: "Executive 4-Bedroom House",
    amount: 150000,
    dueDate: "2024-03-10",
    daysOverdue: 5,
    phone: "+234 804 567 8901",
    email: "ahmed.hassan@email.com",
    totalOverdue: 150000,
    remindersSent: 3,
    lastContact: "2024-03-13",
    paymentHistory: "poor",
    escalationLevel: "high",
  },
  {
    id: 2,
    tenantName: "Fatima Bello",
    propertyTitle: "Emerald Towers",
    amount: 38000,
    dueDate: "2024-03-12",
    daysOverdue: 3,
    phone: "+234 805 678 9012",
    email: "fatima.bello@email.com",
    totalOverdue: 38000,
    remindersSent: 2,
    lastContact: "2024-03-14",
    paymentHistory: "fair",
    escalationLevel: "medium",
  },
]

const messageTemplates = [
  {
    id: 1,
    name: "Friendly Reminder",
    type: "sms",
    category: "pre_due",
    content:
      "Hi {name}! Just a friendly reminder that your RentE@sy payment of {amount} is due on {due_date}. Pay easily via our app or website. Thank you!",
    variables: ["name", "amount", "due_date"],
    usage: 1240,
    effectiveness: 78,
  },
  {
    id: 2,
    name: "Urgent Payment Notice",
    type: "sms",
    category: "overdue",
    content:
      "URGENT: Your RentE@sy payment of {amount} is {days_overdue} days overdue. Please pay immediately to avoid late fees. Contact us if you need assistance.",
    variables: ["amount", "days_overdue"],
    usage: 89,
    effectiveness: 92,
  },
  {
    id: 3,
    name: "Payment Confirmation",
    type: "email",
    category: "confirmation",
    content:
      "Thank you for your payment! We've received your RentE@sy payment of {amount}. Your next payment of {next_amount} is due on {next_due_date}.",
    variables: ["amount", "next_amount", "next_due_date"],
    usage: 445,
    effectiveness: 95,
  },
]

const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700"
    case "paused":
      return "bg-yellow-100 text-yellow-700"
    case "draft":
      return "bg-gray-100 text-gray-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getEscalationColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    case "low":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getPaymentHistoryColor = (history: string) => {
  switch (history) {
    case "excellent":
      return "bg-green-100 text-green-700"
    case "good":
      return "bg-blue-100 text-blue-700"
    case "fair":
      return "bg-yellow-100 text-yellow-700"
    case "poor":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function PaymentRemindersPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedReminders, setSelectedReminders] = useState<number[]>([])

  const handleSendReminder = (reminder: any, channel: string) => {
    alert(`Sending ${channel} reminder to ${reminder.tenantName} for ${formatCurrency(reminder.amount)} payment`)
  }

  const handleBulkAction = (action: string) => {
    alert(`Performing ${action} on ${selectedReminders.length} selected reminders`)
    setSelectedReminders([])
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/renteasy">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Payment Reminders</h1>
                <p className="text-xs text-gray-600">Automated reminder system</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="space-y-6 mt-0">
            {/* Summary Stats */}
            <div className="px-4 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{upcomingReminders.length}</div>
                    <div className="text-xs text-white/80">Upcoming Reminders</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{overduePayments.length}</div>
                    <div className="text-xs text-white/80">Overdue Payments</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {reminderCampaigns.filter((c) => c.status === "active").length}
                    </div>
                    <div className="text-xs text-white/80">Active Campaigns</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">78%</div>
                    <div className="text-xs text-white/80">Success Rate</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowCreateModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Create New Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="h-4 w-4 mr-3" />
                    Send Bulk Reminders
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-3" />
                    Export Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowTemplateModal(true)}>
                    <Edit className="h-4 w-4 mr-3" />
                    Manage Templates
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
                <Badge className="bg-green-100 text-green-700">
                  {reminderCampaigns.filter((c) => c.status === "active").length} running
                </Badge>
              </div>

              <div className="space-y-3">
                {reminderCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                            <p className="text-sm text-gray-600">
                              {campaign.channels.map((channel) => channel.toUpperCase()).join(" + ")}
                            </p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>{campaign.status}</Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Recipients</p>
                            <p className="font-medium">{campaign.recipients}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Open Rate</p>
                            <p className="font-medium">{campaign.openRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Response</p>
                            <p className="font-medium">{campaign.responseRate}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            {campaign.status === "active" ? (
                              <Pause className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4 mt-0">
            {/* Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Reminders</h3>
                  <p className="text-sm text-gray-600">{upcomingReminders.length} reminders scheduled</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedReminders.length > 0 && (
              <div className="px-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-900">
                        {selectedReminders.length} reminder{selectedReminders.length > 1 ? "s" : ""} selected
                      </span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleBulkAction("send_now")}>
                          <Send className="h-3 w-3 mr-1" />
                          Send Now
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction("reschedule")}>
                          <Calendar className="h-3 w-3 mr-1" />
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedReminders([])}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Reminders List */}
            <div className="px-4 space-y-3">
              {upcomingReminders.map((reminder) => (
                <Card key={reminder.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedReminders.includes(reminder.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedReminders([...selectedReminders, reminder.id])
                            } else {
                              setSelectedReminders(selectedReminders.filter((id) => id !== reminder.id))
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{reminder.tenantName}</h4>
                              <p className="text-sm text-gray-600">{reminder.propertyTitle}</p>
                            </div>
                            <Badge
                              className={`text-xs ${
                                reminder.daysUntilDue <= 1
                                  ? "bg-red-100 text-red-700"
                                  : reminder.daysUntilDue <= 3
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {reminder.daysUntilDue} day{reminder.daysUntilDue !== 1 ? "s" : ""} left
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-gray-500">Amount Due</p>
                              <p className="font-bold text-green-600">{formatCurrency(reminder.amount)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Due Date</p>
                              <p className="font-medium">{formatDate(reminder.dueDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Payment History</p>
                              <Badge className={`text-xs ${getPaymentHistoryColor(reminder.paymentHistory)}`}>
                                {reminder.paymentHistory}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-gray-500">Last Contact</p>
                              <p className="text-xs text-gray-600">{formatDate(reminder.lastContact)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleSendReminder(reminder, "sms")}
                            >
                              <MessageCircle className="h-3 w-3 mr-1" />
                              SMS
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleSendReminder(reminder, "email")}
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleSendReminder(reminder, "call")}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4 mt-0">
            {/* Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Overdue Payments</h3>
                  <p className="text-sm text-gray-600">{overduePayments.length} accounts need attention</p>
                </div>
                <Badge className="bg-red-100 text-red-700">
                  {formatCurrency(overduePayments.reduce((total, payment) => total + payment.totalOverdue, 0))} overdue
                </Badge>
              </div>
            </div>

            {/* Overdue List */}
            <div className="px-4 space-y-3">
              {overduePayments.map((payment) => (
                <Card key={payment.id} className="overflow-hidden border-red-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{payment.tenantName}</h4>
                          <p className="text-sm text-gray-600">{payment.propertyTitle}</p>
                        </div>
                        <Badge className={`text-xs ${getEscalationColor(payment.escalationLevel)}`}>
                          {payment.escalationLevel} priority
                        </Badge>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-red-900">{payment.daysOverdue} days overdue</p>
                            <p className="text-xs text-red-700">Due: {formatDate(payment.dueDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-red-900">{formatCurrency(payment.totalOverdue)}</p>
                            <p className="text-xs text-red-700">{payment.remindersSent} reminders sent</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Payment History</p>
                          <Badge className={`text-xs ${getPaymentHistoryColor(payment.paymentHistory)}`}>
                            {payment.paymentHistory}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-500">Last Contact</p>
                          <p className="text-xs text-gray-600">{formatDate(payment.lastContact)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Urgent Reminder
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-3 w-3 mr-1" />
                          Call Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-0">
            {/* Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
                  <p className="text-sm text-gray-600">{messageTemplates.length} templates available</p>
                </div>
                <Button size="sm" onClick={() => setShowTemplateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </div>
            </div>

            {/* Templates List */}
            <div className="px-4 space-y-3">
              {messageTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {template.type.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {template.category.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{template.effectiveness}%</p>
                          <p className="text-xs text-gray-500">effectiveness</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 line-clamp-3">{template.content}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-500">Used {template.usage} times</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <TabsList className="grid w-full grid-cols-4 h-16 bg-transparent rounded-none">
              <TabsTrigger
                value="dashboard"
                className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
              >
                <Bell className="h-4 w-4" />
                <span className="text-xs">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 relative"
              >
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Upcoming</span>
                {upcomingReminders.length > 0 && (
                  <span className="absolute top-1 right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {upcomingReminders.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="overdue"
                className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 relative"
              >
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">Overdue</span>
                {overduePayments.length > 0 && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {overduePayments.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">Templates</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Create Campaign Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Reminder Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input id="campaignName" placeholder="e.g., 3-Day Payment Reminder" />
            </div>

            <div>
              <Label htmlFor="trigger">Trigger</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7_days_before">7 days before due date</SelectItem>
                  <SelectItem value="3_days_before">3 days before due date</SelectItem>
                  <SelectItem value="1_day_before">1 day before due date</SelectItem>
                  <SelectItem value="due_date">On due date</SelectItem>
                  <SelectItem value="1_day_overdue">1 day overdue</SelectItem>
                  <SelectItem value="3_days_overdue">3 days overdue</SelectItem>
                  <SelectItem value="7_days_overdue">7 days overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Channels</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="push" />
                  <Label htmlFor="push">Push Notification</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="smsTemplate">SMS Template</Label>
              <Textarea
                id="smsTemplate"
                placeholder="Hi {name}, your payment of {amount} is due on {due_date}..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="emailTemplate">Email Subject</Label>
              <Input id="emailTemplate" placeholder="Payment Reminder - {property_name}" />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="autoSend" />
              <Label htmlFor="autoSend">Enable automatic sending</Label>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Create Campaign</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Message Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="templateName">Template Name</Label>
              <Input id="templateName" placeholder="e.g., Friendly Payment Reminder" />
            </div>

            <div>
              <Label htmlFor="templateType">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="templateCategory">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre_due">Pre-due Reminder</SelectItem>
                  <SelectItem value="overdue">Overdue Notice</SelectItem>
                  <SelectItem value="confirmation">Payment Confirmation</SelectItem>
                  <SelectItem value="escalation">Escalation Notice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="templateContent">Message Content</Label>
              <Textarea
                id="templateContent"
                placeholder="Use variables like {name}, {amount}, {due_date}, {property_name}..."
                rows={4}
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 font-medium mb-2">Available Variables:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <span>{"{name}"}</span>
                <span>{"{amount}"}</span>
                <span>{"{due_date}"}</span>
                <span>{"{property_name}"}</span>
                <span>{"{days_overdue}"}</span>
                <span>{"{payment_link}"}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Save Template</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowTemplateModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
