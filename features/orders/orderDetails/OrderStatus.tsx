export default function OrderStatus({
  order,
  shipmentData,
}: {
  order: any
  shipmentData: any
}) {
  const statusSteps = ['pending', 'paid', 'shipped', 'delivered']
  const dbStatus = order.status?.toLowerCase() || 'pending'

  const isCancelled = dbStatus === 'cancelled'
  const isReturned = shipmentData?.status === 'returned'

  const currentStep = statusSteps.indexOf(dbStatus)

  return (
    <div className="py-10 border-b border-border">
      {isCancelled ? (
        <div className="text-center py-2">
          <span className="bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-8 py-2.5 rounded-full border border-border">
            Order Cancelled
          </span>
        </div>
      ) : isReturned ? (
        <div className="text-center py-2">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-8 py-2.5 rounded-full">
            Order Returned
          </span>
        </div>
      ) : (
        <div className="flex justify-between items-center max-w-md mx-auto relative px-4">
          {statusSteps.map((step, idx) => {
            const isActive = idx <= currentStep

            return (
              <div
                key={step}
                className="flex flex-col items-center gap-3 relative z-10 bg-card px-2"
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-primary' : 'bg-muted'
                  }`}
                />
                <p
                  className={`text-[7px] uppercase font-bold tracking-widest ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </p>
              </div>
            )
          })}
          <div className="absolute top-1.5 left-0 w-full h-px bg-muted z-0 mx-4" />
        </div>
      )}
    </div>
  )
}