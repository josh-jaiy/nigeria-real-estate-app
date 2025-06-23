import { useState, useCallback } from 'react';
import { dashboardApi, propertiesApi, rentEasyApi, usersApi } from '@/lib/api';
import { useStore } from '@/store/useStore';
import { DashboardStats } from '@/store/useStore';

export interface DashboardAnalytics {
  monthlyStats: Array<{
    month: string;
    applications: number;
    payments: number;
    revenue: number;
  }>;
  usersByRole: Array<{
    role: string;
    count: number;
  }>;
  propertiesByType: Array<{
    type: string;
    count: number;
  }>;
  paymentTrends: Array<{
    date: string;
    payments: number;
    amount: number;
  }>;
}

export interface RecentActivities {
  recentApplications: Array<{
    id: string;
    applicantName: string;
    propertyTitle: string;
    status: string;
    createdAt: string;
  }>;
  recentPayments: Array<{
    id: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    applicantName: string;
  }>;
  recentProperties: Array<{
    id: string;
    title: string;
    landlordName: string;
    price: number;
    createdAt: string;
  }>;
}

export interface PaymentOverview {
  totalPayments: number;
  paidPayments: number;
  overduePayments: number;
  pendingPayments: number;
  totalCollected: number;
  totalExpected: number;
  collectionRate: number;
  overdueRate: number;
}

export interface PropertyOverview {
  totalProperties: number;
  availableProperties: number;
  rentedProperties: number;
  soldProperties: number;
  averagePrice: number;
  occupancyRate: number;
}

export interface UserOverview {
  totalUsers: number;
  buyers: number;
  landlords: number;
  managers: number;
  verifiedUsers: number;
  verificationRate: number;
}

export interface UseDashboardReturn {
  // State
  dashboardStats: DashboardStats | null;
  analytics: DashboardAnalytics | null;
  recentActivities: RecentActivities | null;
  paymentOverview: PaymentOverview | null;
  propertyOverview: PropertyOverview | null;
  userOverview: UserOverview | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDashboardStats: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  fetchRecentActivities: () => Promise<void>;
  fetchPaymentOverview: () => Promise<void>;
  fetchPropertyOverview: () => Promise<void>;
  fetchUserOverview: () => Promise<void>;
  fetchAllDashboardData: () => Promise<void>;
  clearError: () => void;
}

export function useDashboard(): UseDashboardReturn {
  const {
    dashboardStats,
    setDashboardStats,
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  } = useStore();

  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivities | null>(null);
  const [paymentOverview, setPaymentOverview] = useState<PaymentOverview | null>(null);
  const [propertyOverview, setPropertyOverview] = useState<PropertyOverview | null>(null);
  const [userOverview, setUserOverview] = useState<UserOverview | null>(null);

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await dashboardApi.getStats();
      const stats = response.data;
      
      setDashboardStats(stats);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  }, [setDashboardStats, setLoading, setError]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await dashboardApi.getAnalytics();
      const analyticsData = response.data;
      
      setAnalytics(analyticsData);
    } catch (err: any) {
      console.error('Failed to fetch analytics:', err);
    }
  }, []);

  // Fetch recent activities
  const fetchRecentActivities = useCallback(async () => {
    try {
      const response = await dashboardApi.getRecentActivities();
      const activitiesData = response.data;
      
      setRecentActivities(activitiesData);
    } catch (err: any) {
      console.error('Failed to fetch recent activities:', err);
    }
  }, []);

  // Fetch payment overview
  const fetchPaymentOverview = useCallback(async () => {
    try {
      const response = await dashboardApi.getPaymentOverview();
      const paymentData = response.data;
      
      setPaymentOverview(paymentData);
    } catch (err: any) {
      console.error('Failed to fetch payment overview:', err);
    }
  }, []);

  // Fetch property overview
  const fetchPropertyOverview = useCallback(async () => {
    try {
      const response = await dashboardApi.getPropertyOverview();
      const propertyData = response.data;
      
      setPropertyOverview(propertyData);
    } catch (err: any) {
      console.error('Failed to fetch property overview:', err);
    }
  }, []);

  // Fetch user overview
  const fetchUserOverview = useCallback(async () => {
    try {
      const response = await dashboardApi.getUserOverview();
      const userData = response.data;
      
      setUserOverview(userData);
    } catch (err: any) {
      console.error('Failed to fetch user overview:', err);
    }
  }, []);

  // Fetch all dashboard data
  const fetchAllDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all dashboard data in parallel
      await Promise.allSettled([
        fetchDashboardStats(),
        fetchAnalytics(),
        fetchRecentActivities(),
        fetchPaymentOverview(),
        fetchPropertyOverview(),
        fetchUserOverview(),
      ]);
    } catch (err: any) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [
    fetchDashboardStats,
    fetchAnalytics,
    fetchRecentActivities,
    fetchPaymentOverview,
    fetchPropertyOverview,
    fetchUserOverview,
    setLoading,
    setError,
  ]);

  return {
    // State
    dashboardStats,
    analytics,
    recentActivities,
    paymentOverview,
    propertyOverview,
    userOverview,
    isLoading,
    error,
    
    // Actions
    fetchDashboardStats,
    fetchAnalytics,
    fetchRecentActivities,
    fetchPaymentOverview,
    fetchPropertyOverview,
    fetchUserOverview,
    fetchAllDashboardData,
    clearError,
  };
}
