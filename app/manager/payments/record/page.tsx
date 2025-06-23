"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, DollarSign, User, Home, FileText, CreditCard, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"
import { validatePayment, type PaymentValidationResult } from "@/lib/payment-validation"
import { generatePaymentReceipt } from "@/lib/receipt-generator"

// Mock data for tenants and properties
const mockTenants = [
  {
    id: "tenant_1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 801 234 5678",
    property: {
      id: "prop_1",
      title: "2-Bedroom Apartment",
      location: "Victoria Island, Lagos",
      monthlyRent: 2500000,
    },
    outstandingBalance: 0,
    lastPayment: "2024-04-01",
    leaseStartDate: "2024-01-01",
    leaseEndDate: "2024-12-31",
  },
  {
    id: "tenant_2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+234 802 345 6789",
    property: {
      id: "prop_2",
      title: "3-Bedroom House",
      location: "Lekki Phase 1, Lagos",
      monthlyRent: 4500000,
    },
    outstandingBalance: 2250000,
    lastPayment: "2024-03-01",
    leaseStartDate: "2024-01-01",
    leaseEndDate: "2024-12-31",
  },
  {
    id: "tenant_3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+234 803 456 7890",
    property: {
      id: "prop_3",
      title: "Studio Apartment",
      location: "Ikeja, Lagos",
      monthlyRent: 1800000,
    },
    outstandingBalance: 0,
    lastPayment: "2024-05-01",
    leaseStartDate: "2024-01-01",
    leaseEndDate: "2024-12-31",
  },
]

const paymentMethods = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "check", label: "Check" },
  { value: "online_payment", label: "Online Payment" },
  { value: "mobile_money", label: "Mobile Money" },
]

