'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Home, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAuth, withAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/hooks/useDashboard';
import { useProperties } from '@/hooks/useProperties';
import { useRentEasy } from '@/hooks/useRentEasy';

function DynamicDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const {
    dashboardStats,
    analytics,
    recentActivities,
    paymentOverview,
    propertyOverview,
    userOverview,
    isLoading,
    error,
    fetchAllDashboardData,
    clearError
  } = useDashboard();

  const {
    properties,
    featuredProperties,
    fetchProperties,
    fetchFeaturedProperties
  } = useProperties();

  const {
    applications,
    paymentPlans,
    scheduledPayments,
    fetchApplications,
    fetchPaymentPlans,
    fetchScheduledPayments,
    fetchOverduePayments,
    fetchUpcomingPayments
  } = useRentEasy();

  const [overduePayments, setOverduePayments] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch dashboard stats and analytics
        await fetchAllDashboardData();
        
        // Fetch properties data
        await fetchProperties({ limit: 10 });
        await fetchFeaturedProperties(6);
        
        // Fetch RentEasy data
        await fetchApplications({ limit: 10 });
        await fetchPaymentPlans({ limit: 10 });
        await fetchScheduledPayments({ limit: 10 });
        
        // Fetch payment-specific data
        const overdue = await fetchOverduePayments();
        const upcoming = await fetchUpcomingPayments(7);
        setOverduePayments(overdue);
        setUpcomingPayments(upcoming);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Loading state
  if (isLoading && !dashboardStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => { clearError(); window.location.reload(); }}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Badge variant="secondary" className="ml-3">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your real estate business today.
          </p>
        </div>

        {/* Stats Overview */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.overview.totalProperties}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.active.availableProperties} available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.overview.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.active.activeUsers} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{dashboardStats.overview.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.rates.paymentSuccessRate.toFixed(1)}% success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.overview.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.active.pendingApplications} pending
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="renteasy">RentEasy</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              {recentActivities && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest updates from your platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.recentApplications.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.applicantName}</p>
                            <p className="text-xs text-gray-500">
                              Applied for {activity.propertyTitle}
                            </p>
                          </div>
                          <Badge variant={activity.status === 'approved' ? 'default' : 'secondary'}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => router.push('/properties/create')}
                    >
                      <Plus className="h-6 w-6 mb-2" />
                      Add Property
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => router.push('/renteasy/applications')}
                    >
                      <Eye className="h-6 w-6 mb-2" />
                      View Applications
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => router.push('/payments')}
                    >
                      <DollarSign className="h-6 w-6 mb-2" />
                      Manage Payments
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => router.push('/reports')}
                    >
                      <Download className="h-6 w-6 mb-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Overdue Payments */}
              {overduePayments.length > 0 && (
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Overdue Payments ({overduePayments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {overduePayments.slice(0, 3).map((payment, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div>
                            <p className="font-medium">₦{payment.amount?.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                          </div>
                          <Badge variant="destructive">
                            {payment.daysLate} days late
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Upcoming Payments */}
              {upcomingPayments.length > 0 && (
                <Card className="border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-600 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Upcoming Payments ({upcomingPayments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingPayments.slice(0, 3).map((payment, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium">₦{payment.amount?.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                          </div>
                          <Badge variant="secondary">
                            Pending
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Properties Overview</h3>
              <Button onClick={() => router.push('/properties')}>
                View All Properties
              </Button>
            </div>
            
            {propertyOverview && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{propertyOverview.totalProperties}</div>
                    <Progress value={propertyOverview.occupancyRate} className="mt-2" />
                    <p className="text-sm text-gray-600 mt-1">
                      {propertyOverview.occupancyRate.toFixed(1)}% occupancy rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {propertyOverview.availableProperties}
                    </div>
                    <p className="text-sm text-gray-600">Ready for rent</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ₦{propertyOverview.averagePrice.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Per property</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Properties */}
            {properties.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.slice(0, 5).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{property.title}</h4>
                          <p className="text-sm text-gray-600">{property.address}</p>
                          <p className="text-sm font-medium">₦{property.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Add more tab content here... */}
        </Tabs>
      </div>
    </div>
  );
}

export default withAuth(DynamicDashboard);
