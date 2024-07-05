class ConversationController {
    constructor(ConversationRepository) {
        this.ConversationRepository = ConversationRepository;
    }
  
    async getConversationsForUser(req, res) {
        try {
            const { sender } = req.body;
            // const senderId = mongoose.Types.ObjectId(sender);
            // const receiverId = mongoose.Types.ObjectId(receiver);
            const conversations = await this.ConversationRepository.getConversationByParticipants( sender );
            res.status(200).json(conversations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
  
    async deleteConversation(req, res) {
        try {
            const conversationId = req.params.ConversationId;
            await this.ConversationRepository.deleteConversation(conversationId);
            res.status(200).json({ Conversation: 'Conversation deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ConversationController;
