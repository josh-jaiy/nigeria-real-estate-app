"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Upload,
  Camera,
  Check,
  X,
  Home,
  Wifi,
  Zap,
  Droplets,
  Car,
  Shield,
  TreePine,
  Tv,
  Wind,
  Info,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "duplex", label: "Duplex" },
  { value: "self-contained", label: "Self-Contained" },
  { value: "bungalow", label: "Bungalow" },
  { value: "mini-flat", label: "Mini Flat" },
  { value: "mansion", label: "Mansion" },
  { value: "penthouse", label: "Penthouse" },
]

const locations = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "port-harcourt", label: "Port Harcourt" },
  { value: "ibadan", label: "Ibadan" },
  { value: "kano", label: "Kano" },
  { value: "enugu", label: "Enugu" },
  { value: "calabar", label: "Calabar" },
  { value: "kaduna", label: "Kaduna" },
]

const amenities = [
  { id: "furnished", label: "Furnished", icon: Home },
  { id: "parking", label: "Parking Space", icon: Car },
  { id: "security", label: "Security", icon: Shield },
  { id: "generator", label: "Generator", icon: Zap },
  { id: "water", label: "Water Supply", icon: Droplets },
  { id: "internet", label: "Internet", icon: Wifi },
  { id: "ac", label: "Air Conditioning", icon: Wind },
  { id: "tv", label: "Cable TV", icon: Tv },
  { id: "garden", label: "Garden", icon: TreePine },
]

const formSteps = [
  { id: 1, title: "Basic Details" },
  { id: 2, title: "Location" },
  { id: 3, title: "Photos" },
  { id: 4, title: "Features" },
  { id: 5, title: "Description" },
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ])

  const nextStep = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1)
      setProgress(((currentStep + 1) / formSteps.length) * 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setProgress(((currentStep - 1) / formSteps.length) * 100)
    } else {
      router.back()
    }
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenityId) ? current.filter((id) => id !== amenityId) : [...current, amenityId],
    )
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((current) => current.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Handle form submission
    alert("Property submitted successfully!")
    router.push("/manager/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Add New Property</h1>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Step {currentStep} of {formSteps.length}
            </span>
            <span className="text-gray-500">{formSteps[currentStep - 1].title}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6">
        {/* Step 1: Basic Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="property-name">Property Name</Label>
              <Input id="property-name" placeholder="e.g. Modern 2-Bedroom Apartment" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select>
                <SelectTrigger id="property-type" className="h-12">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-price">Price (₦)</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
                <Input id="property-price" type="number" placeholder="e.g. 2500000" className="h-12 pl-8" />
              </div>
              <p className="text-xs text-gray-500">Enter annual rent in Nigerian Naira</p>
            </div>

            <div className="space-y-2">
              <Label>Payment Period</Label>
              <RadioGroup defaultValue="yearly" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly">Yearly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <Label htmlFor="quarterly">Quarterly</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select>
                  <SelectTrigger id="bedrooms" className="h-12">
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
                  <SelectTrigger id="bathrooms" className="h-12">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-size">Property Size (sqm)</Label>
              <div className="relative">
                <Input id="property-size" type="number" placeholder="e.g. 85" className="h-12" />
                <div className="absolute right-3 top-3 text-gray-500">sqm</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select>
                <SelectTrigger id="city" className="h-12">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area/Neighborhood</Label>
              <Input id="area" placeholder="e.g. Victoria Island, Lekki" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Textarea id="address" placeholder="Enter complete property address" className="min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Map Location</Label>
                <Button variant="ghost" size="sm" className="h-8 text-green-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Use Current Location
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Tap to select location on map</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <p className="text-xs text-gray-500">Accurate location helps tenants find your property easily</p>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Property Photos</Label>
                <span className="text-xs text-gray-500">{uploadedPhotos.length}/10 photos</span>
              </div>

              <Card className="border-dashed border-2">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium mb-1">Upload Photos</p>
                  <p className="text-xs text-gray-500 text-center mb-4">
                    Add up to 10 high-quality photos of your property
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </CardContent>
              </Card>

              {uploadedPhotos.length > 0 && (
                <div className="space-y-3">
                  <Label>Uploaded Photos</Label>
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
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-1 left-1 bg-blue-600 text-xs px-1">Cover</Badge>
                        )}
                      </div>
                    ))}
                    {Array.from({ length: Math.min(10 - uploadedPhotos.length, 1) }).map((_, index) => (
                      <div
                        key={`placeholder-${index}`}
                        className="border-2 border-dashed border-gray-300 rounded-md h-24 flex items-center justify-center"
                      >
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Drag to reorder. First photo will be the cover image.</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL (Optional)</Label>
                <Input id="video-url" placeholder="e.g. YouTube or Vimeo link" className="h-12" />
                <p className="text-xs text-gray-500">Add a video tour link to showcase your property</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Features & Amenities */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Property Features</Label>
              <div className="grid grid-cols-1 gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => toggleAmenity(amenity.id)}
                    />
                    <div className="flex items-center gap-2">
                      <amenity.icon className="h-5 w-5 text-gray-600" />
                      <Label htmlFor={amenity.id} className="font-normal">
                        {amenity.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Property Condition</Label>
              <RadioGroup defaultValue="excellent">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" />
                  <Label htmlFor="excellent">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="fair" />
                  <Label htmlFor="fair">Fair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="needs-work" id="needs-work" />
                  <Label htmlFor="needs-work">Needs Work</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Furnishing Status</Label>
              <RadioGroup defaultValue="fully-furnished">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fully-furnished" id="fully-furnished" />
                  <Label htmlFor="fully-furnished">Fully Furnished</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="semi-furnished" id="semi-furnished" />
                  <Label htmlFor="semi-furnished">Semi-Furnished</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unfurnished" id="unfurnished" />
                  <Label htmlFor="unfurnished">Unfurnished</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year-built">Year Built</Label>
              <Input id="year-built" type="number" placeholder="e.g. 2020" className="h-12" />
            </div>
          </div>
        )}

        {/* Step 5: Description */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Property Description</Label>
              <Textarea id="description" placeholder="Describe your property in detail..." className="min-h-[200px]" />
              <p className="text-xs text-gray-500">
                Include key selling points, nearby amenities, and any special features
              </p>
            </div>

            <div className="space-y-2">
              <Label>Property Status</Label>
              <RadioGroup defaultValue="available">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="available" />
                  <Label htmlFor="available">Available Now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coming-soon" id="coming-soon" />
                  <Label htmlFor="coming-soon">Coming Soon</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="agent-notes">Agent Notes (Optional)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">These notes are only visible to you</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea id="agent-notes" placeholder="Private notes about this property..." className="min-h-[100px]" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I confirm that all information provided is accurate and I have the right to list this property
              </Label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 space-y-4">
          {currentStep === formSteps.length ? (
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-base" onClick={handleSubmit}>
              <Check className="h-5 w-5 mr-2" />
              Submit Property
            </Button>
          ) : (
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-base" onClick={nextStep}>
              Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          )}

          {currentStep > 1 && (
            <Button variant="outline" className="w-full h-12" onClick={prevStep}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Badge component for the "Cover" label on the first photo
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-2 py-1 text-white text-xs rounded-sm ${className}`}>{children}</div>
}
