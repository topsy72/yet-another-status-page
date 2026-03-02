#!/usr/bin/env tsx
/**
 * Demo Reset Scheduler
 * 
 * Runs as a background process that automatically resets
 * the demo database at specified intervals.
 * 
 * Usage:
 *   npm run demo:scheduler
 */

import { seedDemoData } from './seed-demo-data'
import { getDemoResetInterval } from '../src/lib/demo'

async function resetDemo() {
  console.log('🔄 Starting scheduled demo reset...')
  console.log(`⏰ Reset time: ${new Date().toISOString()}`)
  
  try {
    await seedDemoData()
    console.log('✅ Demo reset completed successfully!')
  } catch (error) {
    console.error('❌ Demo reset failed:', error)
  }
}

async function startScheduler() {
  const intervalMinutes = getDemoResetInterval()
  const intervalMs = intervalMinutes * 60 * 1000
  
  console.log('🚀 Demo reset scheduler started')
  console.log(`⏱️  Reset interval: ${intervalMinutes} minutes`)
  console.log(`📅 Next reset: ${new Date(Date.now() + intervalMs).toISOString()}`)
  
  // Run initial seed
  await resetDemo()
  
  // Schedule periodic resets
  setInterval(async () => {
    await resetDemo()
    console.log(`📅 Next reset: ${new Date(Date.now() + intervalMs).toISOString()}`)
  }, intervalMs)
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('⏹️  Received SIGTERM, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('⏹️  Received SIGINT, shutting down gracefully...')
  process.exit(0)
})

// Start the scheduler
startScheduler().catch((error) => {
  console.error('Failed to start scheduler:', error)
  process.exit(1)
})
