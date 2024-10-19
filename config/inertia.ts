import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps, SharedProps } from '@adonisjs/inertia/types'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx: HttpContext) => ctx.session?.flashMessages.get('errors'),
    success: (ctx: HttpContext) => ctx.session?.flashMessages.get('success'),
    currentUser: (ctx: HttpContext) => {
      const user = ctx.auth?.user
      if (user) {
        delete user.$attributes.githubAccessToken
        return user
      }
      return undefined
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {
    [key: string]: any
  }
}

export interface PageProps extends SharedProps {
  currentUser: User | undefined
  success: {
    [key: string]: string[]
  }
}
