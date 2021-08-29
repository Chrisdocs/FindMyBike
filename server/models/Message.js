const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const replySchema = require("./Reply");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
    {
        messageBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        replies: [replySchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

messageSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Message = model('Message', messageSchema);

module.exports = Message;