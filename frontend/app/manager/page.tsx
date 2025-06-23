"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function ManagerPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to manager dashboard
    router.replace("/manager/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
        <p className="text-gray-600">Redirecting to Manager Dashboard...</p>
      </div>
    </div>
  )
}
