const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query:{
        hello: () => "Wolrd",
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(() => console.log("Server is running on http://localhost:4000/graphql 🚀"));
