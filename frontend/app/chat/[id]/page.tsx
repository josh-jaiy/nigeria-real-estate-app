"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  MapPin,
  Eye,
  Calendar,
  Download,
  ImageIcon,
  FileText,
  Check,
  CheckCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"

const propertyPreview = {
  id: 1,
  title: "Modern 2-Bedroom Apartment",
  location: "Victoria Island, Lagos",
  price: "₦2,500,000",
  period: "/year",
  image: "/placeholder.svg?height=80&width=80",
  status: "Available",
}

const chatParticipants = {
  tenant: {
    name: "Kemi Adebayo",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  manager: {
    name: "Adebayo Properties",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    verified: true,
  },
}

const messages = [
  {
    id: 1,
    sender: "tenant",
    type: "text",
    content: "Hi! I'm interested in the Modern 2-Bedroom Apartment in Victoria Island. Is it still available?",
    timestamp: "10:30 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 2,
    sender: "manager",
    type: "text",
    content: "Hello Kemi! Yes, the property is still available. Would you like to schedule a viewing?",
    timestamp: "10:45 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 3,
    sender: "tenant",
    type: "text",
    content: "That would be great! What times are available this week?",
    timestamp: "10:47 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 4,
    sender: "manager",
    type: "text",
    content: "I have availability tomorrow at 2 PM or Thursday at 11 AM. Which works better for you?",
    timestamp: "10:50 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 5,
    sender: "tenant",
    type: "text",
    content: "Thursday at 11 AM works perfectly. Should I bring any documents?",
    timestamp: "11:15 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 6,
    sender: "manager",
    type: "text",
    content: "Please bring a valid ID and proof of income. I'll also send you the property documents for review.",
    timestamp: "11:20 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 7,
    sender: "manager",
    type: "document",
    content: "Property_Agreement_Template.pdf",
    fileSize: "2.3 MB",
    timestamp: "11:22 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 8,
    sender: "tenant",
    type: "image",
    content: "/placeholder.svg?height=200&width=300",
    caption: "Here's my ID for verification",
    timestamp: "11:30 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 9,
    sender: "manager",
    type: "text",
    content:
      "Perfect! I've received your ID. Looking forward to meeting you on Thursday. I'll send you the exact address and my contact number.",
    timestamp: "11:35 AM",
    date: "Today",
    status: "read",
  },
  {
    id: 10,
    sender: "tenant",
    type: "text",
    content: "Thank you so much! I'm really excited about this property. See you Thursday!",
    timestamp: "11:40 AM",
    date: "Today",
    status: "delivered",
  },
]

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const formatTime = (timestamp: string) => {
    return timestamp
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Avatar className="h-10 w-10">
                <AvatarImage src={chatParticipants.manager.avatar || "/placeholder.svg"} />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{chatParticipants.manager.name}</h4>
                  {chatParticipants.manager.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Property
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Property Preview */}
      <div className="bg-white border-b px-4 py-3">
        <Card className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex gap-3">
              <Image
                src={propertyPreview.image || "/placeholder.svg"}
                alt={propertyPreview.title}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm truncate">{propertyPreview.title}</h4>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="text-xs truncate">{propertyPreview.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-green-600">{propertyPreview.price}</span>
                    <span className="text-gray-500 text-xs">{propertyPreview.period}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">{propertyPreview.status}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="self-start">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender === "tenant"
          const showDate = index === 0 || messages[index - 1].date !== message.date

          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex justify-center mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                    {message.date}
                  </Badge>
                </div>
              )}

              <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`max-w-[80%] ${isCurrentUser ? "order-2" : "order-1"}`}>
                  {/* Message Bubble */}
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      isCurrentUser
                        ? "bg-green-600 text-white rounded-br-sm"
                        : "bg-white border rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {message.type === "text" && <p className="text-sm leading-relaxed">{message.content}</p>}

                    {message.type === "image" && (
                      <div className="space-y-2">
                        <Image
                          src={message.content || "/placeholder.svg"}
                          alt="Shared image"
                          width={200}
                          height={150}
                          className="rounded-lg object-cover max-w-full"
                        />
                        {message.caption && <p className="text-sm">{message.caption}</p>}
                      </div>
                    )}

                    {message.type === "document" && (
                      <div className="flex items-center gap-3 p-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{message.content}</p>
                          <p className="text-xs text-gray-500">{message.fileSize}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Timestamp and Status */}
                  <div className={`flex items-center gap-1 mt-1 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    {isCurrentUser && getMessageStatus(message.status)}
                  </div>
                </div>

                {/* Avatar for other user */}
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8 order-1 mr-2 self-end">
                    <AvatarImage src={chatParticipants.manager.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">AP</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          )
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={chatParticipants.manager.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">AP</AvatarFallback>
              </Avatar>
              <div className="bg-white border rounded-lg px-3 py-2 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[300px]">
              <SheetHeader>
                <SheetTitle>Send Attachment</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleFileUpload}>
                  <FileText className="h-6 w-6" />
                  <span className="text-xs">Document</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleFileUpload}>
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Photo</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xs">Schedule</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12 min-h-[44px] resize-none"
              multiline
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="flex-shrink-0 bg-green-600 hover:bg-green-700 h-11 w-11 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Calendar className="h-3 w-3 mr-1" />
            Schedule Viewing
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Phone className="h-3 w-3 mr-1" />
            Request Call
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <MapPin className="h-3 w-3 mr-1" />
            Get Directions
          </Button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
        onChange={(e) => {
          // Handle file upload
          console.log("File selected:", e.target.files?.[0])
        }}
      />
    </div>
  )
}
