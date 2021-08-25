//import the gql tagged template function
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Bike {
    _id: ID
    userId: String
    brand: String
    bike_model: String
    year: String
    serial: String
    description: String
    image: String
    status: [Status]
    messages: [Message]
  }

  type Status {
    _id: ID
    isLost: Boolean
    location: String
    date: String
  }

  
  type Checkout {
    session: ID
  }
  
  type Message {
    _id: ID
    messageBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    bikeCount: Int
    bikes: [Bike]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    bikes: [Bike]
    user: User
    users: [User]
    bike(_id: ID!): Bike
    userBikes(userId: String): [Bike]
    lostBikes(location: String): [Bike]
    checkout: Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBike(
      brand: String
      bike_model: String
      year: String
      serial: String
      description: String
      image: String
    ): Bike
    updateUser(email: String, password: String): User
    updateBike(
      bikeId: ID!
      brand: String
      bike_model: String
      year: String
      serial: String
      description: String
      image: String
    ): Bike
    updateStatus(bikeId: ID!, isLost: Boolean, location: String): Bike
    deleteBike(bikeId: ID!): User
    login(username: String!, password: String!): Auth
    addMessage(bikeId: ID!, messageBody: String!): Bike
  }

`;

module.exports = typeDefs;
