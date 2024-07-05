
const Conversation = require('../../models/Conversation/conversation.model');


class MessageController {
  constructor(MessageRepository) {
      this.MessageRepository = MessageRepository;
  }

  async createMessage(senderId, receiverId, content) {
    const message = await this.MessageRepository.createMessage(senderId, receiverId, content)
    return message
}

  async getMessagesForUser(req, res) {
      try {
        const {sender,receiver } = req.body;
        const messages = await this.MessageRepository.getMessagesForUser(sender,receiver);
          res.status(200).json(messages);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  async deleteMessage(req, res) {
      try {
          const messageId = req.params.messageId;
          await this.MessageRepository.deleteMessage(messageId);
          res.status(200).json({ message: 'Message deleted' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
}

module.exports = MessageController;
