/**
 * Demo Mode Utilities
 * 
 * Provides functionality for live demo mode including:
 * - Demo mode detection
 * - Password change restrictions
 * - Database reset scheduling
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const RESET_TIME_FILE = join(process.cwd(), '.demo-reset-time.json')

interface ResetTimeData {
  nextResetTime: string
  intervalMinutes: number
  lastUpdated: string
}

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === 'true'
}

export function getDemoUserEmail(): string {
  return process.env.DEMO_USER_EMAIL || 'demo@yasp.io'
}

export function getDemoUserPassword(): string {
  return process.env.DEMO_USER_PASSWORD || 'demo123'
}

export function getDemoResetInterval(): number {
  return parseInt(process.env.DEMO_RESET_INTERVAL_MINUTES || '60', 10)
}

function getResetTimeData(): ResetTimeData | null {
  try {
    if (existsSync(RESET_TIME_FILE)) {
      const data = readFileSync(RESET_TIME_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to read reset time file:', error)
  }
  return null
}

export function getNextResetTime(): Date {
  const data = getResetTimeData()
  
  if (data?.nextResetTime) {
    return new Date(data.nextResetTime)
  }
  
  const interval = getDemoResetInterval()
  return new Date(Date.now() + interval * 60 * 1000)
}

export function getTimeUntilReset(): string {
  const now = new Date()
  const nextReset = getNextResetTime()
  const diff = nextReset.getTime() - now.getTime()
  
  if (diff <= 0) {
    return 'Resetting soon...'
  }
  
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}
