'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Heart, 
  MessageCircle, 
  User, 
  Bookmark, 
  Eye,
  Bed,
  Bath,
  Square,
  Phone,
  ArrowRight,
  Home as HomeIcon,
  Users,
  Shield,
  Zap
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useProperties } from '@/hooks/useProperties';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/hooks/useDashboard';

export default function DynamicHomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { 
    featuredProperties, 
    fetchFeaturedProperties, 
    searchProperties,
    isLoading: propertiesLoading 
  } = useProperties();
  const { dashboardStats, fetchDashboardStats } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      await fetchFeaturedProperties(6);
      if (isAuthenticated) {
        await fetchDashboardStats();
      }
    };
    loadData();
  }, [isAuthenticated]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchProperties(searchQuery, 10);
      setSearchResults(results);
      
      // Navigate to properties page with search params
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedLocation) params.set('state', selectedLocation);
      if (selectedType) params.set('type', selectedType);
      
      router.push(`/properties/dynamic?${params.toString()}`);
    } else {
      router.push('/properties/dynamic');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getMonthlyPrice = (annualPrice: number) => {
    return formatPrice(annualPrice / 12);
  };

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  const handleRentEasyClick = (propertyId: string) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    router.push(`/renteasy/apply/${propertyId}`);
  };

  const locations = [
    { value: "Lagos", label: "Lagos" },
    { value: "Abuja", label: "Abuja" },
    { value: "Rivers", label: "Port Harcourt" },
    { value: "Kano", label: "Kano" },
    { value: "Ogun", label: "Ogun" },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "duplex", label: "Duplex" },
    { value: "bungalow", label: "Bungalow" },
    { value: "mansion", label: "Mansion" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-blue-600">Nigeria Real Estate</h1>
              <p className="text-xs text-gray-500">Find your perfect home</p>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/dynamic')}>
                    <User className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">Hi, {user?.firstName}</span>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => router.push('/auth/login')}>
                  <User className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Find Your Dream Home</h2>
          <p className="text-blue-100 mb-6">Discover quality properties across Nigeria with flexible payment options</p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by location, property name..." 
                  className="pl-10 h-12 text-base text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Location" />
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

              <Button 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {dashboardStats && (
        <section className="px-4 py-6 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dashboardStats.overview.totalProperties}</div>
              <div className="text-sm text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{dashboardStats.active.availableProperties}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dashboardStats.overview.totalUsers}</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{dashboardStats.overview.totalApplications}</div>
              <div className="text-sm text-gray-600">Applications</div>
            </div>
          </div>
        </section>
      )}

      {/* RentEasy Promotion */}
      <section className="px-4 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">🏠 RentEasy - Pay Rent in Installments</h3>
          <p className="text-green-100 mb-4">
            Can't afford full rent upfront? Apply for RentEasy and pay in monthly installments!
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Secure
            </div>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Fast Approval
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Trusted
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Featured Properties</h3>
            <p className="text-sm text-gray-600">
              {featuredProperties.length} featured properties available
            </p>
          </div>
          <Link href="/properties/dynamic">
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {propertiesLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {featuredProperties.map((property) => (
              <Card 
                key={property.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="relative">
                  {property.images && property.images.length > 0 ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 flex gap-1">
                    <Badge className="bg-blue-600 text-xs">{property.type}</Badge>
                    <Badge className="bg-green-600 text-xs">{property.status}</Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{property.title}</h4>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="text-sm truncate">{property.address}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-bold text-blue-600">
                          {formatPrice(property.price)}
                        </span>
                        <span className="text-gray-500 text-sm">/year</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {getMonthlyPrice(property.price)}/month
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms}
                        </div>
                        {property.squareFootage && (
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            {property.squareFootage} sqft
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {property.viewCount} views
                      </div>
                    </div>

                    {property.amenities && property.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700 h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRentEasyClick(property.id);
                        }}
                      >
                        RentEasy Apply
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 h-9"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-16 bg-transparent rounded-none">
            <TabsTrigger
              value="home"
              className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
              asChild
            >
              <Link href="/properties/dynamic">
                <Search className="h-5 w-5" />
                <span className="text-xs">Properties</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="renteasy"
              className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
              asChild
            >
              <Link href="/renteasy/my-plans">
                <Bookmark className="h-5 w-5" />
                <span className="text-xs">RentEasy</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex-col gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
              asChild
            >
              <Link href={isAuthenticated ? "/dashboard/dynamic" : "/auth/login"}>
                <User className="h-5 w-5" />
                <span className="text-xs">Profile</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </div>
  );
}
