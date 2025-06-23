"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Heart,
  Share,
  MapPin,
  Bed,
  Bath,
  Home,
  CheckCircle,
  Shield,
  Calendar,
  HandCoins,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"

// Mock property data - in real app this would come from API
const property = {
  id: 1,
  title: "Modern 3-Bedroom Duplex",
  location: "Lekki Phase 1, Lagos",
  fullAddress: "Plot 45, Admiralty Way, Lekki Phase 1, Lagos",
  price: 85000000, // ₦85M
  type: "Duplex",
  images: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  bedrooms: 3,
  bathrooms: 3,
  area: "250 sqm",
  yearBuilt: "2022",
  status: "Available",
  legalVerification: "CAC Verified",
  verified: true,
  features: ["Fitted Kitchen", "Swimming Pool", "Generator", "Security", "Parking", "Garden", "Study Room"],
  description:
    "Luxury 3-bedroom duplex in the prestigious Lekki Phase 1. Features modern architecture, fitted kitchen, swimming pool, and 24/7 security. Perfect for families seeking upscale living in Lagos. The property boasts contemporary design with high-quality finishes throughout, spacious living areas, and beautiful outdoor spaces. Located in a secure, gated community with excellent infrastructure and close proximity to shopping centers, schools, and business districts.",
  manager: {
    name: "Premium Properties Ltd",
    phone: "+234 801 234 5678",
    email: "info@premiumproperties.ng",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    responseTime: "Usually responds within 2 hours",
    properties: 45,
    rating: 4.8,
  },
  isFavorite: false,
  views: 234,
  datePosted: "2024-03-15",
}

const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(0)}M`
  }
  return `₦${price.toLocaleString()}`
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700"
    case "Under Offer":
      return "bg-yellow-100 text-yellow-700"
    case "Sold":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function PropertyDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(property.isFavorite)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showInspectionModal, setShowInspectionModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [buyerName, setBuyerName] = useState("")
  const [buyerPhone, setBuyerPhone] = useState("")
  const [buyerEmail, setBuyerEmail] = useState("")
  const [offerMessage, setOfferMessage] = useState("")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleScheduleInspection = () => {
    if (selectedDate && selectedTime) {
      alert(`Inspection scheduled for ${selectedDate.toDateString()} at ${selectedTime}`)
      setShowInspectionModal(false)
      setSelectedDate(undefined)
      setSelectedTime("")
    }
  }

  const handleMakeOffer = () => {
    if (offerAmount && buyerName && buyerPhone && buyerEmail) {
      alert(`Offer of ₦${Number(offerAmount).toLocaleString()} submitted successfully!`)
      setShowOfferModal(false)
      setOfferAmount("")
      setBuyerName("")
      setBuyerPhone("")
      setBuyerEmail("")
      setOfferMessage("")
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
          <div className="flex items-center justify-between">
            <Link href="/sales">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Carousel */}
      <div className="relative bg-black">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={`Property image ${currentImageIndex + 1}`}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`text-xs ${getStatusColor(property.status)}`}>{property.status}</Badge>
          </div>

          {/* Legal Verification Badge */}
          {property.verified && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-600 text-white text-xs flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            </div>
          )}
        </div>

        {/* Image Thumbnails */}
        <div className="flex gap-2 p-4 overflow-x-auto">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                index === currentImageIndex ? "border-green-500" : "border-transparent"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="bg-white px-4 py-6">
        <div className="space-y-4">
          {/* Title and Price */}
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.fullAddress}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-bold text-green-600">{formatPrice(property.price)}</span>
              </div>
              <div className="text-right">
                <div className="text-lg text-gray-700">{property.type}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="text-center">
              <Bed className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">{property.bedrooms}</div>
              <div className="text-xs text-gray-500">Bedrooms</div>
            </div>
            <div className="text-center">
              <Bath className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">{property.bathrooms}</div>
              <div className="text-xs text-gray-500">Bathrooms</div>
            </div>
            <div className="text-center">
              <Home className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">{property.area}</div>
              <div className="text-xs text-gray-500">Area</div>
            </div>
            <div className="text-center">
              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">{property.yearBuilt}</div>
              <div className="text-xs text-gray-500">Built</div>
            </div>
          </div>

          {/* Legal Verification */}
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <span className="text-sm font-medium text-blue-900">{property.legalVerification}</span>
              <p className="text-xs text-blue-700">Legal documents verified and authentic</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Features & Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Property Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{property.views} views</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Posted {property.datePosted}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Manager */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Property Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={property.manager.avatar || "/placeholder.svg"} />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{property.manager.name}</h4>
                {property.manager.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>⭐ {property.manager.rating}</span>
                <span>•</span>
                <span>{property.manager.properties} properties</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{property.manager.responseTime}</p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30">
        <div className="flex gap-3">
          <Dialog open={showInspectionModal} onOpenChange={setShowInspectionModal}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Inspection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Property Inspection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
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
                  onClick={handleScheduleInspection}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirm Inspection
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showOfferModal} onOpenChange={setShowOfferModal}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <HandCoins className="h-4 w-4 mr-2" />
                Make Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Make an Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="offer-amount">Offer Amount (₦)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₦</span>
                    <Input
                      id="offer-amount"
                      type="number"
                      placeholder="Enter your offer"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Listed price: {formatPrice(property.price)}</p>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="buyer-name">Full Name</Label>
                  <Input
                    id="buyer-name"
                    placeholder="Enter your full name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="buyer-phone">Phone Number</Label>
                  <Input
                    id="buyer-phone"
                    placeholder="+234 xxx xxx xxxx"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="buyer-email">Email Address</Label>
                  <Input
                    id="buyer-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="offer-message">Message to Manager (Optional)</Label>
                  <Textarea
                    id="offer-message"
                    placeholder="Add any additional information or conditions..."
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">
                    Your offer will be sent to the property manager for review. You will be notified of their response
                    within 24-48 hours.
                  </p>
                </div>

                <Button
                  onClick={handleMakeOffer}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!offerAmount || !buyerName || !buyerPhone || !buyerEmail}
                >
                  Submit Offer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  )
}
