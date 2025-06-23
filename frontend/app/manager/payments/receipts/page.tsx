"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Eye, Mail, Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { generatePaymentReceipt, emailReceipt } from "@/lib/receipt-generator"

// Mock receipt data
const mockReceipts = [
  {
    id: "receipt_1",
    receiptNumber: "RCP-2024-001234",
    tenant: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 801 234 5678",
      property: {
        title: "2-Bedroom Apartment",
        location: "Victoria Island, Lagos",
      },
    },
    amount: 2500000,
    lateFee: 0,
    totalAmount: 2500000,
    paymentDate: "2024-05-01",
    paymentMethod: "bank_transfer",
    reference: "TXN123456789",
    description: "May 2024 Rent Payment",
    recordedBy: "Manager",
    recordedAt: "2024-05-01T10:30:00Z",
    emailSent: true,
  },
  {
    id: "receipt_2",
    receiptNumber: "RCP-2024-001235",
    tenant: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+234 802 345 6789",
      property: {
        title: "3-Bedroom House",
        location: "Lekki Phase 1, Lagos",
      },
    },
    amount: 4500000,
    lateFee: 225000,
    totalAmount: 4725000,
    paymentDate: "2024-04-28",
    paymentMethod: "cash",
    reference: "",
    description: "April 2024 Rent Payment (Late)",
    recordedBy: "Manager",
    recordedAt: "2024-04-28T14:15:00Z",
    emailSent: false,
  },
  {
    id: "receipt_3",
    receiptNumber: "RCP-2024-001236",
    tenant: {
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+234 803 456 7890",
      property: {
        title: "Studio Apartment",
        location: "Ikeja, Lagos",
      },
    },
    amount: 1800000,
    lateFee: 0,
    totalAmount: 1800000,
    paymentDate: "2024-05-02",
    paymentMethod: "online_payment",
    reference: "PAY987654321",
    description: "May 2024 Rent Payment",
    recordedBy: "Manager",
    recordedAt: "2024-05-02T09:45:00Z",
    emailSent: true,
  },
]

export default function ReceiptsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredReceipts = mockReceipts.filter((receipt) => {
    const matchesSearch =
      receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.tenant.property.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "sent" && receipt.emailSent) ||
      (statusFilter === "not_sent" && !receipt.emailSent)

    const matchesDate = dateFilter === "all" // Add date filtering logic as needed

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleDownloadReceipt = async (receipt: any) => {
    try {
      const receiptBlob = await generatePaymentReceipt(receipt)
      const url = URL.createObjectURL(receiptBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `receipt-${receipt.receiptNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Receipt Downloaded",
        description: `Receipt ${receipt.receiptNumber} has been downloaded.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download receipt. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePreviewReceipt = async (receipt: any) => {
    try {
      const receiptBlob = await generatePaymentReceipt(receipt)
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

  const handleEmailReceipt = async (receipt: any) => {
    try {
      const success = await emailReceipt(receipt, receipt.tenant.email)
      if (success) {
        toast({
          title: "Receipt Sent",
          description: `Receipt emailed to ${receipt.tenant.email}`,
        })
      } else {
        throw new Error("Email sending failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send receipt email. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Receipts</h1>
            <p className="text-gray-600">View and manage payment receipts</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search receipts, tenants, or properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Email Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Receipts</SelectItem>
                    <SelectItem value="sent">Email Sent</SelectItem>
                    <SelectItem value="not_sent">Email Not Sent</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Receipts ({filteredReceipts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt #</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Email Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.receiptNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{receipt.tenant.name}</div>
                          <div className="text-sm text-gray-500">{receipt.tenant.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{receipt.tenant.property.title}</div>
                          <div className="text-sm text-gray-500">{receipt.tenant.property.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatCurrency(receipt.totalAmount)}</div>
                          {receipt.lateFee > 0 && (
                            <div className="text-sm text-red-600">+{formatCurrency(receipt.lateFee)} late fee</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {new Date(receipt.paymentDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{receipt.paymentMethod.replace("_", " ").toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={receipt.emailSent ? "default" : "secondary"}>
                          {receipt.emailSent ? "Sent" : "Not Sent"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handlePreviewReceipt(receipt)}
                            title="Preview Receipt"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadReceipt(receipt)}
                            title="Download Receipt"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEmailReceipt(receipt)}
                            title="Email Receipt"
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredReceipts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-lg font-medium">No receipts found</div>
                <div className="text-sm">Try adjusting your search criteria</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
