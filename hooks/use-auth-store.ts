import { create } from 'zustand'

interface AuthState {
  name: string
  email: string
  password: string
  errors: { name?: string; email?: string; password?: string }
  setName: (name: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  validate: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  name: '',
  email: '',
  password: '',
  errors: {},
  
  setName: (name) => {
    set({ name })
    if (get().errors.name) {
      set({ errors: { ...get().errors, name: undefined } })
    }
  },

  setEmail: (email) => {
    set({ email })
    if (get().errors.email) {
      set({ errors: { ...get().errors, email: undefined } })
    }
  },

  setPassword: (password) => {
    set({ password })
    if (get().errors.password) {
      set({ errors: { ...get().errors, password: undefined } })
    }
  },

  validate: () => {
    const { name, email, password } = get()
    const newErrors: { name?: string; email?: string; password?: string } = {}
    
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!email.includes('@')) {
      newErrors.email = 'Enter a valid email'
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    set({ errors: newErrors })
    return Object.keys(newErrors).length === 0
  }
}))