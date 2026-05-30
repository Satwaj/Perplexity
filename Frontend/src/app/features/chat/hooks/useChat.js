import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats,getMessages,deleteChat } from "../service/chat.api";
import { setLoading , setChats ,setCurrentChatId ,setError , createNewChat, addNewMessage,addMessages, deleteChat as deleteChatAction} from "../chat.slice";
import { useDispatch, useSelector } from "react-redux";



export const useChat = () => {


  const dispatch = useDispatch()
  
  // Get chats from Redux store
  const chats = useSelector((state) => state.chat.chats);

   async function handleSendmessage({message, chatId}){
   dispatch(setLoading(true))
   const data = await  sendMessage(message, chatId)
   const  {chat, aiMessage} = data
  
   if(!chatId)
   dispatch(createNewChat({
    chatId:  chatId || chat._id,
    title: chat.title,
   }))

   if(aiMessage) {
   dispatch(addNewMessage({
    chatId:  chatId || chat._id,
    content: message,
    role:"user"
   }))

   dispatch(addNewMessage({
    chatId: chatId || chat._id,
    content: aiMessage.content,
    role: aiMessage.role
   }))
   }
   dispatch(setCurrentChatId(chatId || chat._id))
   dispatch(setLoading(false))

  } 

  async function handleGetChats(){
    dispatch(setLoading(true))
    const data = await getChats()
    const {chats} = data
    dispatch(setChats(chats.reduce((acc,chat)=>{
      acc[chat._id] = {
        id: chat._id,
        title: chat.title,  
        messages: [],
        lastUpdated: chat.updatedAt,
      }
      return acc
      },{})))
      dispatch(setLoading(false))
    }
  

    async function handleOpenChat(chatId, chats){
      dispatch(setCurrentChatId(chatId))
      
      if(chats[chatId]?.messages.length === 0){
      
      try {
        dispatch(setLoading(true))
        const data = await getMessages(chatId)
        const {messages} = data

        const formattedMessages = messages.map((msg) => ({
          content: msg.content,
          role: msg.role,
        }))
        dispatch(addMessages({
          chatId,
          messages: formattedMessages
        }))
        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setError(error.message))
        dispatch(setLoading(false))
        console.error("Error opening chat:", error)
      }
    }
  }

  async function handleDeleteChat(chatId){
    dispatch(setLoading(true))
    try {
      await deleteChat(chatId)
      dispatch(deleteChatAction(chatId))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setError(error.message))
      dispatch(setLoading(false))
      console.error("Error deleting chat:", error)
    }
  }
  


  return {
    chats,
  initializeSocketConnection,
  handleSendmessage,
  handleGetChats,
  handleOpenChat,
  handleDeleteChat
  }
}