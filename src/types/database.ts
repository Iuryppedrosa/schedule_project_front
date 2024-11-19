import type { User, SportCourt, Schedule, Notification, AdminActionLog } from '../types'

export interface Database {
  users: User[]
  sportCourts: SportCourt[]
  schedules: Schedule[]
  notifications: Notification[]
  adminActionLogs: AdminActionLog[]
}
