export interface UserCreateDTO {
  federalId: string
  name: string
  email: string
  contact: string
}

export interface User {
  id: number
  guid: string
  federalId: string
  name: string
  email: string
  contact: string
  createdDate: string
  updatedDate: string
  deletedDate: string
}
