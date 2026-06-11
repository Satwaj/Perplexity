import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({

  name:"chat",
  initialState:{

    chats:{},
    currentChatId:null,
    isLoading:false,
    error:null,
    chatProgress: {
      stage: null,
      progress: 0,
      message: "",
      timestamp: null,
    },
     
  },
  reducers:{

    createNewChat:(state,action)=>{
      const {chatId, title} = action.payload
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lastUpdated : new Date().toISOString(),
      }
    },

    addNewMessage:(state,action)=>{
      const {chatId, content, role} = action.payload
      state.chats[chatId].messages.push({ content,role, })
    },

    addMessages:(state,action)=>{
      const {chatId, messages} = action.payload
      state.chats[chatId].messages.push(...messages)
    },

    setChats:(state,action)=>{
      state.chats = action.payload
    },
    setCurrentChatId:(state,action)=>{
      state.currentChatId = action.payload
    },
    setLoading:(state,action)=>{
      state.isLoading = action.payload
    },
    setError:(state,action)=>{
      state.error = action.payload
    },
    deleteChat:(state,action)=>{
      const chatId = action.payload
      delete state.chats[chatId]
      if(state.currentChatId === chatId){
        state.currentChatId = null
      }
    },
    setChatProgress:(state,action)=>{
      state.chatProgress = action.payload
    },
    resetChatProgress:(state)=>{
      state.chatProgress = {
        stage: null,
        progress: 0,
        message: "",
        timestamp: null,
      }
    }
  }

})

export const {setChats,setCurrentChatId,setLoading,setError, createNewChat, addNewMessage,addMessages,deleteChat, setChatProgress, resetChatProgress } = chatSlice.actions
export default chatSlice.reducer