export default function RecordPaymentPage() {
  const router = useRouter()
  const [selectedTenant, setSelectedTenant] = useState<(typeof mockTenants)[0] | null>(null)
  const [formData, setFormData] = useState({
    tenantId: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "",
    reference: "",
    description: "",
    lateFee: "",
    proofOfPayment: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationResult, setValidationResult] = useState<PaymentValidationResult | null>(null)
  const [lastRecordedPayment, setLastRecordedPayment] = useState<any>(null)

  const handleTenantSelect = (tenantId: string) => {
    const tenant = mockTenants.find((t) => t.id === tenantId)
    if (tenant) {
      setSelectedTenant(tenant)
      setFormData((prev) => ({
        ...prev,
        tenantId,
        amount: tenant.property.monthlyRent.toString(),
        description: `Rent payment for ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
      }))
      setValidationResult(null)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Validate on change for real-time feedback
    if (selectedTenant && (field === "amount" || field === "paymentDate" || field === "reference")) {
      const updatedData = { ...formData, [field]: value }
      const validation = validatePayment({
        ...updatedData,
        tenant: selectedTenant,
      })
      setValidationResult(validation)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPG, PNG, or PDF file.",
          variant: "destructive",
        })
        return
      }

      setFormData((prev) => ({ ...prev, proofOfPayment: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTenant || !formData.amount || !formData.paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Final validation
    const validation = validatePayment({
      ...formData,
      tenant: selectedTenant,
    })

    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.errors[0],
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create payment record
      const paymentRecord = {
        id: `payment_${Date.now()}`,
        tenant: selectedTenant,
        amount: Number.parseInt(formData.amount),
        lateFee: Number.parseInt(formData.lateFee || "0"),
        totalAmount: Number.parseInt(formData.amount) + Number.parseInt(formData.lateFee || "0"),
        paymentDate: formData.paymentDate,
        paymentMethod: formData.paymentMethod,
        reference: formData.reference,
        description: formData.description,
        receiptNumber: `RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        recordedBy: "Manager", // In real app, get from auth
        recordedAt: new Date().toISOString(),
      }

      setLastRecordedPayment(paymentRecord)

      toast({
        title: "Payment Recorded",
        description: `Payment of ₦${paymentRecord.totalAmount.toLocaleString()} has been recorded successfully.`,
      })

      // Reset form
      setFormData({
        tenantId: "",
        amount: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "",
        reference: "",
        description: "",
        lateFee: "",
        proofOfPayment: null,
      })
      setSelectedTenant(null)
      setValidationResult(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateReceipt = async () => {
    if (!lastRecordedPayment) return

    try {
      const receiptBlob = await generatePaymentReceipt(lastRecordedPayment)
      const url = URL.createObjectURL(receiptBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `receipt-${lastRecordedPayment.receiptNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Receipt Generated",
        description: "Payment receipt has been downloaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate receipt. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePreviewReceipt = async () => {
    if (!lastRecordedPayment) return

    try {
      const receiptBlob = await generatePaymentReceipt(lastRecordedPayment)
      const url = URL.createObjectURL(receiptBlob)
      window.open(url, "_blank")

      toast({
        title: "Receipt Preview",
        description: "Receipt opened in new tab.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to preview receipt. Please try again.",
        variant: "destructive",
      })
    }
  }

  const totalAmount = Number.parseInt(formData.amount || "0") + Number.parseInt(formData.lateFee || "0")

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Record Payment</h1>
            <p className="text-gray-600">Record a new rent payment from tenant</p>
          </div>
        </div>

        {/* Success Message with Receipt Actions */}
        {lastRecordedPayment && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">
                    Payment recorded successfully! Receipt #{lastRecordedPayment.receiptNumber}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    ₦{lastRecordedPayment.totalAmount.toLocaleString()} from {lastRecordedPayment.tenant.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handlePreviewReceipt}>
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={handleGenerateReceipt}>
                    <Download className="h-4 w-4 mr-1" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tenant Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Select Tenant
                  </CardTitle>
                  <CardDescription>Choose the tenant making the payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={formData.tenantId} onValueChange={handleTenantSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{tenant.name}</div>
                              <div className="text-sm text-gray-500">{tenant.property.title}</div>
                            </div>
                            {tenant.outstandingBalance > 0 && (
                              <Badge variant="destructive" className="ml-2">
                                Overdue
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedTenant && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900">{selectedTenant.property.title}</h4>
                          <p className="text-sm text-blue-700">{selectedTenant.property.location}</p>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-blue-600">Monthly Rent:</span>
                              <span className="ml-1 font-medium">
                                ₦{selectedTenant.property.monthlyRent.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-600">Outstanding:</span>
                              <span
                                className={`ml-1 font-medium ${selectedTenant.outstandingBalance > 0 ? "text-red-600" : "text-green-600"}`}
                              >
                                ₦{selectedTenant.outstandingBalance.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Validation Alerts */}
              {validationResult && !validationResult.isValid && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {validationResult.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {validationResult && validationResult.warnings.length > 0 && (
                <Alert>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {validationResult.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Payment Amount *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => handleInputChange("amount", e.target.value)}
                        required
                        className={
                          validationResult &&
                          !validationResult.isValid &&
                          validationResult.errors.some((e) => e.includes("amount"))
                            ? "border-red-500"
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentDate">Payment Date *</Label>
                      <Input
                        id="paymentDate"
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                        required
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="paymentMethod">Payment Method *</Label>
                      <Select
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lateFee">Late Fee (if any)</Label>
                      <Input
                        id="lateFee"
                        type="number"
                        placeholder="0"
                        value={formData.lateFee}
                        onChange={(e) => handleInputChange("lateFee", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reference">Reference Number</Label>
                    <Input
                      id="reference"
                      placeholder="Transaction reference or receipt number"
                      value={formData.reference}
                      onChange={(e) => handleInputChange("reference", e.target.value)}
                      className={
                        validationResult &&
                        !validationResult.isValid &&
                        validationResult.errors.some((e) => e.includes("reference"))
                          ? "border-red-500"
                          : ""
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Payment description or notes"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Proof of Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Proof of Payment
                  </CardTitle>
                  <CardDescription>Upload receipt or transaction proof (optional)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</div>
                    <div className="text-xs text-gray-500 mb-4">PNG, JPG, PDF up to 10MB</div>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="proof-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("proof-upload")?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.proofOfPayment && (
                      <div className="mt-2 text-sm text-green-600">File selected: {formData.proofOfPayment.name}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTenant ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tenant:</span>
                          <span className="font-medium">{selectedTenant.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Property:</span>
                          <span className="font-medium text-right">{selectedTenant.property.title}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Payment Amount:</span>
                          <span className="font-medium">
                            ₦{Number.parseInt(formData.amount || "0").toLocaleString()}
                          </span>
                        </div>
                        {formData.lateFee && Number.parseInt(formData.lateFee) > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Late Fee:</span>
                            <span className="font-medium">₦{Number.parseInt(formData.lateFee).toLocaleString()}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total Amount:</span>
                          <span className="text-lg">₦{totalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {selectedTenant.outstandingBalance > 0 && (
                        <>
                          <Separator />
                          <div className="p-3 bg-red-50 rounded-lg">
                            <div className="text-sm text-red-800">
                              <div className="font-medium">Outstanding Balance</div>
                              <div className="text-lg font-bold">
                                ₦{selectedTenant.outstandingBalance.toLocaleString()}
                              </div>
                              <div className="text-xs mt-1">
                                This payment will{" "}
                                {totalAmount >= selectedTenant.outstandingBalance ? "clear" : "reduce"} the outstanding
                                balance
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {validationResult && validationResult.isValid && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-800">
                            <div className="font-medium">✓ Payment Validated</div>
                            <div className="text-xs mt-1">All checks passed. Ready to record payment.</div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Select a tenant to see payment summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    !selectedTenant ||
                    !formData.amount ||
                    !formData.paymentMethod ||
                    isSubmitting ||
                    (validationResult && !validationResult.isValid)
                  }
                >
                  {isSubmitting ? "Recording Payment..." : "Record Payment"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
