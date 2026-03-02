import { NextResponse } from 'next/server'
import { 
  isDemoMode, 
  getTimeUntilReset, 
  getDemoResetInterval,
  getDemoUserEmail,
  getDemoUserPassword
} from '@/lib/demo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json({
    isDemoMode: isDemoMode(),
    timeUntilReset: isDemoMode() ? getTimeUntilReset() : null,
    resetIntervalMinutes: isDemoMode() ? getDemoResetInterval() : null,
    demoEmail: isDemoMode() ? getDemoUserEmail() : null,
    demoPassword: isDemoMode() ? getDemoUserPassword() : null,
  })
}
