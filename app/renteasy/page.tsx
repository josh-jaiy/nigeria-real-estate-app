"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Calculator,
  Heart,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"

const rentEasyProperties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    fullPrice: 2500000, // ₦2.5M annually
    monthlyRent: 208333, // ₦208,333/month
    lowestMonthlyPlan: 75000, // ₦75,000/month with RentE@sy
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Parking", "Security", "Generator"],
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.8,
    views: 156,
    isFavorite: false,
    planOptions: [
      { duration: 6, monthlyAmount: 125000, totalAmount: 750000, interest: 0 },
      { duration: 12, monthlyAmount: 75000, totalAmount: 900000, interest: 200000 },
      { duration: 24, monthlyAmount: 45000, totalAmount: 1080000, interest: 380000 },
    ],
  },
  {
    id: 2,
    title: "Luxury Self-Contained Studio",
    location: "Wuse 2, Abuja",
    fullPrice: 1800000,
    monthlyRent: 150000,
    lowestMonthlyPlan: 55000,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Generator", "Water", "Internet"],
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.6,
    views: 89,
    isFavorite: true,
    planOptions: [
      { duration: 6, monthlyAmount: 95000, totalAmount: 570000, interest: 0 },
      { duration: 12, monthlyAmount: 55000, totalAmount: 660000, interest: 110000 },
      { duration: 24, monthlyAmount: 35000, totalAmount: 840000, interest: 290000 },
    ],
  },
  {
    id: 3,
    title: "Spacious 3-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    fullPrice: 4200000,
    monthlyRent: 350000,
    lowestMonthlyPlan: 125000,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Swimming Pool", "Garden", "Parking", "Security"],
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.9,
    views: 234,
    isFavorite: false,
    planOptions: [
      { duration: 6, monthlyAmount: 210000, totalAmount: 1260000, interest: 0 },
      { duration: 12, monthlyAmount: 125000, totalAmount: 1500000, interest: 240000 },
      { duration: 24, monthlyAmount: 75000, totalAmount: 1800000, interest: 540000 },
    ],
  },
  {
    id: 4,
    title: "Affordable 1-Bedroom Flat",
    location: "Ikeja, Lagos",
    fullPrice: 1200000,
    monthlyRent: 100000,
    lowestMonthlyPlan: 38000,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Furnished", "Security", "Water", "Parking"],
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.4,
    views: 67,
    isFavorite: false,
    planOptions: [
      { duration: 6, monthlyAmount: 63000, totalAmount: 378000, interest: 0 },
      { duration: 12, monthlyAmount: 38000, totalAmount: 456000, interest: 78000 },
      { duration: 24, monthlyAmount: 25000, totalAmount: 600000, interest: 222000 },
    ],
  },
]

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  }
  return `₦${amount.toLocaleString()}`
}

const calculateSavings = (fullPrice: number, planAmount: number) => {
  const savings = fullPrice - planAmount
  const percentage = (savings / fullPrice) * 100
  return { amount: savings, percentage }
}

