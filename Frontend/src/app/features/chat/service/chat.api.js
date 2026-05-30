import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL,
  withCredentials: true, 
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)


export const sendMessage = async (message, chatId) =>{

  const response = await api.post("/api/chats/message",{message, chat: chatId})
  return response.data
}

  
export const getChats = async () => {
  const response = await api.get("/api/chats")
  return response.data
}

export const getMessages = async (chatId) => {
  const response = await api.get(`/api/chats/${chatId}/messages`)
  return response.data
}

export const deleteChat = async (chatId) => {
  const response = await api.delete(`/api/chats/delete/${chatId}`)
  return response.data
}

