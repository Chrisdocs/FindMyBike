const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const statusSchema = require('./Status');
const Message = require('./Message');

const bikeSchema = new Schema(
    {
        userId: {
            type: String,
        },
        brand: {
            type: String,
        },
        bike_model: {
            type: String,
        },
        year: {
            type: String
        },
        serial: {
            type: String
        },
        description: {
            type: String,
            required: true,
            minLength: 1
        },
        image: {
            type: String
        },
        status: [statusSchema],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message'
            }
        ],
    }
);

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
