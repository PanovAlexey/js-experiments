const MongooseCountry = require(`../models/country`);
const MongooseRegion = require(`../models/region`);
const MongooseUser = require(`../models/user`);
const MongooseEventType = require(`../models/event_type`);
const MongooseEvent = require(`../models/event`);

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull} = require(`graphql`);

const CountryType = new GraphQLObjectType({
    name: `CountryType`,
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
    })
});

const RegionType = new GraphQLObjectType({
    name: `Region`,
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        country: {
            type: CountryType,
            resolve(parent, args) {
                return MongooseRegion.findById(parent.country);
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: `Event`,
    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        event_type: {
            type: EventTypeType,
            resolve(parent, args) {
                return MongooseEventType.findById(parent.event_type);
            }
        },
        author: {
            type: UserType,
            resolve(parent, args) {
                return MongooseUser.findById(parent.author);
            }
        },
        region: {
            type: RegionType,
            resolve(parent, args) {
                return MongooseRegion.findById(parent.region);
            }
        },
    })
});

const EventTypeType = new GraphQLObjectType({
    name: `EventType`,
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
    })
});

const UserType = new GraphQLObjectType({
    name: `User`,
    fields: () => ({
        id: {type: GraphQLID},
        first_name: {type: new GraphQLNonNull(GraphQLString)},
        last_name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return MongooseEvent.find({author: parent.id});
            },
        },
        country: {
            type: CountryType,
            resolve(parent, args) {
                return MongooseCountry.find({country: parent.id});
            }
        },
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        country: {
            type: CountryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseCountry.findById(args.id);
            }
        },
        region: {
            type: RegionType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseRegion.findById(args.id);
            }
        },
        event: {
            type: EventType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseEvent.findById(args.id);
            }
        },
        eventType: {
            type: EventTypeType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseEventType.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseUser.findById(args.id);
            }
        },
        counrties: {
            type: new GraphQLList(CountryType),
            resolve(parent, args) {
                return MongooseCountry.find({});
            }
        },
        regions: {
            type: new GraphQLList(RegionType),
            resolve(parent, args) {
                return MongooseRegion.find({});
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return MongooseEvent.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return MongooseUser.find({});
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: `Mutation`,
    fields: {
        addCountry: {
            type: CountryType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const country = new MongooseCountry({
                    name: args.name,
                });

                return country.save();
            }
        },
        addRegion: {
            type: RegionType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                country: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const region = new MongooseRegion({
                    name: args.name,
                    country: args.country
                });

                return region.save();
            }
        },
        addEvent: {
            type: EventType,
            args: {
                created_at: {type: new GraphQLNonNull(GraphQLString)},
                event_type: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: new GraphQLNonNull(GraphQLString)},
                region: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const event = new MongooseEvent({
                    created_at: args.created_at,
                    event_type: args.event_type,
                    author: args.author,
                    region: args.region,
                });

                return event.save();
            }
        },
        deleteCountry: {
            type: CountryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseCountry.findByIdAndRemove(args.id);
            }
        },
        deleteRegion: {
            type: RegionType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseRegion.findByIdAndRemove(args.id);
            }
        },
        deleteEvent: {
            type: EventType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseEvent.findByIdAndRemove(args.id);
            }
        },
        updateEvent: {
            type: EventType,
            args: {
                id: {type: GraphQLID},
                created_at: {type: GraphQLString},
                event_type: {type: GraphQLString},
                author: {type: GraphQLString},
                region: {type: GraphQLString},
            },
            resolve(parent, args) {
                return MongooseEvent.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            created_at: args.created_at,
                            event_type: args.event_type,
                            author: args.author,
                            region: args.region,
                        }
                    },
                    {new: true},
                );
            },
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});