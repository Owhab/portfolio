import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AuthProvider } from '@/contexts/auth-context'

export const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
})
