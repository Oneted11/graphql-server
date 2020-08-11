const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
// schema definition
const typeDefs = "./src/schema.graphql";
//dummy data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

// resolvers for requests
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let theLink = links.find((item, index) => item.id === args.id);
      let lIndex = links.indexOf(theLink);
      const link = {
        id: theLink.id,
        description: args.description,
        url: args.url,
      };
      links.splice(lIndex, 1, link);
    },
    deleteLink: (parent, args) => {
      let theLink = links.find((item, index) => item.id === args.id);
      let lIndex = links.indexOf(theLink);
      links.splice(lIndex, 1);
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers, context: { prisma } });
server.start(() => {
  console.log(`server is running on http://localhost:4000`);
});
