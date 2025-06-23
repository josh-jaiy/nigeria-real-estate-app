import { useState, useEffect, useCallback } from 'react';
import { propertiesApi } from '@/lib/api';
import { useStore } from '@/store/useStore';
import { Property } from '@/store/useStore';

export interface PropertyFilters {
  search?: string;
  type?: string;
  status?: string;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  amenities?: string[];
  landlordId?: string;
  managerId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UsePropertiesReturn {
  properties: Property[];
  featuredProperties: Property[];
  selectedProperty: Property | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  
  // Actions
  fetchProperties: (filters?: PropertyFilters) => Promise<void>;
  fetchFeaturedProperties: (limit?: number) => Promise<void>;
  fetchProperty: (id: string) => Promise<Property | null>;
  searchProperties: (query: string, limit?: number) => Promise<Property[]>;
  getNearbyProperties: (lat: number, lng: number, radius?: number) => Promise<Property[]>;
  createProperty: (propertyData: any) => Promise<Property>;
  updateProperty: (id: string, propertyData: any) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
  incrementView: (id: string) => Promise<void>;
  setSelectedProperty: (property: Property | null) => void;
  clearError: () => void;
}

export function useProperties(): UsePropertiesReturn {
  const {
    properties,
    featuredProperties,
    selectedProperty,
    setProperties,
    setFeaturedProperties,
    setSelectedProperty,
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  } = useStore();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch properties with filters
  const fetchProperties = useCallback(async (filters: PropertyFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await propertiesApi.getAll(filters);
      const { properties: data, total: totalCount } = response.data;
      
      setProperties(data);
      setTotal(totalCount);
      setPage(filters.page || 1);
      setTotalPages(Math.ceil(totalCount / (filters.limit || 10)));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, [setProperties, setLoading, setError]);

  // Fetch featured properties
  const fetchFeaturedProperties = useCallback(async (limit: number = 6) => {
    try {
      const response = await propertiesApi.getFeatured(limit);
      setFeaturedProperties(response.data);
    } catch (err: any) {
      console.error('Failed to fetch featured properties:', err);
    }
  }, [setFeaturedProperties]);

  // Fetch single property
  const fetchProperty = useCallback(async (id: string): Promise<Property | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await propertiesApi.getById(id);
      const property = response.data;
      
      setSelectedProperty(property);
      return property;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch property');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setSelectedProperty, setLoading, setError]);

  // Search properties
  const searchProperties = useCallback(async (query: string, limit: number = 10): Promise<Property[]> => {
    try {
      const response = await propertiesApi.search(query, limit);
      return response.data;
    } catch (err: any) {
      console.error('Failed to search properties:', err);
      return [];
    }
  }, []);

  // Get nearby properties
  const getNearbyProperties = useCallback(async (
    lat: number, 
    lng: number, 
    radius: number = 10
  ): Promise<Property[]> => {
    try {
      const response = await propertiesApi.getNearby(lat, lng, radius);
      return response.data;
    } catch (err: any) {
      console.error('Failed to fetch nearby properties:', err);
      return [];
    }
  }, []);

  // Create property
  const createProperty = useCallback(async (propertyData: any): Promise<Property> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await propertiesApi.create(propertyData);
      const newProperty = response.data;
      
      // Add to current properties list
      setProperties([newProperty, ...properties]);
      
      return newProperty;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create property');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [properties, setProperties, setLoading, setError]);

  // Update property
  const updateProperty = useCallback(async (id: string, propertyData: any): Promise<Property> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await propertiesApi.update(id, propertyData);
      const updatedProperty = response.data;
      
      // Update in current properties list
      setProperties(
        properties.map(property => 
          property.id === id ? updatedProperty : property
        )
      );
      
      // Update selected property if it's the same
      if (selectedProperty?.id === id) {
        setSelectedProperty(updatedProperty);
      }
      
      return updatedProperty;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update property');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [properties, selectedProperty, setProperties, setSelectedProperty, setLoading, setError]);

  // Delete property
  const deleteProperty = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await propertiesApi.delete(id);
      
      // Remove from current properties list
      setProperties(properties.filter(property => property.id !== id));
      
      // Clear selected property if it's the same
      if (selectedProperty?.id === id) {
        setSelectedProperty(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete property');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [properties, selectedProperty, setProperties, setSelectedProperty, setLoading, setError]);

  // Increment view count
  const incrementView = useCallback(async (id: string): Promise<void> => {
    try {
      await propertiesApi.incrementView(id);
      
      // Update view count in local state
      setProperties(
        properties.map(property => 
          property.id === id 
            ? { ...property, viewCount: property.viewCount + 1 }
            : property
        )
      );
      
      // Update selected property if it's the same
      if (selectedProperty?.id === id) {
        setSelectedProperty({
          ...selectedProperty,
          viewCount: selectedProperty.viewCount + 1
        });
      }
    } catch (err: any) {
      console.error('Failed to increment view count:', err);
    }
  }, [properties, selectedProperty, setProperties, setSelectedProperty]);

  return {
    properties,
    featuredProperties,
    selectedProperty,
    isLoading,
    error,
    total,
    page,
    totalPages,
    
    fetchProperties,
    fetchFeaturedProperties,
    fetchProperty,
    searchProperties,
    getNearbyProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    incrementView,
    setSelectedProperty,
    clearError,
  };
}
