import type { CollectionConfig } from 'payload'
import { isLocalLoginDisabled } from '@/lib/oidc'
import { isDemoMode, getDemoUserEmail } from '@/lib/demo'
import { getServerUrl } from '@/lib/utils'

const isProduction = process.env.NODE_ENV === 'production'

// Check if password login should be disabled (SSO-only mode)
const disablePasswordLogin = isLocalLoginDisabled()

// Extract cookie domain from SERVER_URL
const getCookieDomain = (): string | undefined => {
  const serverUrl = getServerUrl()
  try {
    const url = new URL(serverUrl)
    // For localhost, return undefined (no domain restriction)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return undefined
    }
    // Return the hostname for cookie domain
    return url.hostname
  } catch {
    return undefined
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: {
    // Disable database sessions - use stateless JWT
    // Sessions cause issues behind reverse proxy
    useSessions: false,
    cookies: {
      domain: getCookieDomain(),
      secure: isProduction,
      sameSite: 'Lax',
    },
    // Disable password login when OIDC_DISABLE_LOCAL_LOGIN=true
    // Keep email field for user identification
    ...(disablePasswordLogin && {
      disableLocalStrategy: {
        enableFields: true,
      },
    }),
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // In demo mode, prevent password changes for the demo user
        if (isDemoMode() && data?.email === getDemoUserEmail()) {
          if (data.password && operation === 'update') {
            delete data.password
            req.context = req.context || {}
            req.context.demoPasswordChangeBlocked = true
          }
        }
        return data
      },
    ],
    afterChange: [
      ({ req }) => {
        // Show warning message if password change was blocked
        if (req.context?.demoPasswordChangeBlocked) {
          console.warn('[Demo Mode] Password change blocked for demo user')
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'User role for access control',
      },
    },
  ],
}
