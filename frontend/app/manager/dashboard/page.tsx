"use client"

import {
  Eye,
  TrendingUp,
  Users,
  Home,
  Settings,
  Bell,
  Edit,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const stats = [
  {
    title: "Total Properties",
    value: "24",
    change: "+2 this month",
    icon: Home,
    color: "text-blue-600",
    href: "/manager/properties",
  },
  {
    title: "Active Tenants",
    value: "18",
    change: "+3 this week",
    icon: Users,
    color: "text-green-600",
    href: "/manager/tenants",
  },
  {
    title: "Monthly Revenue",
    value: "₦12.5M",
    change: "+8% this month",
    icon: DollarSign,
    color: "text-purple-600",
    href: "/manager/payments",
  },
  {
    title: "Pending Issues",
    value: "5",
    change: "2 new today",
    icon: AlertTriangle,
    color: "text-orange-600",
    href: "/manager/issues",
  },
]

const quickActions = [
  { title: "Add Property", icon: Home, href: "/manager/properties/add", color: "bg-blue-600" },
  { title: "Add Tenant", icon: Users, href: "/manager/tenants/add", color: "bg-green-600" },
  { title: "Record Payment", icon: DollarSign, href: "/manager/payments/record", color: "bg-purple-600" },
  { title: "Generate Report", icon: FileText, href: "/manager/reports", color: "bg-orange-600" },
]

const recentActivities = [
  {
    id: 1,
    type: "payment",
    title: "Payment Received",
    description: "Sarah Okonkwo paid ₦208,333 for Modern 2-Bedroom Apartment",
    time: "2 hours ago",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "tenant",
    title: "New Tenant Added",
    description: "John Okoro moved into 3-Bedroom Duplex",
    time: "1 day ago",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Maintenance Request",
    description: "AC repair requested for Luxury Studio",
    time: "2 days ago",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    id: 4,
    type: "lease",
    title: "Lease Renewal",
    description: "Grace Adebayo's lease expires in 30 days",
    time: "3 days ago",
    icon: Calendar,
    color: "text-purple-600",
  },
]

const properties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦2,500,000",
    period: "/year",
    status: "Occupied",
    views: 156,
    inquiries: 8,
    image: "/placeholder.svg?height=80&width=80",
    lastUpdated: "2 days ago",
    occupancyStatus: "Available",
    featured: true,
  },
  {
    id: 2,
    title: "Luxury Self-Contained Studio",
    location: "Wuse 2, Abuja",
    price: "₦1,800,000",
    period: "/year",
    status: "Occupied",
    views: 89,
    inquiries: 5,
    image: "/placeholder.svg?height=80&width=80",
    lastUpdated: "1 week ago",
    occupancyStatus: "Available",
    featured: false,
  },
  {
    id: 3,
    title: "Spacious 3-Bedroom Duplex",
    location: "GRA, Port Harcourt",
    price: "₦3,200,000",
    period: "/year",
    status: "Vacant",
    views: 234,
    inquiries: 12,
    image: "/placeholder.svg?height=80&width=80",
    lastUpdated: "3 days ago",
    occupancyStatus: "Occupied",
    featured: false,
  },
]

const notifications = [
  {
    id: 1,
    type: "payment",
    title: "Payment Overdue",
    message: "Grace Adebayo's rent payment is 5 days overdue",
    time: "5 min ago",
    unread: true,
    priority: "high",
  },
  {
    id: 2,
    type: "lease",
    title: "Lease Expiring Soon",
    message: "Ahmed Hassan's lease expires in 30 days",
    time: "1 hour ago",
    unread: true,
    priority: "medium",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Maintenance Completed",
    message: "AC repair completed at Luxury Studio",
    time: "2 hours ago",
    unread: false,
    priority: "low",
  },
]

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [unreadNotifications] = useState(notifications.filter((n) => n.unread).length)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Property Management Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, Adebayo Properties</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Content */}
          <div className="px-4 py-6">
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Link key={index} href={stat.href}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-600">{stat.title}</p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <Link key={index} href={action.href}>
                        <Button variant="outline" className="w-full h-16 flex-col gap-2">
                          <action.icon className="h-5 w-5" />
                          <span className="text-xs">{action.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="properties" className="space-y-6 mt-0">
              {/* Properties Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">My Properties</h3>
                  <p className="text-sm text-gray-600">{properties.length} total properties</p>
                </div>
                <Link href="/manager/properties">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {/* Properties List */}
              <div className="space-y-4">
                {properties.slice(0, 3).map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="relative">
                          <Image
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          {property.featured && (
                            <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-xs px-1">Featured</Badge>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm truncate mb-1">{property.title}</h4>
                              <div className="flex items-center text-gray-600 mb-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="text-xs truncate">{property.location}</span>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(property.status)}`}>{property.status}</Badge>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="text-lg font-bold text-green-600">{property.price}</span>
                              <span className="text-gray-500 text-sm">{property.period}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link href={`/manager/properties/${property.id}`}>
                              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Link href={`/manager/properties/${property.id}/edit`}>
                              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-0">
              {/* Notifications Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">{unreadNotifications} unread notifications</p>
                </div>
                <Button variant="outline" size="sm">
                  Mark All Read
                </Button>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      notification.unread ? "border-blue-200 bg-blue-50" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{notification.time}</span>
                              {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{notification.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <TabsList className="grid w-full grid-cols-3 h-16 bg-transparent rounded-none">
              <TabsTrigger
                value="overview"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
              >
                <Home className="h-5 w-5" />
                <span className="text-xs">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
              >
                <Home className="h-5 w-5" />
                <span className="text-xs">Properties</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex-col gap-1 data-[state=active]:text-green-600 data-[state=active]:bg-green-50 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="text-xs">Notifications</span>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
