"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, Check, Star, Users, Globe, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function BoostPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const propertyId = params.id
  const [selectedPlan, setSelectedPlan] = useState("standard")

  // This would typically come from an API call using the propertyId
  const propertyDetails = {
    title: "Modern 2-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦2,500,000",
    period: "/year",
    views: 156,
    inquiries: 8,
  }

  const boostPlans = [
    {
      id: "basic",
      name: "Basic Boost",
      price: "₦5,000",
      duration: "7 days",
      features: ["Top search results for 3 days", "Featured tag for 7 days", "Social media promotion (1 post)"],
      recommended: false,
    },
    {
      id: "standard",
      name: "Standard Boost",
      price: "₦12,000",
      duration: "14 days",
      features: [
        "Top search results for 7 days",
        "Featured tag for 14 days",
        "Social media promotion (3 posts)",
        "Email newsletter feature",
      ],
      recommended: true,
    },
    {
      id: "premium",
      name: "Premium Boost",
      price: "₦25,000",
      duration: "30 days",
      features: [
        "Top search results for 14 days",
        "Featured tag for 30 days",
        "Social media promotion (5 posts)",
        "Email newsletter feature",
        "SMS alerts to interested users",
        "Featured in 'Premium Properties' section",
      ],
      recommended: false,
    },
  ]

  const handleBoost = () => {
    // Here you would implement the actual boost functionality
    alert(`Property ${propertyId} boosted with ${selectedPlan} plan!`)
    router.push("/manager/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900">Boost Property</h1>
              <p className="text-sm text-gray-600">Increase visibility and attract more tenants</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Property Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>You are about to boost the following property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{propertyDetails.title}</h3>
                <p className="text-gray-500">{propertyDetails.location}</p>
                <div className="mt-2">
                  <span className="text-lg font-bold text-green-600">{propertyDetails.price}</span>
                  <span className="text-gray-500">{propertyDetails.period}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{propertyDetails.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{propertyDetails.inquiries} inquiries</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Boost Plans */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Select a Boost Plan</h2>
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {boostPlans.map((plan) => (
              <div key={plan.id} className="relative">
                <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                <Label
                  htmlFor={plan.id}
                  className={`flex flex-col h-full border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {plan.recommended && <Badge className="absolute -top-2 -right-2 bg-green-600">Recommended</Badge>}
                  <div className="mb-2">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-gray-500 text-sm">{plan.duration}</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-green-600">{plan.price}</span>
                  </div>
                  <ul className="space-y-2 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Boost Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Boost Options</CardTitle>
            <CardDescription>Customize how your property is promoted</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="targeting">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="targeting">Targeting</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              <TabsContent value="targeting" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Target Audience</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Families
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Professionals
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Students
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Expats
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Target Locations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Lagos
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Abuja
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Port Harcourt
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      All Nigeria
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="schedule" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Start Date</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Today
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Tomorrow
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Next Week
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Custom Date
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appearance" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Highlight Color</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="h-8 bg-green-500 rounded-md cursor-pointer border-2 border-green-600"></div>
                    <div className="h-8 bg-blue-500 rounded-md cursor-pointer"></div>
                    <div className="h-8 bg-purple-500 rounded-md cursor-pointer"></div>
                    <div className="h-8 bg-yellow-500 rounded-md cursor-pointer"></div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Summary and Action */}
        <Card>
          <CardHeader>
            <CardTitle>Boost Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Selected Plan</span>
                <span className="font-medium">{boostPlans.find((p) => p.id === selectedPlan)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium">{boostPlans.find((p) => p.id === selectedPlan)?.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-bold text-green-600">{boostPlans.find((p) => p.id === selectedPlan)?.price}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700" onClick={handleBoost}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Boost Property Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
