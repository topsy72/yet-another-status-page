/**
 * Demo Mode Utilities
 * 
 * Provides functionality for live demo mode including:
 * - Demo mode detection
 * - Password change restrictions
 * - Database reset scheduling
 */

import type { Payload } from 'payload'

let nextResetTime: Date | null = null

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === 'true'
}

export function getDemoUserEmail(): string {
  return process.env.DEMO_USER_EMAIL || 'demo@yasp.io'
}

export function getDemoUserPassword(): string {
  return process.env.DEMO_USER_PASSWORD || 'demo2026#'
}

export function getDemoResetInterval(): number {
  return parseInt(process.env.DEMO_RESET_INTERVAL_MINUTES || '60', 10)
}

export function setNextResetTime(intervalMinutes: number): void {
  nextResetTime = new Date(Date.now() + intervalMinutes * 60 * 1000)
}

export function getNextResetTime(): Date {
  if (nextResetTime) {
    return nextResetTime
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

export async function initDemoMode(payload: Payload): Promise<void> {
  const { seedDemoData } = await import('./seed-demo-data')
  const intervalMinutes = getDemoResetInterval()
  const intervalMs = intervalMinutes * 60 * 1000
  
  console.log('🚀 Demo mode scheduler initialized')
  console.log(`⏱️  Reset interval: ${intervalMinutes} minutes`)
  
  async function resetDemo() {
    console.log('🔄 Starting scheduled demo reset...')
    console.log(`⏰ Reset time: ${new Date().toISOString()}`)
    
    try {
      await seedDemoData(payload)
      setNextResetTime(intervalMinutes)
      console.log('✅ Demo reset completed successfully!')
      console.log(`📅 Next reset: ${getNextResetTime().toISOString()}`)
    } catch (error) {
      console.error('❌ Demo reset failed:', error)
    }
  }
  
  await resetDemo()
  
  setInterval(async () => {
    await resetDemo()
  }, intervalMs)
}
