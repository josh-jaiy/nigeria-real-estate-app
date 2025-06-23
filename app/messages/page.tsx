import { ArrowLeft, Search, Phone, Video, MoreVertical, Send, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const conversations = [
  {
    id: 1,
    tenant: "Kemi Adebayo",
    property: "Modern 2-Bedroom Apartment",
    lastMessage: "Is this property still available?",
    time: "2h",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    tenant: "John Okafor",
    property: "Luxury Studio",
    lastMessage: "Can I schedule a viewing?",
    time: "5h",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    tenant: "Sarah Ibrahim",
    property: "3-Bedroom Duplex",
    lastMessage: "Thank you for the quick response!",
    time: "1d",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    tenant: "Ahmed Hassan",
    property: "1-Bedroom Flat",
    lastMessage: "What's the security deposit?",
    time: "2d",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const messages = [
  {
    id: 1,
    sender: "tenant",
    message: "Hi! I'm interested in the Modern 2-Bedroom Apartment in Victoria Island. Is it still available?",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "manager",
    message: "Hello Kemi! Yes, the property is still available. Would you like to schedule a viewing?",
    time: "10:45 AM",
  },
  {
    id: 3,
    sender: "tenant",
    message: "That would be great! What times are available this week?",
    time: "10:47 AM",
  },
  {
    id: 4,
    sender: "manager",
    message: "I have availability tomorrow at 2 PM or Thursday at 11 AM. Which works better for you?",
    time: "10:50 AM",
  },
  {
    id: 5,
    sender: "tenant",
    message: "Thursday at 11 AM works perfectly. Should I bring any documents?",
    time: "11:15 AM",
  },
]

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs defaultValue="conversations" className="w-full h-screen flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-white border-b">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="chat">Active Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="flex-1 m-0">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
              </div>
              <div className="mt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </div>
            </div>
          </header>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <Card key={conversation.id} className="m-4 mb-2 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.tenant
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{conversation.tenant}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-green-600 text-xs px-2 py-1">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conversation.property}</p>
                      <p className="text-sm text-gray-800 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="flex-1 m-0 flex flex-col">
          {/* Chat Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>KA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kemi Adebayo</h4>
                    <p className="text-xs text-gray-600">Modern 2-Bedroom Apartment</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "manager" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "manager" ? "bg-green-600 text-white" : "bg-white border"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${message.sender === "manager" ? "text-green-100" : "text-gray-500"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="sm">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
