import { gql } from "@apollo/client";

// for testing purposes with seed data
export const QUERY_USERS = gql`
    {
        users {
            username
            password
            email
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
                    _id
                    username
                    messageBody
                    createdAt
                }
            }
        }
    }
`;

export const QUERY_USER = gql`
    {
        user {
            username
            email
            bikeCount
            bikes {
                _id
                userId
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
                    _id
                    username
                    messageBody
                    createdAt
                    replyCount
                    replies {
                        _id
                        username
                        replyBody
                        createdAt
                    }
                }
            }
        }
    }
`;

export const QUERY_ALL_BIKES = gql`
    {
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
                _id
                username
                messageBody
                createdAt
                replyCount
            }
        }
    }
`;

export const QUERY_USER_BIKE = gql`
    {
        userBikes {
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
                _id
                username
                messageBody
                createdAt
                replyCount
            }
        }
    }
`;

export const QUERY_LOST_BIKES = gql`
    {
        lostBikes {
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

export const QUERY_CHECKOUT = gql`
    query checkout {
        checkout{
            session
        }
    }
`;

export const QUERY_BIKE_MESSAGES = gql`
    query bike($id: ID!) {
        bike(_id: $bikeId) {
            _id
            messages {
                _id
                username
                messageBody
                createdAt
                replyCount
                replies {
                    _id
                    username
                    replyBody
                    createdAt
                }
            }
        }
    }
`;

export const QUERY_MESSAGES_FROM_USER = gql`
    {
        userMessages {
            _id
            messageBody
            createdAt
            replyCount
            replies {
                _id
                replyBody
                username
                createdAt
            }
        }
    }
`;

export const QUERY_MESSAGE = gql`
    query message ($messageId: ID!) {
        message (messageId: $messageId) {
            _id
            messageBody
            createdAt
            replyCount
            replies {
                _id
                replyBody
                username
                createdAt
            }
        }
    }
`;