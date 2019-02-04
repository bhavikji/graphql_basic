const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full stack tutorial for graphql'
}];
let idCount = links.length;

const resolvers = {
    Query: {
        info: () => 'This is the API of hackernews Clone',
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
            return link
        }
    },
};
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));