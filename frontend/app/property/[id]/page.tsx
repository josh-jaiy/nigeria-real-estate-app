"use client"

import {
  ArrowLeft,
  Heart,
  Share,
  MapPin,
  Bed,
  Bath,
  Car,
  Shield,
  Zap,
  Droplets,
  Phone,
  MessageCircle,
  Calendar,
  Wifi,
  Home,
  TreePine,
  ChevronLeft,
  ChevronRight,
  Star,
  Navigation,
  GraduationCap,
  Bus,
  ShoppingCart,
  Building,
  Hospital,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const property = {
  id: 1,
  title: "Modern 2-Bedroom Apartment",
  location: "Victoria Island, Lagos",
  fullAddress: "15 Ahmadu Bello Way, Victoria Island, Lagos State",
  price: "₦2,500,000",
  period: "/year",
  monthlyPrice: "₦208,333",
  type: "2-Bedroom",
  images: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  features: ["Furnished", "Parking", "Security", "Generator", "Water", "Air Conditioning"],
  bedrooms: 2,
  bathrooms: 2,
  area: "85 sqm",
  furnished: "Fully Furnished",
  yearBuilt: "2020",
  floorLevel: "3rd Floor",
  description:
    "Beautiful modern apartment in the heart of Victoria Island. This fully furnished 2-bedroom apartment features contemporary design, high-quality finishes, and all modern amenities. The property offers stunning city views and is perfect for professionals and small families looking for luxury living in Lagos. The apartment comes with 24/7 security, backup generator, and dedicated parking space.",
  amenities: [
    { icon: Bed, label: "2 Bedrooms", available: true },
    { icon: Bath, label: "2 Bathrooms", available: true },
    { icon: Car, label: "Parking Space", available: true },
    { icon: Shield, label: "24/7 Security", available: true },
    { icon: Zap, label: "Generator", available: true },
    { icon: Droplets, label: "Water Supply", available: true },
    { icon: Wifi, label: "Internet Ready", available: true },
    { icon: Home, label: "Furnished", available: true },
    { icon: TreePine, label: "Garden Access", available: false },
  ],
  nearbyLandmarks: [
    {
      category: "Transportation",
      icon: Bus,
      items: [
        { name: "Tafawa Balewa Square Bus Stop", distance: "0.3 km", walkTime: "4 min walk" },
        { name: "CMS Bus Terminal", distance: "0.8 km", walkTime: "10 min walk" },
        { name: "Lagos Island Ferry Terminal", distance: "1.2 km", walkTime: "15 min walk" },
      ],
    },
    {
      category: "Education",
      icon: GraduationCap,
      items: [
        { name: "Corona Schools", distance: "0.5 km", walkTime: "6 min walk" },
        { name: "Dowen College", distance: "1.1 km", walkTime: "14 min walk" },
        { name: "University of Lagos", distance: "8.5 km", walkTime: "25 min drive" },
      ],
    },
    {
      category: "Shopping",
      icon: ShoppingCart,
      items: [
        { name: "Palms Shopping Mall", distance: "2.1 km", walkTime: "8 min drive" },
        { name: "Silverbird Galleria", distance: "1.8 km", walkTime: "6 min drive" },
        { name: "Local Market", distance: "0.4 km", walkTime: "5 min walk" },
      ],
    },
    {
      category: "Healthcare",
      icon: Hospital,
      items: [
        { name: "Lagos University Teaching Hospital", distance: "3.2 km", walkTime: "12 min drive" },
        { name: "Reddington Hospital", distance: "1.5 km", walkTime: "5 min drive" },
        { name: "Pharmacy Plus", distance: "0.2 km", walkTime: "3 min walk" },
      ],
    },
    {
      category: "Business",
      icon: Building,
      items: [
        { name: "Nigerian Stock Exchange", distance: "0.6 km", walkTime: "8 min walk" },
        { name: "Central Bank of Nigeria", distance: "0.9 km", walkTime: "11 min walk" },
        { name: "Tiamiyu Savage Street", distance: "0.4 km", walkTime: "5 min walk" },
      ],
    },
  ],
  manager: {
    name: "Adebayo Properties",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    properties: 24,
    responseTime: "Usually responds within 2 hours",
    verified: true,
    yearsExperience: 8,
  },
  isFavorite: false,
  views: 156,
  lastUpdated: "2 days ago",
}

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(property.isFavorite)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/properties">
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
          {/* Title and Badge */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.fullAddress}</span>
              </div>
            </div>
            <Badge className="bg-green-600 ml-2">{property.type}</Badge>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold text-green-600">{property.price}</span>
              <span className="text-gray-500 text-lg">{property.period}</span>
            </div>
            <div className="text-right">
              <div className="text-lg text-gray-700">{property.monthlyPrice}</div>
              <div className="text-sm text-gray-500">per month</div>
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
              <Building className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">{property.floorLevel}</div>
              <div className="text-xs text-gray-500">Floor</div>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Furnished:</span>
              <span className="ml-2 font-medium">{property.furnished}</span>
            </div>
            <div>
              <span className="text-gray-500">Year Built:</span>
              <span className="ml-2 font-medium">{property.yearBuilt}</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
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
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span>{property.views} views</span>
            <span>•</span>
            <span>Updated {property.lastUpdated}</span>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <amenity.icon className={`h-5 w-5 ${amenity.available ? "text-green-600" : "text-gray-400"}`} />
                  <span className={`text-sm ${amenity.available ? "text-gray-700" : "text-gray-400"}`}>
                    {amenity.label}
                  </span>
                </div>
                <div className={`w-2 h-2 rounded-full ${amenity.available ? "bg-green-500" : "bg-gray-300"}`} />
              </div>
            ))}
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
              <AvatarFallback>AP</AvatarFallback>
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
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{property.manager.rating}</span>
                </div>
                <span>•</span>
                <span>{property.manager.properties} properties</span>
                <span>•</span>
                <span>{property.manager.yearsExperience} years exp.</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{property.manager.responseTime}</p>
          <div className="flex gap-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Manager
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Manager
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Landmarks */}
      <Card className="mx-4 mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Nearby Landmarks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {property.nearbyLandmarks.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-2 mb-3">
                <category.icon className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-gray-900">{category.category}</h4>
              </div>
              <div className="space-y-2 ml-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.walkTime}</div>
                    </div>
                    <div className="text-sm text-gray-600">{item.distance}</div>
                  </div>
                ))}
              </div>
              {categoryIndex < property.nearbyLandmarks.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="mx-4 mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Interactive map would be here</p>
              <p className="text-xs">{property.location}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-3">
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
        </CardContent>
      </Card>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={toggleFavorite}>
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Tour
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Manager
          </Button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  )
}
