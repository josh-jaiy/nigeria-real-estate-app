import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export default function ReceiptsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <LoadingSkeleton className="h-8 w-64 mb-6" />

        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <LoadingSkeleton className="h-10 flex-1" />
            <LoadingSkeleton className="h-10 w-40" />
            <LoadingSkeleton className="h-10 w-32" />
            <LoadingSkeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="bg-white rounded-lg">
          <div className="p-6 border-b">
            <LoadingSkeleton className="h-6 w-48" />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <LoadingSkeleton className="h-4 w-32" />
                  <LoadingSkeleton className="h-4 w-48" />
                  <LoadingSkeleton className="h-4 w-40" />
                  <LoadingSkeleton className="h-4 w-24" />
                  <LoadingSkeleton className="h-4 w-20" />
                  <LoadingSkeleton className="h-4 w-20" />
                  <LoadingSkeleton className="h-4 w-16" />
                  <LoadingSkeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
