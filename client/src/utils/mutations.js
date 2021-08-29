import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($email: String!, $password: String!) {
    updateUser(email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const ADD_BIKE = gql`
  mutation addBike(
    $brand: String
    $bike_model: String
    $year: String
    $serial: String
    $description: String
    $image: String
  ) {
    addBike(
      brand: $brand
      bike_model: $bike_model
      year: $year
      serial: $serial
      description: $description
      image: $image
    ) {
      _id
      brand
      bike_model
      year
      serial
      description
      image
      status {
        isLost
        location
        date
      }
    }
  }
`;

export const UPDATE_BIKE = gql`
  mutation updateBike(
    $bikeId: ID!
    $description: String
    $image: String
    $brand: String
    $bike_model: String
    $year: String
    $serial: String
  ) {
    updateBike(
      bikeId: $bikeId
      description: $description
      image: $image
      brand: $brand
      bike_model: $bike_model
      year: $year
      serial: $serial
    ) {
      _id
      brand
      bike_model
      year
      serial
      description
      image
      status {
        isLost
        location
        date
      }
    }
  }
`;

export const DELETE_BIKE = gql`
  mutation deleteBike($bikeId: ID!) {
    deleteBike(bikeId: $bikeId) {
      _id
      bikeCount
      bikes {
        _id
        brand
        bike_model
        year
        serial
        description
        image
        status {
          isLost
          location
          date
        }
        messages {
          username
          messageBody
          createdAt
        }
      }
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateStatus($bikeId: ID!, $isLost: Boolean, $location: String) {
    updateStatus(bikeId: $bikeId, isLost: $isLost, location: $location) {
      _id
      brand
      bike_model
      serial
      description
      image
      status {
        isLost
        location
        date
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
    mutation addMessage($bikeId: ID!, $messageBody: String!) {
        addMessage(bikeId: $bikeId, messageBody: $messageBody) {
            _id
            brand
            bike_model
            description
            status {
                isLost
                location
                date
            }
            messages {
                _id
                messageBody
                createdAt
                replyCount
                username
            }
      }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($messageId: ID!, $replyBody: String!) {
    addReply(messageId: $messageId, replyBody: $replyBody) {
      _id
      messageBody
      username
      replyCount
      createdAt
      replies {
        _id
        replyBody
        username
        createdAt
      }
    }
  }
`;