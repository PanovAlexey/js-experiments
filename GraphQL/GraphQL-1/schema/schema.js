const graphql = require(`graphql`);

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const EventType = new GraphQLObjectType({
    name: `Event`,
    fields: () => ({
        id: {type: GraphQLString},
        created_at: {type: GraphQLString},
        event_type: {type: GraphQLString},
        author_id: {type: GraphQLString},
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        event: {
            type: EventType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {

            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});