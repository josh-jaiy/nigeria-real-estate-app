"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Users,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    owner: {
      name: "Chief Adebayo Johnson",
      phone: "+234 803 123 4567",
      email: "adebayo.johnson@email.com",
    },
    rent: 2500000,
    status: "Occupied",
    tenantCount: 1,
    leaseExpiry: "2024-12-31",
    lastPayment: "2024-01-15",
    image: "/placeholder.svg?height=100&width=100",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "85 sqm",
    yearBuilt: 2020,
    amenities: ["Parking", "Security", "Generator", "Water"],
    documents: ["Lease Agreement", "Property Title", "Insurance"],
    notes: "Premium location with ocean view. Tenant is a young professional.",
  },
  {
    id: 2,
    title: "Executive 3-Bedroom Duplex",
    address: "Plot 45, Maitama District, Abuja",
    owner: {
      name: "Mrs. Fatima Aliyu",
      phone: "+234 806 987 6543",
      email: "fatima.aliyu@email.com",
    },
    rent: 4200000,
    status: "Vacant",
    tenantCount: 0,
    leaseExpiry: null,
    lastPayment: null,
    image: "/placeholder.svg?height=100&width=100",
    type: "Duplex",
    bedrooms: 3,
    bathrooms: 3,
    size: "150 sqm",
    yearBuilt: 2019,
    amenities: ["Parking", "Security", "Generator", "Garden", "AC"],
    documents: ["Property Title", "Building Permit"],
    notes: "Recently renovated. Ready for new tenant.",
  },
  {
    id: 3,
    title: "Luxury Self-Contained Studio",
    address: "12 GRA, Port Harcourt, Rivers State",
    owner: {
      name: "Mr. Emeka Okafor",
      phone: "+234 807 456 7890",
      email: "emeka.okafor@email.com",
    },
    rent: 1800000,
    status: "Occupied",
    tenantCount: 1,
    leaseExpiry: "2024-08-30",
    lastPayment: "2024-01-10",
    image: "/placeholder.svg?height=100&width=100",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "45 sqm",
    yearBuilt: 2021,
    amenities: ["Parking", "Security", "Internet", "AC"],
    documents: ["Lease Agreement", "Property Title"],
    notes: "Fully furnished studio in prime location.",
  },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || property.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || property.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Occupied":
        return "bg-green-100 text-green-700"
      case "Vacant":
        return "bg-yellow-100 text-yellow-700"
      case "Maintenance":
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
                <h1 className="text-xl font-bold text-gray-900">Property Management</h1>
                <p className="text-sm text-gray-600">{filteredProperties.length} properties</p>
              </div>
            </div>
            <Link href="/manager/properties/add">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
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
              placeholder="Search properties, addresses, or owners..."
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
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="duplex">Duplex</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="house">House</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <Badge className={`absolute -top-1 -right-1 text-xs ${getStatusColor(property.status)}`}>
                      {property.status}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{property.address}</span>
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
                            <Link href={`/manager/properties/${property.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/properties/${property.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Property
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/properties/${property.id}/tenants`}>
                              <Users className="h-4 w-4 mr-2" />
                              Manage Tenants
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/manager/properties/${property.id}/documents`}>
                              <FileText className="h-4 w-4 mr-2" />
                              Documents
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Owner:</span>
                        <p className="font-medium">{property.owner.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Annual Rent:</span>
                        <p className="font-medium text-green-600">{formatCurrency(property.rent)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Property Type:</span>
                        <p className="font-medium">
                          {property.type} • {property.bedrooms}BR/{property.bathrooms}BA
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tenants:</span>
                        <p className="font-medium">
                          {property.tenantCount} tenant{property.tenantCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {property.status === "Occupied" && property.leaseExpiry && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Lease expires: {new Date(property.leaseExpiry).toLocaleDateString()}</span>
                        </div>
                        {property.lastPayment && (
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>Last payment: {new Date(property.lastPayment).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link href={`/manager/properties/${property.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/manager/properties/${property.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/manager/properties/${property.id}/tenants`}>
                        <Button variant="outline" size="sm">
                          <Users className="h-3 w-3 mr-1" />
                          Tenants
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new property.</p>
            <Link href="/manager/properties/add">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
