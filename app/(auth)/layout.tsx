import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background px-4">
      {/* Spacer for the h-20 navbar */}
      <div className="h-28" /> 
      <div className="w-full max-w-[400px]">
        {children}
        <Toaster />
      </div>
    </main>
  )
}