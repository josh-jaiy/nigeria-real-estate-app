import { ArrowLeft, Filter, MapPin, Heart, Phone, MessageCircle, Map, SlidersHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦2,500,000",
    period: "/year",
    monthlyPrice: "₦208,333",
    type: "2-Bedroom",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Parking", "Security"],
    isFavorite: false,
    bedrooms: 2,
    bathrooms: 2,
    isNew: true,
  },
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
    isFavorite: true,
    bedrooms: 1,
    bathrooms: 1,
    isNew: false,
  },
  {
    id: 3,
    title: "Spacious 3-Bedroom Duplex",
    location: "GRA, Port Harcourt",
    price: "₦3,200,000",
    period: "/year",
    monthlyPrice: "₦266,667",
    type: "3-Bedroom",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Unfurnished", "Parking", "Garden"],
    isFavorite: false,
    bedrooms: 3,
    bathrooms: 3,
    isNew: false,
  },
  {
    id: 4,
    title: "Cozy 1-Bedroom Flat",
    location: "Ikeja, Lagos",
    price: "₦1,200,000",
    period: "/year",
    monthlyPrice: "₦100,000",
    type: "1-Bedroom",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Security", "Water"],
    isFavorite: false,
    bedrooms: 1,
    bathrooms: 1,
    isNew: true,
  },
  {
    id: 5,
    title: "Executive 4-Bedroom Duplex",
    location: "Maitama, Abuja",
    price: "₦5,500,000",
    period: "/year",
    monthlyPrice: "₦458,333",
    type: "4-Bedroom",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Parking", "Security", "Garden", "Swimming Pool"],
    isFavorite: false,
    bedrooms: 4,
    bathrooms: 4,
    isNew: false,
  },
  {
    id: 6,
    title: "Affordable Self-Contained",
    location: "Nasarawa, Kano",
    price: "₦800,000",
    period: "/year",
    monthlyPrice: "₦66,667",
    type: "Self-Contained",
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Water", "Security"],
    isFavorite: false,
    bedrooms: 1,
    bathrooms: 1,
    isNew: true,
  },
]

const locations = [
  { value: "all", label: "All Locations" },
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "kano", label: "Kano" },
  { value: "port-harcourt", label: "Port Harcourt" },
  { value: "ibadan", label: "Ibadan" },
]

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "self-contained", label: "Self-Contained" },
  { value: "1-bedroom", label: "1-Bedroom" },
  { value: "2-bedroom", label: "2-Bedroom" },
  { value: "3-bedroom", label: "3-Bedroom" },
  { value: "4-bedroom", label: "4-Bedroom" },
]

const sortOptions = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "bedrooms", label: "Most Bedrooms" },
]

export default function PropertiesPage() {
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
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search properties..." className="pl-10 h-10" />
            </div>
            <Button variant="outline" size="sm" className="px-3">
              <Map className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Filters Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="whitespace-nowrap flex-shrink-0">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh]">
                <SheetHeader>
                  <SheetTitle>Advanced Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6 overflow-y-auto max-h-[70vh]">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Price Range (₦ per year)</label>
                    <Slider
                      defaultValue={[500000, 5000000]}
                      max={10000000}
                      min={100000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>₦500K</span>
                      <span>₦5M</span>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Number of Bedrooms</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <Button key={num} variant="outline" size="sm" className="h-10">
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Property Type</label>
                    <div className="space-y-2">
                      {propertyTypes.slice(1).map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <Checkbox id={type.value} />
                          <label htmlFor={type.value} className="text-sm">
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Features</label>
                    <div className="space-y-2">
                      {["Furnished", "Parking", "Security", "Generator", "Water", "Garden", "Swimming Pool", "Gym"].map(
                        (feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox id={feature} />
                            <label htmlFor={feature} className="text-sm">
                              {feature}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                    <Button variant="outline" className="flex-1">
                      Clear All
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Results Summary */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{properties.length} properties</span> found
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-green-600">
              <Filter className="h-4 w-4 mr-1" />
              Active filters: 0
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="px-4 py-4 space-y-4">
        {properties.map((property) => (
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
              <div className="absolute top-2 left-2 flex gap-1">
                <Badge className="bg-green-600 text-xs">{property.type}</Badge>
                {property.isNew && (
                  <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                    New
                  </Badge>
                )}
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                  property.isFavorite ? "text-red-500" : "text-gray-600"
                }`}
              >
                <Heart className={`h-4 w-4 ${property.isFavorite ? "fill-current" : ""}`} />
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

      {/* Load More */}
      <div className="px-4 py-6">
        <Button variant="outline" className="w-full h-12">
          Load More Properties
        </Button>
      </div>

      {/* Floating Map Button */}
      <div className="fixed bottom-24 right-4 z-30">
        <Button size="lg" className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700 shadow-lg">
          <Map className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
