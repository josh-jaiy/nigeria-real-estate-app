"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Phone,
  MessageCircle,
  MapPin,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const myPlans = [
  {
    id: 1,
    propertyTitle: "Modern 2-Bedroom Apartment",
    propertyLocation: "Victoria Island, Lagos",
    propertyImage: "/placeholder.svg?height=80&width=80",
    status: "Active",
    planDuration: 12,
    monthlyAmount: 75000,
    totalAmount: 900000,
    paidAmount: 225000,
    remainingAmount: 675000,
    nextPaymentDate: "2024-04-15",
    nextPaymentAmount: 75000,
    paymentsCompleted: 3,
    totalPayments: 12,
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    referenceId: "RE123456",
    paymentHistory: [
      { date: "2024-03-15", amount: 75000, status: "Paid", method: "Bank Transfer" },
      { date: "2024-02-15", amount: 75000, status: "Paid", method: "Card Payment" },
      { date: "2024-01-15", amount: 75000, status: "Paid", method: "Bank Transfer" },
    ],
  },
  {
    id: 2,
    propertyTitle: "Luxury Self-Contained Studio",
    propertyLocation: "Wuse 2, Abuja",
    propertyImage: "/placeholder.svg?height=80&width=80",
    status: "Pending Approval",
    planDuration: 6,
    monthlyAmount: 95000,
    totalAmount: 570000,
    paidAmount: 0,
    remainingAmount: 570000,
    nextPaymentDate: null,
    nextPaymentAmount: 95000,
    paymentsCompleted: 0,
    totalPayments: 6,
    startDate: null,
    endDate: null,
    referenceId: "RE789012",
    paymentHistory: [],
  },
  {
    id: 3,
    propertyTitle: "Affordable 1-Bedroom Flat",
    propertyLocation: "Ikeja, Lagos",
    propertyImage: "/placeholder.svg?height=80&width=80",
    status: "Completed",
    planDuration: 6,
    monthlyAmount: 63000,
    totalAmount: 378000,
    paidAmount: 378000,
    remainingAmount: 0,
    nextPaymentDate: null,
    nextPaymentAmount: 0,
    paymentsCompleted: 6,
    totalPayments: 6,
    startDate: "2023-08-01",
    endDate: "2024-01-31",
    referenceId: "RE345678",
    paymentHistory: [
      { date: "2024-01-01", amount: 63000, status: "Paid", method: "Bank Transfer" },
      { date: "2023-12-01", amount: 63000, status: "Paid", method: "Card Payment" },
      { date: "2023-11-01", amount: 63000, status: "Paid", method: "Bank Transfer" },
      { date: "2023-10-01", amount: 63000, status: "Paid", method: "Card Payment" },
      { date: "2023-09-01", amount: 63000, status: "Paid", method: "Bank Transfer" },
      { date: "2023-08-01", amount: 63000, status: "Paid", method: "Bank Transfer" },
    ],
  },
]

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700"
    case "Pending Approval":
      return "bg-yellow-100 text-yellow-700"
    case "Completed":
      return "bg-blue-100 text-blue-700"
    case "Overdue":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700"
    case "Pending":
      return "bg-yellow-100 text-yellow-700"
    case "Failed":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function MyPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const activePlans = myPlans.filter((plan) => plan.status === "Active")
  const pendingPlans = myPlans.filter((plan) => plan.status === "Pending Approval")
  const completedPlans = myPlans.filter((plan) => plan.status === "Completed")

  const handleMakePayment = (plan: any) => {
    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  const processPayment = () => {
    alert(`Payment of ${formatCurrency(selectedPlan.nextPaymentAmount)} processed successfully!`)
    setShowPaymentModal(false)
    setPaymentMethod("")
    setCardNumber("")
    setExpiryDate("")
    setCvv("")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/renteasy">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">My RentE@sy Plans</h1>
                <p className="text-xs text-gray-600">Manage your payment plans</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-4 py-6 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{activePlans.length}</div>
              <div className="text-xs text-white/80">Active Plans</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {formatCurrency(activePlans.reduce((total, plan) => total + plan.nextPaymentAmount, 0))}
              </div>
              <div className="text-xs text-white/80">Next Payment Due</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activePlans.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingPlans.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedPlans.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-4">
            {activePlans.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Plans</h3>
                  <p className="text-gray-600 mb-4">You don't have any active payment plans yet.</p>
                  <Link href="/renteasy">
                    <Button className="bg-green-600 hover:bg-green-700">Browse Properties</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              activePlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Property Info */}
                      <div className="flex gap-3">
                        <Image
                          src={plan.propertyImage || "/placeholder.svg"}
                          alt={plan.propertyTitle}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{plan.propertyTitle}</h4>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="text-sm">{plan.propertyLocation}</span>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(plan.status)}`}>{plan.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span>
                              Plan: {formatCurrency(plan.monthlyAmount)}/month × {plan.planDuration} months
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Payment Progress</span>
                          <span className="font-medium">
                            {plan.paymentsCompleted} of {plan.totalPayments} payments
                          </span>
                        </div>
                        <Progress value={(plan.paymentsCompleted / plan.totalPayments) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Paid: {formatCurrency(plan.paidAmount)}</span>
                          <span>Remaining: {formatCurrency(plan.remainingAmount)}</span>
                        </div>
                      </div>

                      {/* Next Payment */}
                      {plan.nextPaymentDate && (
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-orange-600" />
                              <div>
                                <p className="text-sm font-medium text-orange-900">Next Payment Due</p>
                                <p className="text-xs text-orange-700">{formatDate(plan.nextPaymentDate)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-orange-900">
                                {formatCurrency(plan.nextPaymentAmount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleMakePayment(plan)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Make Payment
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Plan Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {/* Property Info */}
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900">{plan.propertyTitle}</h4>
                                <p className="text-sm text-gray-600">{plan.propertyLocation}</p>
                                <p className="text-xs text-gray-500">Ref: {plan.referenceId}</p>
                              </div>

                              {/* Plan Summary */}
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Plan Duration:</span>
                                  <span className="font-medium">{plan.planDuration} months</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Monthly Amount:</span>
                                  <span className="font-medium">{formatCurrency(plan.monthlyAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Amount:</span>
                                  <span className="font-medium">{formatCurrency(plan.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Start Date:</span>
                                  <span className="font-medium">{formatDate(plan.startDate)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">End Date:</span>
                                  <span className="font-medium">{formatDate(plan.endDate)}</span>
                                </div>
                              </div>

                              {/* Payment History */}
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2">Payment History</h5>
                                <div className="space-y-2">
                                  {plan.paymentHistory.map((payment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                    >
                                      <div>
                                        <p className="text-sm font-medium">{formatDate(payment.date)}</p>
                                        <p className="text-xs text-gray-600">{payment.method}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-medium">{formatCurrency(payment.amount)}</p>
                                        <Badge className={`text-xs ${getPaymentStatusColor(payment.status)}`}>
                                          {payment.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Receipt
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Contact Support
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingPlans.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Applications</h3>
                  <p className="text-gray-600">All your applications have been processed.</p>
                </CardContent>
              </Card>
            ) : (
              pendingPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Property Info */}
                      <div className="flex gap-3">
                        <Image
                          src={plan.propertyImage || "/placeholder.svg"}
                          alt={plan.propertyTitle}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{plan.propertyTitle}</h4>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="text-sm">{plan.propertyLocation}</span>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(plan.status)}`}>{plan.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span>
                              Applied for: {formatCurrency(plan.monthlyAmount)}/month × {plan.planDuration} months
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Info */}
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <div>
                            <p className="text-sm font-medium text-yellow-900">Application Under Review</p>
                            <p className="text-xs text-yellow-700">
                              We're processing your application. You'll be notified within 24 hours.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Reference */}
                      <div className="text-sm text-gray-600">
                        <span>Reference ID: {plan.referenceId}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Support
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat Support
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            {completedPlans.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Completed Plans</h3>
                  <p className="text-gray-600">You haven't completed any payment plans yet.</p>
                </CardContent>
              </Card>
            ) : (
              completedPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Property Info */}
                      <div className="flex gap-3">
                        <Image
                          src={plan.propertyImage || "/placeholder.svg"}
                          alt={plan.propertyTitle}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{plan.propertyTitle}</h4>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="text-sm">{plan.propertyLocation}</span>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(plan.status)}`}>{plan.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span>
                              Completed: {formatCurrency(plan.monthlyAmount)}/month × {plan.planDuration} months
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Completion Info */}
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-900">Plan Completed Successfully</p>
                            <p className="text-xs text-green-700">
                              Completed on {formatDate(plan.endDate)} • Total paid: {formatCurrency(plan.totalAmount)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download Certificate
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              Make Payment
            </DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-4">
              {/* Payment Summary */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">{selectedPlan.propertyTitle}</h4>
                <p className="text-sm text-gray-600">Payment for {formatDate(selectedPlan.nextPaymentDate)}</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(selectedPlan.nextPaymentAmount)}</p>
              </div>

              {/* Payment Method */}
              <div>
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Debit/Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="ussd">USSD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-2">Bank Transfer Details:</p>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>Bank: GTBank</p>
                    <p>Account: 0123456789</p>
                    <p>Name: RentEasy Payments</p>
                    <p>Reference: {selectedPlan.referenceId}</p>
                  </div>
                </div>
              )}

              {paymentMethod === "ussd" && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-900 font-medium mb-2">USSD Payment:</p>
                  <p className="text-sm text-green-700">
                    Dial *737*000*{selectedPlan.nextPaymentAmount}*{selectedPlan.referenceId}# from your registered
                    phone number
                  </p>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  🔒 Your payment is secured with 256-bit SSL encryption. We never store your card details.
                </p>
              </div>

              <Button
                onClick={processPayment}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!paymentMethod}
              >
                Pay {formatCurrency(selectedPlan.nextPaymentAmount)}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
