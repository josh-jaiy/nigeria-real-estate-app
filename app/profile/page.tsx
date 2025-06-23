import { ArrowLeft, Settings, Bell, HelpCircle, LogOut, Edit, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

const userStats = [
  { label: "Properties Viewed", value: "47" },
  { label: "Saved Properties", value: "12" },
  { label: "Messages Sent", value: "23" },
  { label: "Profile Views", value: "156" },
]

const menuItems = [
  { icon: Edit, label: "Edit Profile", href: "/profile/edit" },
  { icon: Bell, label: "Notifications", href: "/profile/notifications" },
  { icon: Settings, label: "Account Settings", href: "/profile/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/profile/help" },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-white px-4 py-6 border-b">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback className="text-lg">KA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Kemi Adebayo</h2>
            <p className="text-gray-600 mb-2">Property Seeker</p>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Verified User
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>kemi.adebayo@email.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+234 801 234 5678</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {userStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Account</h3>

        {menuItems.map((item, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Notification Settings */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Push Notifications</div>
                  <div className="text-sm text-gray-600">Get notified about new properties</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <h3 className="text-lg font-semibold text-gray-900 pt-4">Preferences</h3>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Preferred Location</span>
              <span className="text-sm font-medium">Lagos, Abuja</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Budget Range</span>
              <span className="text-sm font-medium">₦1M - ₦3M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Property Type</span>
              <span className="text-sm font-medium">2-3 Bedroom</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Update Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-600">Sign Out</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Info */}
      <div className="px-4 py-6 text-center">
        <p className="text-sm text-gray-500">NaijaHomes v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">Made with ❤️ for Nigeria</p>
      </div>

      {/* Bottom spacing */}
      <div className="h-6"></div>
    </div>
  )
}
