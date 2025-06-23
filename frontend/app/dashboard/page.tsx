import { Plus, Eye, MessageCircle, TrendingUp, Users, Home, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

const stats = [
  { title: "Total Properties", value: "24", change: "+2 this month", icon: Home },
  { title: "Total Views", value: "1,247", change: "+15% this week", icon: Eye },
  { title: "Messages", value: "18", change: "5 unread", icon: MessageCircle },
  { title: "Inquiries", value: "42", change: "+8 today", icon: Users },
]

const properties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦2,500,000",
    status: "Active",
    views: 156,
    inquiries: 8,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "Luxury Self-Contained Studio",
    location: "Wuse 2, Abuja",
    price: "₦1,800,000",
    status: "Active",
    views: 89,
    inquiries: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "Spacious 3-Bedroom Duplex",
    location: "GRA, Port Harcourt",
    price: "₦3,200,000",
    status: "Rented",
    views: 234,
    inquiries: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
]

const recentMessages = [
  {
    id: 1,
    tenant: "Kemi Adebayo",
    property: "Modern 2-Bedroom Apartment",
    message: "Is this property still available?",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    tenant: "John Okafor",
    property: "Luxury Studio",
    message: "Can I schedule a viewing?",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    tenant: "Sarah Ibrahim",
    property: "3-Bedroom Duplex",
    message: "Thank you for the quick response!",
    time: "1 day ago",
    unread: false,
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, Adebayo Properties</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-green-600" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.title}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12 bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Button variant="outline" className="h-12">
                <MessageCircle className="h-4 w-4 mr-2" />
                View Messages
              </Button>
              <Button variant="outline" className="h-12">
                <Eye className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="h-12">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="messages">Recent Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4 mt-4">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{property.title}</h4>
                        <Badge
                          variant={property.status === "Active" ? "default" : "secondary"}
                          className={property.status === "Active" ? "bg-green-600" : ""}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                      <p className="text-sm font-bold text-green-600 mb-3">{property.price}/year</p>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{property.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{property.inquiries} inquiries</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 mt-4">
            {recentMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {message.tenant
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{message.tenant}</h4>
                        {message.unread && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{message.property}</p>
                      <p className="text-sm text-gray-800 mb-2">{message.message}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom spacing */}
      <div className="h-6"></div>
    </div>
  )
}
