"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  SlidersHorizontal,
  Bed,
  Bath,
  CheckCircle,
  Shield,
  Calendar,
  HandCoins,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";

const propertiesForSale = [
  {
    id: 1,
    title: "Modern 3-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    fullAddress: "Plot 45, Admiralty Way, Lekki Phase 1, Lagos",
    price: 85000000, // ₦85M
    type: "Duplex",
    image: "/placeholder.svg?height=200&width=300",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    bedrooms: 3,
    bathrooms: 3,
    status: "Available",
    legalVerification: "CAC Verified",
    verified: true,
    features: [
      "Fitted Kitchen",
      "Swimming Pool",
      "Generator",
      "Security",
      "Parking",
    ],
    description:
      "Luxury 3-bedroom duplex in the prestigious Lekki Phase 1. Features modern architecture, fitted kitchen, swimming pool, and 24/7 security. Perfect for families seeking upscale living in Lagos.",
    manager: {
      name: "Premium Properties Ltd",
      phone: "+234 801 234 5678",
      email: "info@premiumproperties.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    isFavorite: false,
    views: 234,
    datePosted: "2024-03-15",
  },
  {
    id: 2,
    title: "Executive 4-Bedroom Detached House",
    location: "Maitama, Abuja",
    fullAddress: "House 12, Maitama District, Abuja FCT",
    price: 120000000, // ₦120M
    type: "Detached House",
    image: "/placeholder.svg?height=200&width=300",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    bedrooms: 4,
    bathrooms: 4,
    status: "Under Offer",
    legalVerification: "Land Registry Verified",
    verified: true,
    features: ["Garden", "Study Room", "Garage", "Generator", "Security"],
    description:
      "Magnificent 4-bedroom detached house in the heart of Maitama. Boasts spacious rooms, beautiful garden, and premium finishes throughout. Ideal for executives and diplomats.",
    manager: {
      name: "Capital Homes Realty",
      phone: "+234 802 345 6789",
      email: "sales@capitalhomes.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    isFavorite: true,
    views: 189,
    datePosted: "2024-03-10",
  },
  {
    id: 3,
    title: "Luxury 2-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    fullAddress: "Towers 3, Eko Atlantic City, Victoria Island, Lagos",
    price: 65000000, // ₦65M
    type: "Apartment",
    image: "/placeholder.svg?height=200&width=300",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    bedrooms: 2,
    bathrooms: 2,
    status: "Available",
    legalVerification: "CAC Verified",
    verified: true,
    features: ["Ocean View", "Gym Access", "Concierge", "Parking", "Generator"],
    description:
      "Stunning 2-bedroom apartment with breathtaking ocean views in Eko Atlantic. Features world-class amenities including gym, concierge service, and 24/7 security.",
    manager: {
      name: "Eko Atlantic Properties",
      phone: "+234 803 456 7890",
      email: "info@ekoatlantic.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    isFavorite: false,
    views: 312,
    datePosted: "2024-03-12",
  },
  {
    id: 4,
    title: "Spacious 5-Bedroom Mansion",
    location: "Banana Island, Lagos",
    fullAddress: "Plot 7, Banana Island, Ikoyi, Lagos",
    price: 250000000, // ₦250M
    type: "Mansion",
    image: "/placeholder.svg?height=200&width=300",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    bedrooms: 5,
    bathrooms: 6,
    status: "Available",
    legalVerification: "Land Registry Verified",
    verified: true,
    features: [
      "Private Beach",
      "Swimming Pool",
      "Tennis Court",
      "Staff Quarters",
      "Helipad",
    ],
    description:
      "Ultra-luxury 5-bedroom mansion on exclusive Banana Island. Features private beach access, swimming pool, tennis court, and helipad. The epitome of luxury living in Lagos.",
    manager: {
      name: "Elite Island Properties",
      phone: "+234 804 567 8901",
      email: "luxury@eliteisland.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    isFavorite: false,
    views: 156,
    datePosted: "2024-03-08",
  },
  {
    id: 5,
    title: "Affordable 2-Bedroom Flat",
    location: "Ikeja, Lagos",
    fullAddress: "Block C, Harmony Estate, Ikeja, Lagos",
    price: 25000000, // ₦25M
    type: "Mini Flat",
    image: "/placeholder.svg?height=200&width=300",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    bedrooms: 2,
    bathrooms: 2,
    status: "Sold",
    legalVerification: "CAC Verified",
    verified: true,
    features: ["Fitted Kitchen", "Parking", "Security", "Generator"],
    description:
      "Well-designed 2-bedroom flat in a secure estate. Perfect for young professionals and small families. Features modern amenities at an affordable price point.",
    manager: {
      name: "Harmony Estate Sales",
      phone: "+234 805 678 9012",
      email: "sales@harmonyestate.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    isFavorite: false,
    views: 89,
    datePosted: "2024-02-28",
  },
];

const locations = [
  { value: "all", label: "All Locations" },
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "port-harcourt", label: "Port Harcourt" },
  { value: "kano", label: "Kano" },
  { value: "ibadan", label: "Ibadan" },
];

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "detached-house", label: "Detached House" },
  { value: "mansion", label: "Mansion" },
  { value: "mini-flat", label: "Mini Flat" },
  { value: "bungalow", label: "Bungalow" },
];

const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(0)}M`;
  }
  return `₦${price.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700";
    case "Under Offer":
      return "bg-yellow-100 text-yellow-700";
    case "Sold":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function PropertySalesPage() {
  const [listingType, setListingType] = useState("sale");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([10000000, 200000000]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");

  const filteredProperties = propertiesForSale.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesLocation =
      selectedLocation === "all" ||
      property.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesType =
      selectedType === "all" ||
      property.type.toLowerCase().replace(/\s+/g, "-") === selectedType;
    const matchesBedrooms =
      selectedBedrooms === "all" ||
      property.bedrooms.toString() === selectedBedrooms;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesLocation &&
      matchesType &&
      matchesBedrooms
    );
  });

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
            <h1 className="text-lg font-semibold text-gray-900">
              Properties for Sale
            </h1>
          </div>

          {/* Listing Type Toggle */}
          <Tabs
            value={listingType}
            onValueChange={setListingType}
            className="w-full mb-3"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="rent"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                For Rent
              </TabsTrigger>
              <TabsTrigger
                value="sale"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                For Sale
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search properties, locations..."
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap flex-shrink-0"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh]">
                <SheetHeader>
                  <SheetTitle>Property Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6 overflow-y-auto max-h-[70vh]">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Price Range (₦{(priceRange[0] / 1000000).toFixed(0)}M - ₦
                      {(priceRange[1] / 1000000).toFixed(0)}M)
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={300000000}
                      min={5000000}
                      step={5000000}
                      className="w-full"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Location
                    </label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                          >
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Property Type
                    </label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger>
                        <SelectValue />
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

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Bedrooms
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant={
                          selectedBedrooms === "all" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedBedrooms("all")}
                      >
                        Any
                      </Button>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={num}
                          variant={
                            selectedBedrooms === num.toString()
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedBedrooms(num.toString())}
                        >
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Features
                    </label>
                    <div className="space-y-2">
                      {[
                        "Swimming Pool",
                        "Garden",
                        "Parking",
                        "Security",
                        "Generator",
                        "Gym",
                      ].map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={feature} />
                          <label htmlFor={feature} className="text-sm">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                    <Button variant="outline" className="flex-1">
                      Clear All
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
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

            <Select value={selectedType} onValueChange={setSelectedType}>
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
          </div>
        </div>
      </header>

      {/* Results Summary */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">
              {filteredProperties.length} properties
            </span>{" "}
            for sale
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-green-600">
              <Filter className="h-4 w-4 mr-1" />
              Sort by Price
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="px-4 py-4 space-y-4">
        {filteredProperties.map((property) => (
          <Link key={property.id} href={`/sales/${property.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <Badge
                    className={`text-xs ${getStatusColor(property.status)}`}
                  >
                    {property.status}
                  </Badge>
                </div>

                {/* Legal Verification Badge */}
                {property.verified && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-600 text-white text-xs flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                )}

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute bottom-2 right-2 bg-white/80 hover:bg-white ${
                    property.isFavorite ? "text-red-500" : "text-gray-600"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle favorite toggle
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      property.isFavorite ? "fill-current" : ""
                    }`}
                  />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Title and Location */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {property.title}
                    </h4>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {property.location}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {property.type}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms} bath</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span className="text-xs">{property.views} views</span>
                    </div>
                  </div>

                  {/* Legal Verification */}
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">
                      {property.legalVerification}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 3).map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs"
                      >
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
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 h-9"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle schedule inspection
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Inspection
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-9"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle make offer
                      }}
                    >
                      <HandCoins className="h-4 w-4 mr-2" />
                      Make Offer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 py-6">
        <Button variant="outline" className="w-full h-12">
          Load More Properties
        </Button>
      </div>
    </div>
  );
}
