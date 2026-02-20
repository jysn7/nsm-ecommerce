import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background px-4">
      <div className="h-28" /> 
      <div className="w-full max-w-100">
        {children}
        <Toaster />
      </div>
    </main>
  )
}