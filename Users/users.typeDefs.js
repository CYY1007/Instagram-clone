import { gql } from "apollo-server";

export default gql`
    type loginResult{
        token: String
        ok:Boolean!,
        error: String
    }
    type User{
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }
    type Mutation{
        createAccount(firstName:String!,lastName: String!,
        username: String!,email: String!, password: String!) : User!
        
        login(username:String!, password:String!): loginResult!
    }
    type Query{
        seeProfile(username:String!): User
    }
`