export default function RentEasyPage() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applicationStep, setApplicationStep] = useState(1)
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    bvn: "",
    monthlyIncome: "",
    employer: "",
    preferredDuration: "",
    phoneNumber: "",
    email: "",
    address: "",
  })

  const handleApplyNow = (property: any, plan: any) => {
    setSelectedProperty(property)
    setSelectedPlan(plan)
    setShowApplicationModal(true)
    setApplicationStep(1)
  }

  const handleApplicationSubmit = () => {
    setApplicationStep(2)
    // Simulate processing
    setTimeout(() => {
      setApplicationStep(3)
    }, 2000)
  }

  const resetApplication = () => {
    setShowApplicationModal(false)
    setApplicationStep(1)
    setApplicationData({
      fullName: "",
      bvn: "",
      monthlyIncome: "",
      employer: "",
      preferredDuration: "",
      phoneNumber: "",
      email: "",
      address: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">RentE@sy</h1>
                <p className="text-xs text-gray-600">Flexible Payment Plans</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search RentE@sy properties..." className="pl-10 h-10" />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="px-4 py-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-sm font-medium">Trusted by 10,000+ Nigerians</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Own Your Dream Home Today</h2>
            <p className="text-green-100 text-sm leading-relaxed">
              Flexible payment plans to help you rent or buy easier. Start with as low as ₦25,000/month and build your
              way to homeownership.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-xl font-bold">0%</div>
              <div className="text-xs text-green-100">Interest on 6 months</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">24hrs</div>
              <div className="text-xs text-green-100">Quick approval</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">100%</div>
              <div className="text-xs text-green-100">Secure payments</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-4 py-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How RentE@sy Works</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs font-medium text-gray-900">Choose Property</p>
            <p className="text-xs text-gray-600">Browse eligible properties</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-gray-900">Select Plan</p>
            <p className="text-xs text-gray-600">Pick payment duration</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-gray-900">Move In</p>
            <p className="text-xs text-gray-600">Get approved & move</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Filter className="h-4 w-4 mr-2" />
            All Properties
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Under ₦50k/month
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Lagos
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            Abuja
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            0% Interest
          </Button>
        </div>
      </div>

      {/* Properties List */}
      <div className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Available Properties</h3>
          <Badge className="bg-green-100 text-green-700">{rentEasyProperties.length} properties</Badge>
        </div>

        {rentEasyProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />

              {/* RentE@sy Badge */}
              <div className="absolute top-2 left-2">
                <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs">
                  <CreditCard className="h-3 w-3 mr-1" />
                  RentE@sy Eligible
                </Badge>
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                  property.isFavorite ? "text-red-500" : "text-gray-600"
                }`}
              >
                <Heart className={`h-4 w-4 ${property.isFavorite ? "fill-current" : ""}`} />
              </Button>

              {/* Savings Badge */}
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-orange-500 text-white text-xs">
                  Save up to {calculateSavings(property.monthlyRent, property.lowestMonthlyPlan).percentage.toFixed(0)}%
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Title and Location */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{property.title}</h4>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{property.location}</span>
                  </div>
                </div>

                {/* Rating and Views */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="h-3 w-3" />
                    <span className="text-xs">{property.views} views</span>
                  </div>
                </div>

                {/* Pricing Comparison */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Regular Monthly Rent:</span>
                      <span className="text-sm line-through text-gray-500">{formatCurrency(property.monthlyRent)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">RentE@sy from:</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(property.lowestMonthlyPlan)}/month
                      </span>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {property.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {property.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.features.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Action Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-10">
                      <Calculator className="h-4 w-4 mr-2" />
                      View Payment Plans
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        RentE@sy Payment Plans
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Property Summary */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <p className="text-sm text-gray-500">
                          Regular rent: {formatCurrency(property.monthlyRent)}/month
                        </p>
                      </div>

                      {/* Payment Plans */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900">Choose Your Payment Plan:</h5>
                        {property.planOptions.map((plan, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-green-100 p-1 rounded">
                                  <Calendar className="h-4 w-4 text-green-600" />
                                </div>
                                <span className="font-semibold">{plan.duration} Months</span>
                                {plan.interest === 0 && (
                                  <Badge className="bg-orange-100 text-orange-700 text-xs">0% Interest</Badge>
                                )}
                              </div>
                              <span className="text-lg font-bold text-green-600">
                                {formatCurrency(plan.monthlyAmount)}/month
                              </span>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Total Amount:</span>
                                <span className="font-medium">{formatCurrency(plan.totalAmount)}</span>
                              </div>
                              {plan.interest > 0 && (
                                <div className="flex justify-between">
                                  <span>Interest:</span>
                                  <span className="font-medium">{formatCurrency(plan.interest)}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span>You Save:</span>
                                <span className="font-medium text-green-600">
                                  {formatCurrency(
                                    calculateSavings(property.monthlyRent * plan.duration, plan.totalAmount).amount,
                                  )}
                                </span>
                              </div>
                            </div>
                            <Button
                              className="w-full mt-3 bg-green-600 hover:bg-green-700"
                              onClick={() => handleApplyNow(property, plan)}
                            >
                              Apply for This Plan
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Trust Indicators */}
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Secure & Trusted</span>
                        </div>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Bank-level security for all transactions</li>
                          <li>• Regulated by CBN and FCCPC</li>
                          <li>• 24/7 customer support</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              RentE@sy Application
            </DialogTitle>
          </DialogHeader>

          {applicationStep === 1 && (
            <div className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Application Progress</span>
                  <span>Step 1 of 2</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>

              {/* Selected Plan Summary */}
              {selectedProperty && selectedPlan && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">{selectedProperty.title}</h4>
                  <p className="text-sm text-green-700">
                    {formatCurrency(selectedPlan.monthlyAmount)}/month for {selectedPlan.duration} months
                  </p>
                </div>
              )}

              {/* Application Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={applicationData.fullName}
                    onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="bvn">BVN (Bank Verification Number) *</Label>
                  <Input
                    id="bvn"
                    placeholder="Enter your 11-digit BVN"
                    maxLength={11}
                    value={applicationData.bvn}
                    onChange={(e) => setApplicationData({ ...applicationData, bvn: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="monthlyIncome">Monthly Income (₦) *</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="Enter your monthly income"
                    value={applicationData.monthlyIncome}
                    onChange={(e) => setApplicationData({ ...applicationData, monthlyIncome: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="employer">Employer/Business *</Label>
                  <Input
                    id="employer"
                    placeholder="Enter your employer or business name"
                    value={applicationData.employer}
                    onChange={(e) => setApplicationData({ ...applicationData, employer: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+234 xxx xxx xxxx"
                    value={applicationData.phoneNumber}
                    onChange={(e) => setApplicationData({ ...applicationData, phoneNumber: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Current Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your current residential address"
                    value={applicationData.address}
                    onChange={(e) => setApplicationData({ ...applicationData, address: e.target.value })}
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-xs text-amber-700">
                    <strong>Note:</strong> Your information is secure and will only be used for verification purposes.
                    We comply with all Nigerian data protection regulations.
                  </p>
                </div>

                <Button
                  onClick={handleApplicationSubmit}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={
                    !applicationData.fullName ||
                    !applicationData.bvn ||
                    !applicationData.monthlyIncome ||
                    !applicationData.employer
                  }
                >
                  Submit Application
                </Button>
              </div>
            </div>
          )}

          {applicationStep === 2 && (
            <div className="space-y-4 text-center py-8">
              <div className="animate-spin mx-auto">
                <Clock className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Processing Your Application</h3>
              <p className="text-sm text-gray-600">
                We're verifying your information and checking your eligibility. This usually takes a few moments.
              </p>
              <Progress value={75} className="h-2" />
            </div>
          )}

          {applicationStep === 3 && (
            <div className="space-y-4 text-center py-8">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-900">Application Submitted!</h3>
              <p className="text-sm text-gray-600">
                Your RentE@sy application has been submitted successfully. You'll receive an SMS and email with the
                approval status within 24 hours.
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Reference ID:</strong> RE{Date.now().toString().slice(-6)}
                </p>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={resetApplication}>
                  Apply for Another Property
                </Button>
                <Link href="/renteasy/my-plans">
                  <Button variant="outline" className="w-full" onClick={() => setShowApplicationModal(false)}>
                    View My Applications
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom CTA */}
      <div className="px-4 py-6">
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <h3 className="font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-sm text-green-100 mb-4">
              Join thousands of Nigerians who have found their dream homes with RentE@sy
            </p>
            <Link href="/renteasy/my-plans">
              <Button className="bg-white text-green-600 hover:bg-gray-100">View My Plans</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
