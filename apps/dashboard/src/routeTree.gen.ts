import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { authLayoutRoute } from './routes/_auth'
import { loginRoute } from './routes/_auth/login'
import { signupRoute } from './routes/_auth/signup'
import { dashboardLayoutRoute } from './routes/_dashboard'
import { dashboardRoute } from './routes/_dashboard/dashboard'
import { projectsRoute } from './routes/_dashboard/projects'
import { skillsRoute } from './routes/_dashboard/skills'
import { experienceRoute } from './routes/_dashboard/experience'
import { educationRoute } from './routes/_dashboard/education'
import { messagesRoute } from './routes/_dashboard/messages'
import { settingsRoute } from './routes/_dashboard/settings'

export const routeTree = rootRoute.addChildren([
  indexRoute,
  authLayoutRoute.addChildren([
    loginRoute,
    signupRoute,
  ]),
  dashboardLayoutRoute.addChildren([
    dashboardRoute,
    projectsRoute,
    skillsRoute,
    experienceRoute,
    educationRoute,
    messagesRoute,
    settingsRoute,
  ]),
])
