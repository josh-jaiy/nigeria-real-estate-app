"use client"

import { useState } from "react"
import {
  TrendingUp,
  HandCoins,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  MessageCircle,
  Clock,
  AlertCircle,
  Upload,
  FileCheck,
  Eye,
  Phone,
  MapPin,
  Search,
  MoreVertical,
  ArrowLeft,
  Bell,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const dashboardStats = [
  {
    title: "Properties Listed",
    value: "24",
    subtitle: "3 new this month",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending Offers",
    value: "12",
    subtitle: "5 new today",
    icon: HandCoins,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Inspections This Week",
    value: "8",
    subtitle: "3 tomorrow",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Legal Verifications",
    value: "18/24",
    subtitle: "6 pending",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const offers = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern 3-Bedroom Duplex",
    propertyLocation: "Lekki Phase 1, Lagos",
    listingPrice: 85000000,
    offerAmount: 80000000,
    buyer: {
      name: "Mr. Adebayo Johnson",
      phone: "+234 801 234 5678",
      email: "adebayo.johnson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "New",
    message:
      "I'm very interested in this property. The offer is based on current market conditions and I'm ready to proceed quickly.",
    dateSubmitted: "2024-03-20",
    timeSubmitted: "10:30 AM",
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Executive 4-Bedroom House",
    propertyLocation: "Maitama, Abuja",
    listingPrice: 120000000,
    offerAmount: 115000000,
    buyer: {
      name: "Dr. Fatima Bello",
      phone: "+234 802 345 6789",
      email: "fatima.bello@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Accepted",
    message:
      "This property meets all my requirements. I can provide proof of funds and complete the transaction within 30 days.",
    dateSubmitted: "2024-03-19",
    timeSubmitted: "2:15 PM",
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Luxury 2-Bedroom Apartment",
    propertyLocation: "Victoria Island, Lagos",
    listingPrice: 65000000,
    offerAmount: 55000000,
    buyer: {
      name: "Mr. Chukwu Okafor",
      phone: "+234 803 456 7890",
      email: "chukwu.okafor@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Rejected",
    message: "The offer is below market value but I'm open to negotiation.",
    dateSubmitted: "2024-03-18",
    timeSubmitted: "4:45 PM",
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: "Spacious 5-Bedroom Mansion",
    propertyLocation: "Banana Island, Lagos",
    listingPrice: 250000000,
    offerAmount: 240000000,
    buyer: {
      name: "Ambassador Williams",
      phone: "+234 804 567 8901",
      email: "ambassador.williams@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "New",
    message:
      "I represent a high-net-worth client interested in this exclusive property. We can provide immediate proof of funds.",
    dateSubmitted: "2024-03-20",
    timeSubmitted: "9:15 AM",
  },
]

const inspections = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern 3-Bedroom Duplex",
    propertyLocation: "Lekki Phase 1, Lagos",
    buyer: {
      name: "Mrs. Sarah Ibrahim",
      phone: "+234 805 678 9012",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    scheduledDate: "2024-03-22",
    scheduledTime: "10:00 AM",
    status: "Upcoming",
    notes: "Buyer specifically interested in the swimming pool and security features.",
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Executive 4-Bedroom House",
    propertyLocation: "Maitama, Abuja",
    buyer: {
      name: "Mr. Ahmed Hassan",
      phone: "+234 806 789 0123",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    scheduledDate: "2024-03-23",
    scheduledTime: "2:00 PM",
    status: "Upcoming",
    notes: "Family viewing - interested in the garden and study room.",
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Luxury 2-Bedroom Apartment",
    propertyLocation: "Victoria Island, Lagos",
    buyer: {
      name: "Ms. Kemi Adebayo",
      phone: "+234 807 890 1234",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    scheduledDate: "2024-03-21",
    scheduledTime: "11:00 AM",
    status: "Completed",
    notes: "Very impressed with the ocean view and modern amenities.",
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: "Affordable 2-Bedroom Flat",
    propertyLocation: "Ikeja, Lagos",
    buyer: {
      name: "Mr. Tunde Ogundimu",
      phone: "+234 808 901 2345",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    scheduledDate: "2024-03-24",
    scheduledTime: "3:00 PM",
    status: "Upcoming",
    notes: "First-time buyer looking for affordable option.",
  },
]

const legalVerifications = [
  {
    id: 1,
    propertyTitle: "Modern 3-Bedroom Duplex",
    propertyLocation: "Lekki Phase 1, Lagos",
    status: "CAC Verified",
    verificationDate: "2024-02-15",
    expiryDate: "2025-02-14",
    documentType: "Certificate of Occupancy",
    verifiedBy: "Corporate Affairs Commission",
  },
  {
    id: 2,
    propertyTitle: "Executive 4-Bedroom House",
    propertyLocation: "Maitama, Abuja",
    status: "Land Registry Verified",
    verificationDate: "2024-01-20",
    expiryDate: "2025-01-19",
    documentType: "Land Title",
    verifiedBy: "Federal Land Registry",
  },
  {
    id: 3,
    propertyTitle: "Luxury 2-Bedroom Apartment",
    propertyLocation: "Victoria Island, Lagos",
    status: "Pending Verification",
    verificationDate: null,
    expiryDate: null,
    documentType: "Certificate of Occupancy",
    verifiedBy: null,
  },
  {
    id: 4,
    propertyTitle: "Spacious 5-Bedroom Mansion",
    propertyLocation: "Banana Island, Lagos",
    status: "Verification Required",
    verificationDate: null,
    expiryDate: null,
    documentType: "Land Title",
    verifiedBy: null,
  },
]

const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(0)}M`
  }
  return `₦${price.toLocaleString()}`
}

const getOfferStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-700"
    case "Accepted":
      return "bg-green-100 text-green-700"
    case "Rejected":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getInspectionStatusColor = (status: string) => {
  switch (status) {
    case "Upcoming":
      return "bg-orange-100 text-orange-700"
    case "Completed":
      return "bg-green-100 text-green-700"
    case "Cancelled":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getLegalStatusColor = (status: string) => {
  switch (status) {
    case "CAC Verified":
    case "Land Registry Verified":
      return "bg-green-100 text-green-700"
    case "Pending Verification":
      return "bg-yellow-100 text-yellow-700"
    case "Verification Required":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function SalesDashboard() {
  const [activeTab, setActiveTab] = useState("offers")
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedInspection, setSelectedInspection] = useState<any>(null)
  const [messageText, setMessageText] = useState("")
  const [newDate, setNewDate] = useState<Date>()
  const [newTime, setNewTime] = useState("")

  const handleOfferAction = (offerId: number, action: "accept" | "reject") => {
    const offer = offers.find((o) => o.id === offerId)
    if (offer) {
      alert(`Offer ${action}ed for ${offer.propertyTitle} - ₦${offer.offerAmount.toLocaleString()}`)
    }
  }

  const handleSendMessage = () => {
    if (selectedOffer && messageText) {
      alert(`Message sent to ${selectedOffer.buyer.name}`)
      setShowMessageModal(false)
      setMessageText("")
      setSelectedOffer(null)
    }
  }

  const handleReschedule = () => {
    if (selectedInspection && newDate && newTime) {
      alert(`Inspection rescheduled for ${newDate.toDateString()} at ${newTime}`)
      setShowRescheduleModal(false)
      setNewDate(undefined)
      setNewTime("")
      setSelectedInspection(null)
    }
  }

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/manager/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">Sales Dashboard</h1>
              <p className="text-sm text-gray-600">Manage property sales activities</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <div className="px-4 py-6 bg-gradient-to-r from-green-600 to-green-700">
        <h2 className="text-xl font-bold text-white mb-4">Sales Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/80">{stat.title}</p>
                    <p className="text-xs text-white/60">{stat.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 py-4 bg-white border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="offers">Offers ({offers.filter((o) => o.status === "New").length})</TabsTrigger>
              <TabsTrigger value="inspections">
                Inspections ({inspections.filter((i) => i.status === "Upcoming").length})
              </TabsTrigger>
              <TabsTrigger value="legal">
                Legal ({legalVerifications.filter((l) => l.status.includes("Verified")).length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="offers" className="space-y-4 mt-0">
            {/* Offers Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Property Offers</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search offers..." className="pl-10" />
              </div>
            </div>

            {/* Offers List */}
            <div className="px-4 space-y-4">
              {offers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Property and Offer Info */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{offer.propertyTitle}</h4>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-sm">{offer.propertyLocation}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Listed:</span>
                              <span className="ml-1 font-medium">{formatPrice(offer.listingPrice)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Offered:</span>
                              <span className="ml-1 font-bold text-green-600">{formatPrice(offer.offerAmount)}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getOfferStatusColor(offer.status)}`}>{offer.status}</Badge>
                      </div>

                      {/* Buyer Info */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={offer.buyer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {offer.buyer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{offer.buyer.name}</p>
                          <p className="text-sm text-gray-600">{offer.buyer.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{offer.dateSubmitted}</p>
                          <p className="text-xs text-gray-500">{offer.timeSubmitted}</p>
                        </div>
                      </div>

                      {/* Buyer Message */}
                      {offer.message && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700 italic">"{offer.message}"</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {offer.status === "New" && (
                          <>
                            <Button
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700 transition-colors"
                              onClick={() => handleOfferAction(offer.id, "accept")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 transition-colors"
                              onClick={() => handleOfferAction(offer.id, "reject")}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSelectedOffer(offer)
                            setShowMessageModal(true)
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message Buyer
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inspections" className="space-y-4 mt-0">
            {/* Inspections Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Property Inspections</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search inspections..." className="pl-10" />
              </div>
            </div>

            {/* Inspections List */}
            <div className="px-4 space-y-4">
              {inspections.map((inspection) => (
                <Card key={inspection.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Property Info */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{inspection.propertyTitle}</h4>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-sm">{inspection.propertyLocation}</span>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getInspectionStatusColor(inspection.status)}`}>
                          {inspection.status}
                        </Badge>
                      </div>

                      {/* Schedule Info */}
                      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">{inspection.scheduledDate}</p>
                            <p className="text-sm text-gray-600">{inspection.scheduledTime}</p>
                          </div>
                        </div>
                        <Separator orientation="vertical" className="h-8" />
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={inspection.buyer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {inspection.buyer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{inspection.buyer.name}</p>
                            <p className="text-sm text-gray-600">{inspection.buyer.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {inspection.notes && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Notes:</span> {inspection.notes}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {inspection.status === "Upcoming" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setSelectedInspection(inspection)
                                setShowRescheduleModal(true)
                              }}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message Buyer
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4 mt-0">
            {/* Legal Header */}
            <div className="px-4 py-4 bg-white border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Legal Verification Status</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search properties..." className="pl-10" />
              </div>
            </div>

            {/* Legal Status List */}
            <div className="px-4 space-y-4">
              {legalVerifications.map((verification) => (
                <Card key={verification.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Property Info */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{verification.propertyTitle}</h4>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-sm">{verification.propertyLocation}</span>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getLegalStatusColor(verification.status)}`}>
                          {verification.status}
                        </Badge>
                      </div>

                      {/* Verification Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Document Type:</span>
                          <span className="ml-2 font-medium">{verification.documentType}</span>
                        </div>
                        {verification.verifiedBy && (
                          <div>
                            <span className="text-gray-500">Verified By:</span>
                            <span className="ml-2 font-medium">{verification.verifiedBy}</span>
                          </div>
                        )}
                        {verification.verificationDate && (
                          <div>
                            <span className="text-gray-500">Verified:</span>
                            <span className="ml-2 font-medium">{verification.verificationDate}</span>
                          </div>
                        )}
                        {verification.expiryDate && (
                          <div>
                            <span className="text-gray-500">Expires:</span>
                            <span className="ml-2 font-medium">{verification.expiryDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Status Indicator */}
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        {verification.status.includes("Verified") ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : verification.status === "Pending Verification" ? (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        <div className="flex-1">
                          {verification.status.includes("Verified") && (
                            <p className="text-sm text-green-700 font-medium">
                              Property is legally verified and ready for sale
                            </p>
                          )}
                          {verification.status === "Pending Verification" && (
                            <p className="text-sm text-yellow-700 font-medium">
                              Verification in progress - documents under review
                            </p>
                          )}
                          {verification.status === "Verification Required" && (
                            <p className="text-sm text-red-700 font-medium">
                              Legal verification required before listing
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {verification.status === "Verification Required" && (
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Proof
                          </Button>
                        )}
                        {verification.status === "Pending Verification" && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            Check Status
                          </Button>
                        )}
                        {verification.status.includes("Verified") && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileCheck className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload New Document
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Contact Legal Team
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Buyer Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Buyer</DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarImage src={selectedOffer.buyer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedOffer.buyer.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedOffer.buyer.name}</p>
                  <p className="text-sm text-gray-600">{selectedOffer.propertyTitle}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full bg-green-600 hover:bg-green-700">
                Send Message
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reschedule Inspection Modal */}
      <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Inspection</DialogTitle>
          </DialogHeader>
          {selectedInspection && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{selectedInspection.propertyTitle}</p>
                <p className="text-sm text-gray-600">{selectedInspection.buyer.name}</p>
              </div>
              <div>
                <Label>New Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {newDate ? newDate.toDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={newDate}
                      onSelect={setNewDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>New Time</Label>
                <Select value={newTime} onValueChange={setNewTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleReschedule}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!newDate || !newTime}
              >
                Confirm Reschedule
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
