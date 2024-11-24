import axiosInstance from './axios'
import { UserCreateDTO } from '../types/userTypes'

export const createUser = async (data: UserCreateDTO): Promise<UserCreateDTO> => {
  const response = await axiosInstance.post<UserCreateDTO>('/user', data)
  return response.data
}
