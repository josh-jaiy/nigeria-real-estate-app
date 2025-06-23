import { ArrowLeft, Heart, MapPin, Phone, MessageCircle, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const savedProperties = [
  {
    id: 2,
    title: "Luxury Self-Contained Studio",
    location: "Wuse 2, Abuja",
    price: "₦1,800,000",
    period: "/year",
    monthlyPrice: "₦150,000",
    type: "Self-Contained",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Generator", "Water"],
    bedrooms: 1,
    bathrooms: 1,
    savedDate: "2 days ago",
  },
  {
    id: 7,
    title: "Beautiful 2-Bedroom Flat",
    location: "Ikeja, Lagos",
    price: "₦2,200,000",
    period: "/year",
    monthlyPrice: "₦183,333",
    type: "2-Bedroom",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Parking", "Security"],
    bedrooms: 2,
    bathrooms: 2,
    savedDate: "1 week ago",
  },
  {
    id: 8,
    title: "Spacious 3-Bedroom House",
    location: "Gwarinpa, Abuja",
    price: "₦3,800,000",
    period: "/year",
    monthlyPrice: "₦316,667",
    type: "3-Bedroom",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Unfurnished", "Parking", "Garden", "Security"],
    bedrooms: 3,
    bathrooms: 3,
    savedDate: "2 weeks ago",
  },
]

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Saved Properties</h1>
              <p className="text-sm text-gray-600">{savedProperties.length} properties saved</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search saved properties..." className="pl-10 h-10" />
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Recently Saved
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Lagos
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Abuja
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Under ₦2M
          </Button>
        </div>
      </div>

      {/* Saved Properties List */}
      <div className="px-4 py-4 space-y-4">
        {savedProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-600 text-xs">{property.type}</Badge>
              </div>

              {/* Remove from Saved Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
              >
                <Heart className="h-4 w-4 fill-current" />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Title and Location */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{property.title}</h4>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{property.location}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-bold text-green-600">{property.price}</span>
                    <span className="text-gray-500 text-sm">{property.period}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{property.monthlyPrice}/month</div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="text-xs text-gray-500">Saved {property.savedDate}</div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {property.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {property.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.features.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 h-9">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline" className="flex-1 h-9">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no saved properties) */}
      {savedProperties.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Properties</h3>
          <p className="text-gray-600 text-center mb-6">
            Start browsing properties and save your favorites to see them here.
          </p>
          <Link href="/properties">
            <Button className="bg-green-600 hover:bg-green-700">Browse Properties</Button>
          </Link>
        </div>
      )}

      {/* Bottom Navigation Spacer */}
      <div className="h-6"></div>
    </div>
  )
}
