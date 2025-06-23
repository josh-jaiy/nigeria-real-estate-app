"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  ArrowLeft,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const paymentData = [
  {
    id: 1,
    tenant: {
      name: "Sarah Okonkwo",
      avatar: "/placeholder.svg?height=40&width=40",
      property: "Modern 2-Bedroom Apartment",
    },
    amount: 208333,
    dueDate: "2024-02-15",
    paidDate: "2024-02-14",
    status: "Paid",
    method: "Bank Transfer",
    reference: "TXN-2024-001",
    type: "Monthly Rent",
  },
  {
    id: 2,
    tenant: {
      name: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      property: "Luxury Self-Contained Studio",
    },
    amount: 150000,
    dueDate: "2024-02-10",
    paidDate: "2024-02-09",
    status: "Paid",
    method: "Online Payment",
    reference: "TXN-2024-002",
    type: "Monthly Rent",
  },
  {
    id: 3,
    tenant: {
      name: "Grace Adebayo",
      avatar: "/placeholder.svg?height=40&width=40",
      property: "Executive 3-Bedroom House",
    },
    amount: 350000,
    dueDate: "2024-01-20",
    paidDate: null,
    status: "Overdue",
    method: null,
    reference: null,
    type: "Monthly Rent",
  },
  {
    id: 4,
    tenant: {
      name: "John Okoro",
      avatar: "/placeholder.svg?height=40&width=40",
      property: "2-Bedroom Flat",
    },
    amount: 180000,
    dueDate: "2024-02-25",
    paidDate: null,
    status: "Pending",
    method: null,
    reference: null,
    type: "Monthly Rent",
  },
  {
    id: 5,
    tenant: {
      name: "Sarah Okonkwo",
      avatar: "/placeholder.svg?height=40&width=40",
      property: "Modern 2-Bedroom Apartment",
    },
    amount: 500000,
    dueDate: "2024-01-01",
    paidDate: "2023-12-28",
    status: "Paid",
    method: "Bank Transfer",
    reference: "TXN-2023-045",
    type: "Security Deposit",
  },
]

const upcomingPayments = [
  {
    tenant: "John Okoro",
    property: "2-Bedroom Flat",
    amount: 180000,
    dueDate: "2024-02-25",
    daysUntilDue: 5,
  },
  {
    tenant: "Michael Eze",
    property: "Studio Apartment",
    amount: 120000,
    dueDate: "2024-02-28",
    daysUntilDue: 8,
  },
  {
    tenant: "Sarah Okonkwo",
    property: "Modern 2-Bedroom Apartment",
    amount: 208333,
    dueDate: "2024-03-15",
    daysUntilDue: 25,
  },
]

const overduePayments = [
  {
    tenant: "Grace Adebayo",
    property: "Executive 3-Bedroom House",
    amount: 350000,
    dueDate: "2024-01-20",
    daysOverdue: 25,
  },
  {
    tenant: "David Okafor",
    property: "3-Bedroom Duplex",
    amount: 280000,
    dueDate: "2024-01-15",
    daysOverdue: 30,
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPayments = paymentData.filter((payment) => {
    const matchesSearch =
      payment.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.reference && payment.reference.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || payment.type.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700"
      case "Overdue":
        return "bg-red-100 text-red-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalPaid = paymentData.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0)
  const totalOverdue = paymentData.filter((p) => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = paymentData.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/manager/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Payment Management</h1>
                <p className="text-sm text-gray-600">Track rent payments and generate reports</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/manager/payments/record">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Collected</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue Amount</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Amount</p>
                  <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments, tenants, or references..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Payment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="rent">Monthly Rent</SelectItem>
                    <SelectItem value="deposit">Security Deposit</SelectItem>
                    <SelectItem value="maintenance">Maintenance Fee</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Payments List */}
            <div className="space-y-3">
              {filteredPayments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={payment.tenant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {payment.tenant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{payment.tenant.name}</h4>
                            <p className="text-sm text-gray-600">{payment.tenant.property}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-600">{payment.type}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                            </div>
                            {payment.paidDate && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>Paid: {new Date(payment.paidDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            {payment.reference && <span className="text-gray-500">Ref: {payment.reference}</span>}
                          </div>

                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment.status)}
                            <Badge className={`text-xs ${getStatusColor(payment.status)}`}>{payment.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{payment.tenant}</h4>
                        <p className="text-sm text-gray-600">{payment.property}</p>
                        <p className="text-sm text-gray-500">
                          Due in {payment.daysUntilDue} days ({new Date(payment.dueDate).toLocaleDateString()})
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(payment.amount)}</p>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4">
            <div className="space-y-3">
              {overduePayments.map((payment, index) => (
                <Card key={index} className="border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{payment.tenant}</h4>
                        <p className="text-sm text-gray-600">{payment.property}</p>
                        <p className="text-sm text-red-600 font-medium">
                          {payment.daysOverdue} days overdue (Due: {new Date(payment.dueDate).toLocaleDateString()})
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-red-600">{formatCurrency(payment.amount)}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Send className="h-3 w-3 mr-1" />
                            Send Notice
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Generate detailed monthly payment reports</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Annual Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive yearly payment analysis</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Annual Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tenant Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Individual tenant payment records</p>
                  <Button className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Payment Histories
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Overdue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Track and analyze overdue payments</p>
                  <Button className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View Overdue Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
