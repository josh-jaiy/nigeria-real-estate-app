'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Eye, 
  Heart,
  Share2,
  Plus,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function DynamicPropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const {
    properties,
    isLoading,
    error,
    total,
    page,
    totalPages,
    fetchProperties,
    incrementView,
    clearError
  } = useProperties();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minBedrooms: searchParams.get('minBedrooms') || '',
    maxBedrooms: searchParams.get('maxBedrooms') || '',
    status: 'available',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 12,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'DESC'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch properties when filters change
  useEffect(() => {
    const fetchData = async () => {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
      );
      await fetchProperties(cleanFilters);
    };

    fetchData();
  }, [filters, fetchProperties]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value.toString());
      }
    });
    
    const newUrl = `/properties/dynamic?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handlePropertyClick = async (property: any) => {
    // Increment view count
    await incrementView(property.id);
    
    // Navigate to property details
    router.push(`/properties/${property.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => { clearError(); window.location.reload(); }}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
          <p className="text-gray-600">
            {total > 0 ? `${total} properties found` : 'No properties found'}
          </p>
        </div>
        
        {user?.role === 'landlord' && (
          <Button onClick={() => router.push('/properties/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2">
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="duplex">Duplex</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="mansion">Mansion</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All States</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Rivers">Rivers</SelectItem>
                <SelectItem value="Ogun">Ogun</SelectItem>
                <SelectItem value="Kano">Kano</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <Input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <Input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Bedrooms</label>
              <Select value={filters.minBedrooms} onValueChange={(value) => handleFilterChange('minBedrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Min Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <Input
                placeholder="City"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="viewCount">Most Viewed</SelectItem>
              <SelectItem value="title">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
      )}

      {/* Properties Grid */}
      {!isLoading && properties.length > 0 && (
        <>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {properties.map((property) => (
              <Card 
                key={property.id} 
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
                onClick={() => handlePropertyClick(property)}
              >
                <div className={viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    {property.images && property.images.length > 0 ? (
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge className={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {property.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
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

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      {property.viewCount} views
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </Button>
              
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, page - 2) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {!isLoading && properties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => setFilters({
              search: '',
              type: '',
              city: '',
              state: '',
              minPrice: '',
              maxPrice: '',
              minBedrooms: '',
              maxBedrooms: '',
              status: 'available',
              page: 1,
              limit: 12,
              sortBy: 'createdAt',
              sortOrder: 'DESC'
            })}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
