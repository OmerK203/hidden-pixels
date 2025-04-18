'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabaseClient'

export default function useAuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/auth')
      }
    }

    checkSession()
  }, [router])
}
