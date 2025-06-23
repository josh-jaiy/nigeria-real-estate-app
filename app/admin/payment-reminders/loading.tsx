import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentRemindersLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats Skeleton */}
      <div className="px-4 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2 bg-white/20" />
                <Skeleton className="h-3 w-20 mx-auto bg-white/20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-4 py-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j}>
                      <Skeleton className="h-3 w-16 mb-1" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
