/**
 * Demo Mode Utilities
 * 
 * Provides functionality for live demo mode including:
 * - Demo mode detection
 * - Password change restrictions
 * - Database reset scheduling
 */

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

export function getNextResetTime(): Date {
  const now = new Date()
  const interval = getDemoResetInterval()
  const nextReset = new Date(now.getTime() + interval * 60 * 1000)
  return nextReset
}

export function getTimeUntilReset(): string {
  const now = new Date()
  const interval = getDemoResetInterval()
  const nextReset = new Date(Math.ceil(now.getTime() / (interval * 60 * 1000)) * (interval * 60 * 1000))
  const diff = nextReset.getTime() - now.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}
