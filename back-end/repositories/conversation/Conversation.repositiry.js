const Conversation = require('../../models/Conversation/conversation.model');

class ConversationRepository {
    constructor() { }

    async getConversationByParticipants(participantId) {
        return await Conversation.find({ participants: { $in: [participantId] } })
          .populate('participants')
          .populate('messages')
          .exec();
      }

    async getAllConversations() {
        return Conversation.find();
    }
}

module.exports = ConversationRepository;
