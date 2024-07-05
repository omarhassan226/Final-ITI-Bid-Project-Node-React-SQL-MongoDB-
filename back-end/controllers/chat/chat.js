// controllers/chat/chat.controller.js

class ChatController {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }

    async saveMessage(userId, message) {
        return this.chatRepository.saveMessage(userId, message);
    }

    async getMessages() {
        return this.chatRepository.getMessages();
    }
}

module.exports = ChatController;
