"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Upload, X, MapPin, User, Home, FileText, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"

const steps = [
  { id: 1, title: "Property Details", icon: Home },
  { id: 2, title: "Owner Information", icon: User },
  { id: 3, title: "Photos & Documents", icon: FileText },
  { id: 4, title: "Additional Info", icon: MapPin },
]

const amenities = [
  "Parking Space",
  "Security",
  "Generator",
  "Water Supply",
  "Internet",
  "Air Conditioning",
  "Garden",
  "Swimming Pool",
  "Gym",
  "Elevator",
  "Balcony",
  "Furnished",
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([])

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleSubmit = () => {
    // Handle form submission
    alert("Property added successfully!")
    router.push("/manager/properties")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/manager/properties">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Add New Property</h1>
                <p className="text-sm text-gray-600">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-3 bg-white border-b">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {steps.map((step) => (
            <span key={step.id} className={currentStep >= step.id ? "text-green-600 font-medium" : ""}>
              {step.title}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Step 1: Property Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="property-title">Property Title</Label>
                  <Input id="property-title" placeholder="e.g. Modern 3-Bedroom Apartment" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="bungalow">Bungalow</SelectItem>
                        <SelectItem value="mansion">Mansion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year-built">Year Built</Label>
                    <Input id="year-built" type="number" placeholder="e.g. 2020" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Size (sqm)</Label>
                    <Input id="size" type="number" placeholder="e.g. 120" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea id="address" placeholder="Enter complete property address" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                        <SelectItem value="ibadan">Ibadan</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="fct">FCT Abuja</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem>
                        <SelectItem value="oyo">Oyo</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rent">Annual Rent (₦)</Label>
                  <Input id="rent" type="number" placeholder="e.g. 2500000" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Owner Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Property Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-first-name">First Name</Label>
                    <Input id="owner-first-name" placeholder="Enter first name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="owner-last-name">Last Name</Label>
                    <Input id="owner-last-name" placeholder="Enter last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email Address</Label>
                  <Input id="owner-email" type="email" placeholder="owner@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-phone">Phone Number</Label>
                  <Input id="owner-phone" placeholder="+234 xxx xxx xxxx" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-address">Owner's Address</Label>
                  <Textarea id="owner-address" placeholder="Enter owner's residential address" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Emergency Contact Name</Label>
                  <Input id="emergency-contact" placeholder="Enter emergency contact name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                  <Input id="emergency-phone" placeholder="+234 xxx xxx xxxx" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship to Owner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="business-partner">Business Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Photos & Documents */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Property Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">Upload Property Photos</p>
                  <p className="text-xs text-gray-500 mb-4">Add up to 10 high-quality photos</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Property photo ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Property Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">Upload Documents</p>
                  <p className="text-xs text-gray-500 mb-4">Property title, permits, certificates, etc.</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Document Types (Check all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Property Title/Deed",
                      "Building Permit",
                      "Certificate of Occupancy",
                      "Survey Plan",
                      "Tax Clearance",
                      "Insurance Policy",
                      "Utility Bills",
                      "Other Documents",
                    ].map((doc) => (
                      <div key={doc} className="flex items-center space-x-2">
                        <Checkbox id={doc} />
                        <Label htmlFor={doc} className="text-sm">
                          {doc}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Additional Information */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Current Status</Label>
                  <RadioGroup defaultValue="vacant">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vacant" id="vacant" />
                      <Label htmlFor="vacant">Vacant - Ready for new tenant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occupied" id="occupied" />
                      <Label htmlFor="occupied">Occupied - Has existing tenant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maintenance" id="maintenance" />
                      <Label htmlFor="maintenance">Under Maintenance/Renovation</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="property-notes">Property Notes</Label>
                  <Textarea
                    id="property-notes"
                    placeholder="Add any additional information about the property, special instructions, or important details..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="management-notes">Management Notes (Private)</Label>
                  <Textarea
                    id="management-notes"
                    placeholder="Private notes for property management purposes only..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex-1 bg-green-600 hover:bg-green-700">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
              Add Property
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
