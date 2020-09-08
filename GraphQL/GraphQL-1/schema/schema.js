const MongooseCountry = require(`../models/country`);
const MongooseRegion = require(`../models/region`);
const MongooseUser = require(`../models/user`);
const MongooseEventType = require(`../models/event_type`);
const MongooseEvent = require(`../models/event`);

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList} = require(`graphql`);

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