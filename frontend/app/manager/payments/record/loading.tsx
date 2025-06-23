import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export default function RecordPaymentLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <LoadingSkeleton className="h-8 w-16" />
          <div>
            <LoadingSkeleton className="h-8 w-48 mb-2" />
            <LoadingSkeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tenant Selection Card */}
            <div className="bg-white rounded-lg border p-6">
              <LoadingSkeleton className="h-6 w-32 mb-4" />
              <LoadingSkeleton className="h-10 w-full mb-4" />
              <LoadingSkeleton className="h-24 w-full" />
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-lg border p-6">
              <LoadingSkeleton className="h-6 w-40 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <LoadingSkeleton className="h-10 w-full" />
                <LoadingSkeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <LoadingSkeleton className="h-10 w-full" />
                <LoadingSkeleton className="h-10 w-full" />
              </div>
              <LoadingSkeleton className="h-10 w-full mb-4" />
              <LoadingSkeleton className="h-20 w-full" />
            </div>

            {/* Proof of Payment Card */}
            <div className="bg-white rounded-lg border p-6">
              <LoadingSkeleton className="h-6 w-36 mb-4" />
              <LoadingSkeleton className="h-32 w-full" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <LoadingSkeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-6 w-full" />
              </div>
            </div>

            <div className="space-y-3">
              <LoadingSkeleton className="h-10 w-full" />
              <LoadingSkeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
