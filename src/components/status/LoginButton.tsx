'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function LoginButton() {
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    fetch('/api/demo-status')
      .then((res) => res.json())
      .then((data) => {
        setIsDemoMode(data.isDemoMode)
      })
      .catch(() => {
        setIsDemoMode(false)
      })
  }, [])

  if (!isDemoMode) return null

  return (
    <Link
      href="/admin"
      className="inline-flex items-center justify-center rounded-md bg-[#21c45d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1da84d] focus:outline-none focus:ring-2 focus:ring-[#21c45d] focus:ring-offset-2"
    >
      Login
    </Link>
  )
}
