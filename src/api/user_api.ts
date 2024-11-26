import axiosInstance from './axios'
import { UserCreateDTO } from '../types/userTypes'
import { User } from '../types/userTypes'

export const createUser = async (data: UserCreateDTO): Promise<UserCreateDTO> => {
  const response = await axiosInstance.post<UserCreateDTO>('/user', data)
  return response.data
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/user')
  return response.data
}
