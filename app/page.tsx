import {
  Search,
  MapPin,
  Filter,
  Heart,
  Phone,
  MessageCircle,
  Map,
  SlidersHorizontal,
  User,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"

const featuredProperties = [
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
    bedrooms: 2,
    bathrooms: 2,
    isFavorite: false,
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
    bedrooms: 1,
    bathrooms: 1,
    isFavorite: true,
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
    bedrooms: 3,
    bathrooms: 3,
    isFavorite: false,
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
    bedrooms: 1,
    bathrooms: 1,
    isFavorite: false,
    isNew: true,
  },
]

const locations = [
  { value: "lagos", label: "Lagos", count: 1247 },
  { value: "abuja", label: "Abuja", count: 892 },
  { value: "kano", label: "Kano", count: 456 },
  { value: "port-harcourt", label: "Port Harcourt", count: 334 },
  { value: "ibadan", label: "Ibadan", count: 278 },
]

const propertyTypes = [
  { value: "self-contained", label: "Self-Contained" },
  { value: "1-bedroom", label: "1-Bedroom" },
  { value: "2-bedroom", label: "2-Bedroom" },
  { value: "3-bedroom", label: "3-Bedroom" },
  { value: "4-bedroom", label: "4-Bedroom" },
  { value: "studio", label: "Studio" },
]

const quickFilters = [
  { label: "Lagos", value: "lagos", icon: MapPin },
  { label: "Abuja", value: "abuja", icon: MapPin },
  { label: "Kano", value: "kano", icon: MapPin },
  { label: "Under ₦2M", value: "under-2m", icon: null },
  { label: "Furnished", value: "furnished", icon: null },
  { label: "2-Bedroom", value: "2-bedroom", icon: null },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-green-600">NaijaHomes</h1>
              <p className="text-xs text-gray-500">Find your perfect home</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <MessageCircle className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Search Section */}
      <section className="bg-white px-4 py-6 border-b">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Find Your Perfect Home</h2>
            <p className="text-gray-600">Discover quality properties across Nigeria</p>
          </div>

          <div className="space-y-3">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by location, property name..." className="pl-10 h-12 text-base" />
            </div>

            {/* Location and Type Filters */}
            <div className="grid grid-cols-2 gap-3">
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{location.label}</span>
                        <span className="text-xs text-gray-500 ml-2">({location.count})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Link href="/properties">
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-base">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="px-4 py-4 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickFilters.map((filter) => (
            <Button key={filter.value} variant="outline" size="sm" className="whitespace-nowrap flex-shrink-0 h-8">
              {filter.icon && <filter.icon className="h-3 w-3 mr-1" />}
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Featured Properties</h3>
            <p className="text-sm text-gray-600">{featuredProperties.length} properties available</p>
          </div>
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="text-green-600">
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {featuredProperties.map((property) => (
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
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 z-30">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700 shadow-lg">
              <SlidersHorizontal className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6 overflow-y-auto max-h-[70vh]">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-3 block">Price Range (₦ per year)</label>
                <Slider defaultValue={[500000, 5000000]} max={10000000} min={100000} step={100000} className="w-full" />
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
                  {propertyTypes.map((type) => (
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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                <Button variant="outline" className="flex-1">
                  Clear All
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Map View Floating Button */}
      <div className="fixed bottom-24 left-4 z-30">
        <Button size="lg" variant="outline" className="rounded-full h-12 w-12 bg-white shadow-lg border-2">
          <Map className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-16 bg-transparent rounded-none">
            <TabsTrigger
              value="home"
              className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
            >
              <Search className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
            >
              <Bookmark className="h-5 w-5" />
              <span className="text-xs">Saved</span>
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50 relative"
              asChild
            >
              <Link href="/messages">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">Messages</span>
                <span className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </div>
  )
}
