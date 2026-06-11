import { response } from "express"
import { generateResponse, generateChatTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import { getIO } from "../sockets/server.socket.js"


export const sendMessage = async (req, res) => {
    
    let { message, chat: chatId } = req.body

    let chat = null
    let title = null

    // Get socket.io instance and emit progress
    const io = getIO();
    
    const emitProgress = (progressData) => {
      // Broadcast to all connected clients
      io.emit("chatProgress", progressData);
    };

    // Emit initial progress
    emitProgress({
      stage: "initializing",
      progress: 10,
      message: "Starting chat...",
      timestamp: Date.now()
    });

    if (!chatId) {
    
        emitProgress({
          stage: "processing",
          progress: 15,
          message: "Generating chat title...",
          timestamp: Date.now()
        });

        title = await generateChatTitle(message)

        chat = await chatModel.create({

            user: req.user.id,
            title
        })

        chatId = chat._id
    }


    const userMessage = await messageModel.create({

        chat: chatId,
        content: message,
        role: "user"
    })

    emitProgress({
      stage: "processing",
      progress: 30,
      message: "Message received",
      timestamp: Date.now()
    });


    const messages = await messageModel.find({
        chat: chatId
    })

    emitProgress({
      stage: "thinking",
      progress: 50,
      message: "Processing information...",
      timestamp: Date.now()
    });

    const result = await generateResponse(messages, emitProgress)

    emitProgress({
      stage: "generating",
      progress: 85,
      message: "Composing response...",
      timestamp: Date.now()
    });

    
    const aiMessage = await messageModel.create({
        chat: chatId,
        content: result,
        role: "ai"
    })

    emitProgress({
      stage: "complete",
      progress: 100,
      message: "Complete!",
      timestamp: Date.now()
    });

    res.status(201).json({

        title,
        chat,
        userMessage,
        aiMessage
    })

}


export async function getChats (req, res) {

    const user = req.user

    const chats = await chatModel.find({
        user: req.user.id
    })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })

}


export async function getMessages(req, res) {

    const { chatId } = req.params

    const chat = await chatModel.findOne({

        _id: chatId,
        user: req.user.id        
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId    
    })

    
    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}


export async function deleteChat(req,res){

    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({

        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}

