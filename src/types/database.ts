import type {
  User,
  SportCourt,
  Schedule,
  Notification,
  AdminActionLog,
  Event,
  EventsList,
} from '../types'

export interface Database {
  users: User[]
  sportCourts: SportCourt[]
  schedules: Schedule[]
  notifications: Notification[]
  adminActionLogs: AdminActionLog[]
  event: Event
  eventsList: EventsList
}
