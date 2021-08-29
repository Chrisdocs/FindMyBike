const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        replyBody: {
            type: String,
            required: true,
            minLength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);

module.exports = replySchema;