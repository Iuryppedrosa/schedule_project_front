import { LoginRequest, LoginResponse } from '../types/authTypes'
import axiosInstance from './axios'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/user/login', data)
  return response.data
}
