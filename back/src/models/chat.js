import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
    // user: {
    //     _id: mongoose.Types.ObjectId,
    //     username: String,
    // }
    room: {
        type: String,
        require: true,
    },
    user: {
        type: String,
        require: true,
    },
    message: String,
    messageImg: String,
    messageDate: {
        type: Date,
        default: Date.now,
    },
});

const Chatting = mongoose.model('Chatting', ChatSchema);
export default Chatting;