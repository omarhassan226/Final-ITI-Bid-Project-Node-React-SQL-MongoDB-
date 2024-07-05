const Message = require('../../models/Messages/Messages.model');
const Conversation = require('../../models/Conversation/conversation.model');

class MessageRepository{
    constructor() { }
    async  createMessage(sender, receiver, content) {
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });
        if (!conversation) {
            conversation = new Conversation({
                participants: [sender, receiver]
            });
            await conversation.save();
        }
        const message = new Message({
            receiver: receiver,
            sender: sender,
            content: content
        });
        await message.save();
        conversation.messages.push(message._id);
        await conversation.save();
        return conversation;
    }
    

    async getMessagesForUser(sender, receiver) {
        return Message.find({
            $or: [
                { sender: sender },
                { receiver: sender }
            ]
        })
        .populate('sender', 'firstName lastName email')
        .populate('receiver', 'firstName lastName email');
    }
    

    async deleteMessage(messageId) {
        return Message.findByIdAndDelete(messageId);
    }
}


module.exports = MessageRepository;
