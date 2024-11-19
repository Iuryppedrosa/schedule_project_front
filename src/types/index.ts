export type UserRole = 'client' | 'admin'

export interface User {
  id: number
  guid: string
  username: string
  password_hash: string
  email: string
  role: UserRole
}

export interface SportCourt {
  id: number
  guid: string
  name: string
  location: string
}

export type ScheduleStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Schedule {
  id: number
  guid: string
  user_id: number
  court_id: number
  start_time: string // ISO 8601 format (e.g., "2024-11-20T10:00:00")
  end_time: string // ISO 8601 format
  status: ScheduleStatus
}

export interface Notification {
  id: number
  guid: string
  user_id: number
  message: string
  sent_at: string // ISO 8601 format
}

export interface AdminActionLog {
  id: number
  guid: string
  admin_id: number
  action: string
  timestamp: string // ISO 8601 format
}
