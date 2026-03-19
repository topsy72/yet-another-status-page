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

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { initDemoMode } from '../src/lib/demo'

async function startScheduler() {
  console.log('🚀 Starting demo reset scheduler...')
  
  const payload = await getPayload({ config })
  await initDemoMode(payload)
}

process.on('SIGTERM', () => {
  console.log('⏹️  Received SIGTERM, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('⏹️  Received SIGINT, shutting down gracefully...')
  process.exit(0)
})

startScheduler().catch((error) => {
  console.error('Failed to start scheduler:', error)
  process.exit(1)
})

