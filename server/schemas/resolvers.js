const { AuthenticationError } = require("apollo-server-express");
const { User, Bike } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    bikes: async () => {
      return await Bike.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          populate: "bikes",
        });

        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addBike: async (parent) => {},
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    addComment: async (parent, { bikeId, commentBody }, context) => {
      if (context.user) {
        const updatedBike = await Bike.findOneAndUpdate(
          { _id: bikeId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

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
  },
};

module.exports = resolvers;
