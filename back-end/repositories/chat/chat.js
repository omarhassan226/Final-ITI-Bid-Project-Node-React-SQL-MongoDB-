// repositories/chat/chat.repository.js
const MessageRepository = require('../../repositories/Messages/Messages.repository')

class ChatRepository {
    constructor(messageRepo) {
        this.messages = [];
        this.messageRepo = new MessageRepository() // In-memory message storage, replace with database in production
    }

    async saveMessage(userId, message) {
    //     const chatMessage = {
    //         userId,
    //         message,
    //         timestamp: new Date(),
    //     };

    //     this.messageRepo.createMessage(userId,userId,message)
    // ('hambozo');
    // (chatMessage);
    //     this.messages.push(chatMessage);
    //     return chatMessage;
    }

    async getMessages() {
        // return this.messages;
    }
}

module.exports = ChatRepository;
