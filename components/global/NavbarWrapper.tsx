import { getNavbarProfile } from '@/lib/supabase/customer'
import { Navbar } from './Navbar'

export default async function NavbarWrapper() {
  const profile = await getNavbarProfile()

  return (
    <Navbar 
      email={profile.email} 
      role={profile.role} 
    />
  )
}