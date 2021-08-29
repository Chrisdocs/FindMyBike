const { AuthenticationError } = require("apollo-server-express");
const { User, Bike, Message } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        bikes: async () => {
            return await Bike.find();
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .select("-__v")
                    .populate({path: "bikes", populate: {path: "messages"}});
                return user;
            }
            throw new AuthenticationError("Not logged in");
        },
        users: async () => {
            return User.find().select("-__v").populate("bikes");
        },
        userBikes: async (parent, args, context) => {
            if (context.user) {
                const bikeList = await Bike.find({ userId: context.user._id });

                return bikeList;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        lostBikes: async (parent, args, context) => {
            // console.log("lostBike args:", args)
            // fetch all bikes and set equal to a variable
            const bikes = await Bike.find({});
            // need to filter out the lost bikes and set to a variable
            const lostBikes = bikes.filter(
                (bike) => bike.status.length !== 0 && bike.status[0].isLost
            );
            // return the lost bikes
            return lostBikes;
            // }
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;


            //generate product id
            const product = await stripe.products.create({
                name: "Donation",
                description: "Donation to BikeSleuth team for their continued efforts to help reunite owners with their lost and stolen bikes"
            });

            //generate price id using product id
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: 500,
                currency: 'usd'
            });

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                ],
                payment_method_types: ["card"],
                mode: "payment",
                success_url: `${url}/#/Success?session_id={CHECKOUT_SESSION_ID}/`,
                cancel_url: `${url}/`,
            });
            return { session: session.id };
        },
        bike: async ( parent, { _id }) => {
            return Bike.findOne({ _id }).populate('message');
        },
        userMessages: async (parent, args, context) => {
            if (context.user) {
                const messages = await Message.find({username: context.user.username});
                return messages;
            }
        },
        message: async (parent, { messageId }, context) => {
            if (context.user) {
                const message = await Message.findOne({ _id: messageId});
                return message;
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log(args);
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addBike: async (parent, args, context) => {
            if (context.user) {
                const bike = await Bike.create(args);

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { bikes: bike._id } },
                    { new: true }
                );

                await Bike.findByIdAndUpdate(
                    { _id: bike._id },
                    { userId: context.user._id },
                    { new: true }
                );

                return bike;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        updateBike: async (
            parent,
            { bikeId, description, image, brand, bike_model, year, serial },
            context
        ) => {
            if (context.user) {
                const updatedBike = await Bike.findByIdAndUpdate(
                    { _id: bikeId },
                    {
                        description: description,
                        image: image,
                        brand: brand,
                        bike_model: bike_model,
                        year: year,
                        serial: serial,
                    },
                    { new: true }
                );

                return updatedBike;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        deleteBike: async (parent, { bikeId }, context) => {
            if (context.user) {
                Bike.findOneAndDelete({ _id: bikeId }, function (err, docs) {
                    if (err) {
                        console.log("delete err", err);
                    } else {
                        console.log("deleted bike", bikeId);
                    }
                });

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { bikes: bikeId } },
                    { new: true }
                ).populate("bikes");

                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        updateStatus: async (parent, { bikeId, isLost, location }, context) => {
            if (context.user) {
                const updatedBike = await Bike.findByIdAndUpdate(
                    { _id: bikeId },
                    { status: { isLost: isLost, location: location } },
                    { new: true }
                );

                return updatedBike;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                const saltRounds = 10;
                const updatedPassword = await bcrypt.hash(args.password, saltRounds);

                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { password: updatedPassword },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError("Not logged in");
        },
        addMessage: async (parent, { bikeId, messageBody }, context) => {
            if (context.user) {
                const message = await Message.create({ messageBody, username: context.user.username });
                const updatedBike = await Bike.findOneAndUpdate(
                    { _id: bikeId },
                    { $push: { messages: message._id } },
                    { new: true, runValidators: true }
                ).populate('messages');

                return updatedBike;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        deleteMessage: async (parent, { bikeId, messageId }, context) => {
            if (context.user) {
                Message.findOneAndDelete({ _id: messageId }, function(err, docs) {
                    if (err) {
                        console.log("delete err", err);
                    } else {
                        console.log("deleted message", messageId);
                    }
                });

                const updatedBike = await Bike.findOneAndUpdate(
                    { _id: bikeId },
                    { $pull: { messages: messageId } },
                    { new: true }
                )
            }
        },
        addReply: async (parent, { messageId, replyBody }, context) => {
            if (context.user) {
                const updatedMessage = await Message.findOneAndUpdate(
                    { _id: messageId },
                    { $push: { replies: { replyBody, username: context.user.username } } },
                    { new: true}
                ).populate('replies');

                return updatedMessage;
            }
        }        
    },
};

module.exports = resolvers;
