"use client"

import { useState } from "react"
import {
  Home,
  Users,
  TrendingUp,
  MapPin,
  User,
  Eye,
  Calendar,
  BarChart3,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  MessageCircle,
  FolderOpen,
  Download,
  CheckCircle,
  AlertCircle,
  Search,
  Shield,
  Archive,
  Share,
  CheckSquare,
  Square,
  SortAsc,
  Filter,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const landlordInfo = {
  name: "Chief Adebayo Ogundimu",
  title: "Property Owner",
  avatar: "/placeholder.svg?height=60&width=60",
  totalProperties: 12,
  totalMonthlyRent: 15750000, // ₦15.75M
  totalTenants: 28,
  occupancyRate: 85,
}

const summaryStats = [
  {
    title: "Active Properties",
    value: landlordInfo.totalProperties.toString(),
    subtitle: `${Math.round(landlordInfo.occupancyRate)}% occupied`,
    icon: Home,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Monthly Rent",
    value: `₦${(landlordInfo.totalMonthlyRent / 1000000).toFixed(1)}M`,
    subtitle: "Expected income",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Current Tenants",
    value: landlordInfo.totalTenants.toString(),
    subtitle: "Across all properties",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const properties = [
  {
    id: 1,
    name: "Sunrise Apartments Block A",
    type: "2-Bedroom Flats",
    location: "Victoria Island, Lagos",
    monthlyRent: 2500000,
    status: "Occupied",
    tenantName: "Mr. & Mrs. Adeyemi",
    manager: {
      name: "Adebayo Properties",
      avatar: "/placeholder.svg?height=32&width=32",
      phone: "+234 801 234 5678",
    },
    inquiries: 12,
    lastRented: "2024-01-15",
    image: "/placeholder.svg?height=80&width=80",
    occupancyRate: 100,
  },
  {
    id: 2,
    name: "Golden Heights Complex",
    type: "3-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    monthlyRent: 3200000,
    status: "Occupied",
    tenantName: "Dr. Chukwu Family",
    manager: {
      name: "Prime Estate Managers",
      avatar: "/placeholder.svg?height=32&width=32",
      phone: "+234 802 345 6789",
    },
    inquiries: 8,
    lastRented: "2023-11-20",
    image: "/placeholder.svg?height=80&width=80",
    occupancyRate: 100,
  },
  {
    id: 3,
    name: "Heritage Court",
    type: "Self-Contained",
    location: "Wuse 2, Abuja",
    monthlyRent: 1800000,
    status: "Vacant",
    tenantName: null,
    manager: {
      name: "Capital Property Solutions",
      avatar: "/placeholder.svg?height=32&width=32",
      phone: "+234 803 456 7890",
    },
    inquiries: 15,
    lastRented: "2023-12-10",
    image: "/placeholder.svg?height=80&width=80",
    occupancyRate: 0,
  },
  {
    id: 4,
    name: "Royal Gardens Estate",
    type: "4-Bedroom Detached",
    location: "Maitama, Abuja",
    monthlyRent: 4500000,
    status: "Occupied",
    tenantName: "Ambassador Johnson",
    manager: {
      name: "Elite Property Management",
      avatar: "/placeholder.svg?height=32&width=32",
      phone: "+234 804 567 8901",
    },
    inquiries: 6,
    lastRented: "2024-02-01",
    image: "/placeholder.svg?height=80&width=80",
    occupancyRate: 100,
  },
  {
    id: 5,
    name: "Emerald Towers",
    type: "Mini Flat",
    location: "Ikeja, Lagos",
    monthlyRent: 1200000,
    status: "Occupied",
    tenantName: "Miss Fatima Bello",
    manager: {
      name: "Adebayo Properties",
      avatar: "/placeholder.svg?height=32&width=32",
      phone: "+234 801 234 5678",
    },
    inquiries: 20,
    lastRented: "2024-01-08",
    image: "/placeholder.svg?height=80&width=80",
    occupancyRate: 100,
  },
  {
    id: 6,
    name: "Serenity Homes",
    type: "1-Bedroom Flat",
    location: "GRA, Port Harcourt",
    monthlyRent: 1500000,
    status: "Vacant",
    tenantName: null,
    manager: {
      name: "Rivers Property Hub",
      avatar: "/placeholder.svg?height=32&width=32",
      phone: "+234 805 678 9012",
    },
    inquiries: 9,
    lastRented: "2023-10-15",
    image: "/placeholder.svg?height=80&width=80",
    occupancyRate: 0,
  },
]

const conversations = [
  {
    id: 1,
    propertyId: 1,
    propertyName: "Sunrise Apartments Block A",
    participants: {
      tenant: {
        name: "Mr. & Mrs. Adeyemi",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      manager: {
        name: "Adebayo Properties",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    lastMessage: {
      content: "The air conditioning in the master bedroom needs servicing",
      sender: "tenant",
      timestamp: "2 hours ago",
      unread: true,
    },
    messages: [
      {
        id: 1,
        sender: "tenant",
        content: "Good morning. The air conditioning in the master bedroom is not cooling properly.",
        timestamp: "9:30 AM",
        date: "Today",
      },
      {
        id: 2,
        sender: "manager",
        content:
          "Good morning Mr. Adeyemi. I'll arrange for a technician to check it today. The landlord has been notified.",
        timestamp: "9:45 AM",
        date: "Today",
      },
      {
        id: 3,
        sender: "tenant",
        content: "Thank you. What time should we expect the technician?",
        timestamp: "10:15 AM",
        date: "Today",
      },
    ],
  },
  {
    id: 2,
    propertyId: 4,
    propertyName: "Royal Gardens Estate",
    participants: {
      tenant: {
        name: "Ambassador Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      manager: {
        name: "Elite Property Management",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    lastMessage: {
      content: "Rent payment for March has been processed successfully",
      sender: "manager",
      timestamp: "1 day ago",
      unread: false,
    },
    messages: [],
  },
  {
    id: 3,
    propertyId: 3,
    propertyName: "Heritage Court",
    participants: {
      tenant: null,
      manager: {
        name: "Capital Property Solutions",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    lastMessage: {
      content: "New viewing scheduled for this weekend",
      sender: "manager",
      timestamp: "3 days ago",
      unread: false,
    },
    messages: [],
  },
]

const documents = [
  {
    id: 1,
    propertyId: 1,
    propertyName: "Sunrise Apartments Block A",
    type: "Lease Agreement",
    fileName: "Lease_Agreement_Adeyemi_2024.pdf",
    uploadDate: "2024-01-15",
    expiryDate: "2025-01-14",
    status: "Active",
    size: "2.3 MB",
    category: "Legal",
  },
  {
    id: 2,
    propertyId: 1,
    propertyName: "Sunrise Apartments Block A",
    type: "Property Certificate",
    fileName: "Certificate_of_Occupancy.pdf",
    uploadDate: "2023-12-01",
    expiryDate: null,
    status: "Valid",
    size: "1.8 MB",
    category: "Legal",
  },
  {
    id: 3,
    propertyId: 2,
    propertyName: "Golden Heights Complex",
    type: "Insurance Policy",
    fileName: "Property_Insurance_2024.pdf",
    uploadDate: "2024-01-01",
    expiryDate: "2024-12-31",
    status: "Active",
    size: "1.2 MB",
    category: "Insurance",
  },
  {
    id: 4,
    propertyId: 4,
    propertyName: "Royal Gardens Estate",
    type: "Tenancy Agreement",
    fileName: "Tenancy_Agreement_Johnson.pdf",
    uploadDate: "2024-02-01",
    expiryDate: "2025-01-31",
    status: "Active",
    size: "2.1 MB",
    category: "Legal",
  },
  {
    id: 5,
    propertyId: 3,
    propertyName: "Heritage Court",
    type: "Maintenance Report",
    fileName: "Maintenance_Report_Q1_2024.pdf",
    uploadDate: "2024-03-15",
    expiryDate: null,
    status: "Completed",
    size: "856 KB",
    category: "Maintenance",
  },
  {
    id: 6,
    propertyId: 2,
    propertyName: "Golden Heights Complex",
    type: "Property Valuation",
    fileName: "Property_Valuation_2024.pdf",
    uploadDate: "2024-02-20",
    expiryDate: "2025-02-19",
    status: "Valid",
    size: "3.4 MB",
    category: "Financial",
  },
  {
    id: 7,
    propertyId: 5,
    propertyName: "Emerald Towers",
    type: "Lease Agreement",
    fileName: "Lease_Agreement_Bello_2024.pdf",
    uploadDate: "2024-01-08",
    expiryDate: "2025-01-07",
    status: "Active",
    size: "2.0 MB",
    category: "Legal",
  },
  {
    id: 8,
    propertyId: 1,
    propertyName: "Sunrise Apartments Block A",
    type: "Inspection Report",
    fileName: "Annual_Inspection_2024.pdf",
    uploadDate: "2024-03-01",
    expiryDate: null,
    status: "Completed",
    size: "1.5 MB",
    category: "Maintenance",
  },
]

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  }
  return `₦${amount.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const getDocumentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "lease agreement":
    case "tenancy agreement":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "property certificate":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "insurance policy":
      return <Shield className="h-5 w-5 text-purple-600" />
    case "maintenance report":
    case "inspection report":
      return <Settings className="h-5 w-5 text-orange-600" />
    case "property valuation":
      return <TrendingUp className="h-5 w-5 text-indigo-600" />
    default:
      return <FileText className="h-5 w-5 text-gray-600" />
  }
}

const getDocumentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "valid":
      return "bg-green-100 text-green-700"
    case "expiring soon":
      return "bg-yellow-100 text-yellow-700"
    case "expired":
      return "bg-red-100 text-red-700"
    case "completed":
      return "bg-blue-100 text-blue-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([])
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [sortBy, setSortBy] = useState("uploadDate")
  const [filterBy, setFilterBy] = useState("all")
  const [groupBy, setGroupBy] = useState("none")

  const toggleDocumentSelection = (documentId: number) => {
    setSelectedDocuments((current) =>
      current.includes(documentId) ? current.filter((id) => id !== documentId) : [...current, documentId],
    )
  }

  const selectAllDocuments = () => {
    const filteredDocs = getFilteredAndSortedDocuments()
    setSelectedDocuments(filteredDocs.map((doc) => doc.id))
  }

  const clearSelection = () => {
    setSelectedDocuments([])
    setIsSelectMode(false)
  }

  const getFilteredAndSortedDocuments = () => {
    let filtered = documents

    if (filterBy !== "all") {
      filtered = documents.filter((doc) => doc.category.toLowerCase() === filterBy.toLowerCase())
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fileName.localeCompare(b.fileName)
        case "type":
          return a.type.localeCompare(b.type)
        case "property":
          return a.propertyName.localeCompare(b.propertyName)
        case "size":
          return Number.parseFloat(a.size) - Number.parseFloat(b.size)
        case "uploadDate":
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      }
    })
  }

  const getGroupedDocuments = () => {
    const filteredDocs = getFilteredAndSortedDocuments()

    if (groupBy === "property") {
      const grouped = filteredDocs.reduce(
        (acc, doc) => {
          const key = doc.propertyName
          if (!acc[key]) acc[key] = []
          acc[key].push(doc)
          return acc
        },
        {} as Record<string, typeof documents>,
      )
      return grouped
    } else if (groupBy === "category") {
      const grouped = filteredDocs.reduce(
        (acc, doc) => {
          const key = doc.category
          if (!acc[key]) acc[key] = []
          acc[key].push(doc)
          return acc
        },
        {} as Record<string, typeof documents>,
      )
      return grouped
    }

    return { "All Documents": filteredDocs }
  }

  const handleBulkDownload = () => {
    const selectedDocs = documents.filter((doc) => selectedDocuments.includes(doc.id))
    const totalSize = selectedDocs.reduce((acc, doc) => {
      const size = Number.parseFloat(doc.size.replace(/[^\d.]/g, ""))
      return acc + size
    }, 0)

    alert(
      `Preparing download of ${selectedDocs.length} documents (${totalSize.toFixed(1)} MB)...\n\nFiles will be compressed into a ZIP archive.`,
    )
    clearSelection()
  }

  const handleBulkOrganize = (action: string) => {
    const selectedDocs = documents.filter((doc) => selectedDocuments.includes(doc.id))
    switch (action) {
      case "archive":
        alert(`Archiving ${selectedDocs.length} documents...\n\nDocuments will be moved to the archive folder.`)
        break
      case "export":
        alert(
          `Exporting ${selectedDocs.length} documents to PDF report...\n\nA comprehensive report will be generated.`,
        )
        break
      case "share":
        alert(
          `Sharing ${selectedDocs.length} documents with property managers...\n\nManagers will receive secure access links.`,
        )
        break
      case "delete":
        alert(`Are you sure you want to delete ${selectedDocs.length} documents?\n\nThis action cannot be undone.`)
        break
    }
    clearSelection()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={landlordInfo.avatar || "/placeholder.svg"} />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{landlordInfo.name}</h1>
                <p className="text-sm text-gray-600">{landlordInfo.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="space-y-6 mt-0">
            {/* Welcome Section */}
            <div className="px-4 py-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
              <h2 className="text-xl font-bold mb-2">Welcome back, Chief Adebayo!</h2>
              <p className="text-green-100">Here's an overview of your property portfolio</p>
            </div>

            {/* Summary Stats */}
            <div className="px-4">
              <div className="grid grid-cols-1 gap-4">
                {summaryStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <p className="text-xs text-gray-500">{stat.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Occupancy Overview */}
            <div className="px-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Portfolio Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Occupancy Rate</span>
                      <span className="font-semibold">{landlordInfo.occupancyRate}%</span>
                    </div>
                    <Progress value={landlordInfo.occupancyRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {properties.filter((p) => p.status === "Occupied").length}
                      </p>
                      <p className="text-xs text-gray-600">Occupied</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {properties.filter((p) => p.status === "Vacant").length}
                      </p>
                      <p className="text-xs text-gray-600">Vacant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="px-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New tenant moved in</p>
                      <p className="text-xs text-gray-600">Royal Gardens Estate - 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rent payment received</p>
                      <p className="text-xs text-gray-600">Sunrise Apartments - 3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Property inquiry</p>
                      <p className="text-xs text-gray-600">Heritage Court - 1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-4 mt-0">
            {/* Properties Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">My Properties</h3>
                  <p className="text-sm text-gray-600">{properties.length} total properties</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {properties.filter((p) => p.status === "Occupied").length} Occupied
                </Badge>
              </div>
            </div>

            {/* Properties List */}
            <div className="px-4 space-y-4">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{property.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{property.type}</p>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="text-xs">{property.location}</span>
                            </div>
                          </div>
                          <Badge
                            className={`text-xs ${
                              property.status === "Occupied"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {property.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          {/* Rent and Tenant Info */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-green-600">
                                {formatCurrency(property.monthlyRent)}
                              </span>
                              <span className="text-gray-500 text-sm">/month</span>
                            </div>
                          </div>

                          {property.tenantName && (
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">Tenant: {property.tenantName}</span>
                            </div>
                          )}

                          {/* Property Manager */}
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={property.manager.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">PM</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600">Managed by {property.manager.name}</span>
                          </div>

                          {/* Analytics */}
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{property.inquiries} inquiries</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                Last rented: {formatDate(property.lastRented)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 mt-0">
            <div className="px-4 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Reports</h3>

              {/* Monthly Income Summary */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Income Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expected Monthly Rent</span>
                      <span className="font-bold text-green-600">{formatCurrency(landlordInfo.totalMonthlyRent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Occupied Units</span>
                      <span className="font-medium">
                        {properties.filter((p) => p.status === "Occupied").length} of {properties.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Occupancy Rate</span>
                      <span className="font-medium">{landlordInfo.occupancyRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {properties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{property.name}</p>
                          <p className="text-xs text-gray-600">{property.inquiries} inquiries this month</p>
                        </div>
                        <Badge
                          className={`text-xs ${
                            property.status === "Occupied"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {property.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 mt-0">
            <div className="px-4 py-6">
              {/* Profile Header */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={landlordInfo.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">CA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">{landlordInfo.name}</h2>
                      <p className="text-gray-600 mb-2">{landlordInfo.title}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Verified Landlord
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{landlordInfo.totalProperties}</div>
                      <div className="text-sm text-gray-600">Properties</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{landlordInfo.totalTenants}</div>
                      <div className="text-sm text-gray-600">Tenants</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">8</div>
                      <div className="text-sm text-gray-600">Years</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Notifications</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Documents</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Privacy Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 mt-0">
            {/* Messages Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Tenant Communications</h3>
                  <p className="text-sm text-gray-600">Messages through property managers</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Conversations List */}
            <div className="px-4 space-y-3">
              {conversations.map((conversation) => (
                <Card key={conversation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Property Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{conversation.propertyName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={conversation.participants.manager.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">PM</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600">via {conversation.participants.manager.name}</span>
                          </div>
                        </div>
                        {conversation.lastMessage.unread && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                      </div>

                      {/* Participants */}
                      <div className="flex items-center gap-3">
                        {conversation.participants.tenant ? (
                          <>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={conversation.participants.tenant.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {conversation.participants.tenant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{conversation.participants.tenant.name}</p>
                              <p className="text-xs text-gray-600">Tenant</p>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <Home className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">No Current Tenant</p>
                              <p className="text-xs text-gray-500">Property Available</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Last Message */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 line-clamp-2">{conversation.lastMessage.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {conversation.lastMessage.sender === "tenant" ? "Tenant" : "Manager"}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Recent Messages Preview */}
                      {conversation.messages.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-700">Recent Messages:</p>
                          {conversation.messages.slice(-2).map((message) => (
                            <div key={message.id} className="flex items-start gap-2 pl-4 border-l-2 border-gray-200">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium">
                                    {message.sender === "tenant"
                                      ? conversation.participants.tenant?.name
                                      : conversation.participants.manager.name}
                                  </span>
                                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-700 line-clamp-2">{message.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Communication Note */}
            <div className="px-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Communication Policy</p>
                      <p className="text-xs text-blue-700 mt-1">
                        All tenant communications are managed through your assigned property managers to ensure proper
                        documentation and professional handling of requests.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 mt-0">
            {/* Documents Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
                  <p className="text-sm text-gray-600">
                    {documents.length} documents • {selectedDocuments.length} selected
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isSelectMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsSelectMode(!isSelectMode)}
                  >
                    {isSelectMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions Toolbar */}
            {selectedDocuments.length > 0 && (
              <div className="px-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          {selectedDocuments.length} document{selectedDocuments.length > 1 ? "s" : ""} selected
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleBulkDownload}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkOrganize("share")}>
                          <Share className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkOrganize("archive")}>
                          <Archive className="h-3 w-3 mr-1" />
                          Archive
                        </Button>
                        <Button variant="ghost" size="sm" onClick={clearSelection}>
                          <span className="text-xs">Clear</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Controls */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SortAsc className="h-4 w-4 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uploadDate">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger className="w-32">
                    <FolderOpen className="h-4 w-4 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="property">By Property</SelectItem>
                    <SelectItem value="category">By Category</SelectItem>
                  </SelectContent>
                </Select>

                {isSelectMode && (
                  <Button variant="outline" size="sm" onClick={selectAllDocuments}>
                    Select All
                  </Button>
                )}
              </div>

              {/* Document Categories Overview */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3 text-center">
                    <FileText className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-blue-900">Legal Documents</p>
                    <p className="text-xs text-blue-700">
                      {documents.filter((d) => d.category === "Legal").length} files
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-3 text-center">
                    <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-900">Financial</p>
                    <p className="text-xs text-green-700">
                      {documents.filter((d) => d.category === "Financial").length} files
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Documents List */}
            <div className="px-4 space-y-3">
              {Object.entries(getGroupedDocuments()).map(([groupName, groupDocs]) => (
                <div key={groupName}>
                  {groupBy !== "none" && (
                    <div className="flex items-center gap-2 mb-3 mt-6">
                      <h4 className="font-semibold text-gray-900">{groupName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {groupDocs.length} documents
                      </Badge>
                    </div>
                  )}

                  {groupDocs.map((document) => (
                    <Card
                      key={document.id}
                      className={`overflow-hidden transition-all ${
                        selectedDocuments.includes(document.id) ? "ring-2 ring-green-500 bg-green-50" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {isSelectMode && (
                            <Checkbox
                              checked={selectedDocuments.includes(document.id)}
                              onCheckedChange={() => toggleDocumentSelection(document.id)}
                              className="mt-1"
                            />
                          )}
                          <div className="flex-shrink-0">{getDocumentIcon(document.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm mb-1">{document.type}</h4>
                                <p className="text-xs text-gray-600 mb-1">{document.propertyName}</p>
                                <p className="text-xs text-gray-500 truncate">{document.fileName}</p>
                              </div>
                              <Badge className={`text-xs ml-2 ${getDocumentStatusColor(document.status)}`}>
                                {document.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-3">
                              <div>
                                <span className="text-gray-500">Uploaded:</span>
                                <span className="ml-1">{formatDate(document.uploadDate)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Size:</span>
                                <span className="ml-1">{document.size}</span>
                              </div>
                              {document.expiryDate && (
                                <>
                                  <div className="col-span-2">
                                    <span className="text-gray-500">Expires:</span>
                                    <span className="ml-1">{formatDate(document.expiryDate)}</span>
                                  </div>
                                </>
                              )}
                            </div>

                            {!isSelectMode && (
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="flex-1 h-8">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 h-8">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>

            {/* Bulk Operations Panel */}
            {selectedDocuments.length > 0 && (
              <div className="px-4">
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-base">Bulk Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" onClick={() => handleBulkOrganize("export")}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                      <Button variant="outline" onClick={() => handleBulkOrganize("share")}>
                        <Share className="h-4 w-4 mr-2" />
                        Share with Managers
                      </Button>
                      <Button variant="outline" onClick={() => handleBulkOrganize("archive")}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive Documents
                      </Button>
                      <Button variant="outline" onClick={handleBulkDownload}>
                        <Package className="h-4 w-4 mr-2" />
                        Download ZIP
                      </Button>
                    </div>

                    <Separator />

                    <div className="text-xs text-gray-600">
                      <p className="font-medium mb-1">Selected Documents Summary:</p>
                      <p>• {selectedDocuments.length} documents selected</p>
                      <p>
                        • Total size:{" "}
                        {documents
                          .filter((doc) => selectedDocuments.includes(doc.id))
                          .reduce((acc, doc) => acc + Number.parseFloat(doc.size.replace(/[^\d.]/g, "")), 0)
                          .toFixed(1)}{" "}
                        MB
                      </p>
                      <p>
                        • Categories:{" "}
                        {[
                          ...new Set(
                            documents.filter((doc) => selectedDocuments.includes(doc.id)).map((doc) => doc.category),
                          ),
                        ].join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Document Management Note */}
            <div className="px-4">
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Document Reminders</p>
                      <p className="text-xs text-amber-700 mt-1">
                        2 documents are expiring within the next 30 days. Use bulk operations to organize and share
                        documents with your property managers for renewal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <TabsList className="grid w-full grid-cols-6 h-16 bg-transparent rounded-none">
              <TabsTrigger
                value="dashboard"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
              >
                <Home className="h-4 w-4" />
                <span className="text-xs">Properties</span>
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50 relative"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">Messages</span>
                {conversations.filter((c) => c.lastMessage.unread).length > 0 && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {conversations.filter((c) => c.lastMessage.unread).length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50 relative"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="text-xs">Documents</span>
                {selectedDocuments.length > 0 && (
                  <span className="absolute top-1 right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {selectedDocuments.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
              >
                <FileText className="h-4 w-4" />
                <span className="text-xs">Reports</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state-active]:bg-green-50"
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
