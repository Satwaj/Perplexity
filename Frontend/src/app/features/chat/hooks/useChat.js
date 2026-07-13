import { initializeSocketConnection, initializeChatSocket, onChatProgress } from "../service/chat.socket";
import { sendMessage, getChats,getMessages,deleteChat } from "../service/chat.api";
import { setLoading , setChats ,setCurrentChatId ,setError , createNewChat, addNewMessage,addMessages, deleteChat as deleteChatAction, setChatProgress, resetChatProgress } from "../chat.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";



export const useChat = () => {


  const dispatch = useDispatch()
  
  // Get chats from Redux store
  const chats = useSelector((state) => state.chat.chats);
  const chatProgress = useSelector((state) => state.chat.chatProgress);

  // Setup socket listener for chat progress
  useEffect(() => {
    // Initialize persistent socket for progress tracking
    initializeChatSocket();

    const unsubscribe = onChatProgress((progressData) => {
      dispatch(setChatProgress(progressData));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleSendmessage = useCallback(async ({message, chatId}) => {
    const isNewChat = !chatId;
    const tempChatId = isNewChat ? "temp-" + Date.now() : null;

    try {
      dispatch(setLoading(true))
      dispatch(resetChatProgress())

      if (isNewChat) {
        dispatch(createNewChat({
          chatId: tempChatId,
          title: message.substring(0, 30) + (message.length > 30 ? "..." : ""),
        }));
        dispatch(addNewMessage({
          chatId: tempChatId,
          content: message,
          role: "user"
        }));
        dispatch(setCurrentChatId(tempChatId));
      } else {
        dispatch(addNewMessage({
          chatId: chatId,
          content: message,
          role: "user"
        }));
      }
      
      const data = await sendMessage(message, isNewChat ? null : chatId);
      const {chat, aiMessage} = data;
     
      if (isNewChat) {
        // Create the real chat
        dispatch(createNewChat({
          chatId: chat._id,
          title: chat.title,
        }));
        // Add user message to real chat
        dispatch(addNewMessage({
          chatId: chat._id,
          content: message,
          role: "user"
        }));
        // Add assistant message to real chat
        if (aiMessage) {
          dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role
          }));
        }
        dispatch(setCurrentChatId(chat._id));
        // Remove the temporary chat
        dispatch(deleteChatAction(tempChatId));
      } else {
        if (aiMessage) {
          dispatch(addNewMessage({
            chatId: chatId,
            content: aiMessage.content,
            role: aiMessage.role
          }));
        }
      }
    } catch (error) {
      dispatch(setError(error.message || "An error occurred while sending message."));
      console.error("Error sending message:", error);
      if (isNewChat && tempChatId) {
        dispatch(deleteChatAction(tempChatId));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleGetChats = useCallback(async () => {
    dispatch(setLoading(true))
    try {
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
    } catch (error) {
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch]);

  const handleOpenChat = useCallback(async (chatId, chats) => {
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
      } catch (error) {
        dispatch(setError(error.message))
        console.error("Error opening chat:", error)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }, [dispatch]);

  const handleDeleteChat = useCallback(async (chatId) => {
    dispatch(setLoading(true))
    try {
      await deleteChat(chatId)
      dispatch(deleteChatAction(chatId))
    } catch (error) {
      dispatch(setError(error.message))
      console.error("Error deleting chat:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch]);
  
  return {
    chats,
    chatProgress,
    initializeSocketConnection,
    handleSendmessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat
  }
}