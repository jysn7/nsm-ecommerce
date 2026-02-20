'use client'

interface SellerLayoutProps {
  children: React.ReactNode
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      <div className="w-full border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50 flex justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between">
          
          <div className="text-[9px] uppercase tracking-widest px-3 py-1 bg-muted rounded-full text-muted-foreground">
            Seller Mode
          </div>

        </div>
      </div>

      <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 py-10">
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
