"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const tenants = [
  {
    id: 1,
    name: "Sarah Okonkwo",
    email: "sarah.okonkwo@email.com",
    phone: "+234 803 123 4567",
    avatar: "/placeholder.svg?height=40&width=40",
    property: {
      id: 1,
      title: "Modern 2-Bedroom Apartment",
      address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    },
    lease: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: 208333,
      annualRent: 2500000,
      deposit: 500000,
      status: "Active",
    },
    payments: {
      lastPayment: "2024-01-15",
      nextDue: "2024-02-15",
      status: "Current",
      outstandingAmount: 0,
    },
    emergencyContact: {
      name: "John Okonkwo",
      phone: "+234 806 987 6543",
      relationship: "Spouse",
    },
    moveInDate: "2024-01-01",
    occupation: "Software Engineer",
    employer: "Tech Solutions Ltd",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+234 807 456 7890",
    avatar: "/placeholder.svg?height=40&width=40",
    property: {
      id: 3,
      title: "Luxury Self-Contained Studio",
      address: "12 GRA, Port Harcourt, Rivers State",
    },
    lease: {
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      monthlyRent: 150000,
      annualRent: 1800000,
      deposit: 300000,
      status: "Active",
    },
    payments: {
      lastPayment: "2024-01-10",
      nextDue: "2024-02-10",
      status: "Current",
      outstandingAmount: 0,
    },
    emergencyContact: {
      name: "Fatima Hassan",
      phone: "+234 805 123 4567",
      relationship: "Sister",
    },
    moveInDate: "2023-09-01",
    occupation: "Marketing Manager",
    employer: "Global Marketing Inc",
  },
  {
    id: 3,
    name: "Grace Adebayo",
    email: "grace.adebayo@email.com",
    phone: "+234 809 876 5432",
    avatar: "/placeholder.svg?height=40&width=40",
    property: {
      id: 4,
      title: "Executive 3-Bedroom House",
      address: "Plot 23, Victoria Garden City, Lagos",
    },
    lease: {
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      monthlyRent: 350000,
      annualRent: 4200000,
      deposit: 700000,
      status: "Expiring Soon",
    },
    payments: {
      lastPayment: "2023-12-20",
      nextDue: "2024-01-20",
      status: "Overdue",
      outstandingAmount: 350000,
    },
    emergencyContact: {
      name: "Michael Adebayo",
      phone: "+234 803 654 3210",
      relationship: "Brother",
    },
    moveInDate: "2023-06-01",
    occupation: "Doctor",
    employer: "Lagos University Teaching Hospital",
  },
]

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || tenant.lease.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesPayment = paymentFilter === "all" || tenant.payments.status.toLowerCase() === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-green-100 text-green-700"
      case "Overdue":
        return "bg-red-100 text-red-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLeaseStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-700"
      case "Expiring Soon":
        return "bg-orange-100 text-orange-700"
      case "Expired":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPaymentIcon = (status: string) => {
    switch (status) {
      case "Current":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

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
                <h1 className="text-xl font-bold text-gray-900">Tenant Management</h1>
                <p className="text-sm text-gray-600">{filteredTenants.length} tenants</p>
              </div>
            </div>
            <Link href="/manager/tenants/add">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Tenant
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tenants, properties, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Lease Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leases</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Tenants List */}
        <div className="space-y-4">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tenant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {tenant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{tenant.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{tenant.phone}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/tenants/${tenant.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/tenants/${tenant.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/tenants/${tenant.id}/payments`}>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Payment History
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/tenants/${tenant.id}/lease`}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Lease Details
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">
                        {tenant.property.title} - {tenant.property.address}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Monthly Rent:</span>
                        <p className="font-medium text-green-600">{formatCurrency(tenant.lease.monthlyRent)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Lease Status:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getLeaseStatusColor(tenant.lease.status)}`}>
                            {tenant.lease.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Status:</span>
                        <div className="flex items-center gap-2 mt-1">
                          {getPaymentIcon(tenant.payments.status)}
                          <Badge className={`text-xs ${getPaymentStatusColor(tenant.payments.status)}`}>
                            {tenant.payments.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Due:</span>
                        <p className="font-medium">{new Date(tenant.payments.nextDue).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {tenant.payments.outstandingAmount > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">
                            Outstanding Amount: {formatCurrency(tenant.payments.outstandingAmount)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link href={`/manager/tenants/${tenant.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/manager/tenants/${tenant.id}/payments`}>
                        <Button variant="outline" size="sm">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Payments
                        </Button>
                      </Link>
                      <Link href={`/manager/tenants/${tenant.id}/lease`}>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          Lease
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTenants.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new tenant.</p>
            <Link href="/manager/tenants/add">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Tenant
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
