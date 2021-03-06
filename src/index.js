const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
// schema definition
const typeDefs = "./src/schema.graphql";
const prisma=new PrismaClient()
//dummy data
// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ];

// resolvers for requests
// let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: async (parent, args, context,info) => {
      return context.prisma.link.findMany()
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });
      return newLink;
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
