import ChatSupportModel from "../models/chat-support-model.js";

class ChatSupportService {
    async getAllUsers() {
        try {
            const users = await ChatSupportModel.findAll();
            return { success: true, data: users };
        } catch (error) {
            console.error("Error in getAllRatingObject:", error);
            return { success: false, error: "Failed to get ratings" };
        }
    }
    async saveMessage(userId, msg) {
        try {
            const res = await ChatSupportModel.findOne({ where: {  userId } });
            const newMsgUser = res.dataValues.newMsgUser
            console.log("user", res.dataValues.newMsgUser);
            const user = await ChatSupportModel.update({ messages: msg, newMsgUser: newMsgUser + 1 }, { where: { userId} });
            return { success: true, data: user };
        } catch (error) {
            console.error("Error in getAllRatingObject:", error);
            return { success: false, error: "Failed to get ratings" };
        }
    }
    async viewMessage(userId) {
        try {
            const user = await ChatSupportModel.update({ newMsgSupport: 0 }, { where: { userId} });
            return { success: true, data: user };
        } catch (error) {
            console.error("Error in getAllRatingObject:", error);
            return { success: false, error: "Failed to get ratings" };
        }
    }
    async newDialogue(dialogue) {
        try {
            await ChatSupportModel.create(dialogue);
            return { success: true, message: "Dialogue created successfully" };
        } catch (error) {
            console.error("Error in createRatingObject:", error);
            return { success: false, error: "Failed to create rating" };
        }
    }
    async deleteDialogue(userId) {
        try {
            const msg = JSON.stringify([])
            await ChatSupportModel.update(msg, {where: {userId: userId}});
            return { success: true, message: "Dialogue  delete successfully" };
        } catch (error) {
            console.error("Error in createRatingObject:", error);
            return { success: false, error: "Failed to create rating" };
        }
    }
}

export default new ChatSupportService()


