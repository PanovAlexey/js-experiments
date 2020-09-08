const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    created_at: String,
    event_type: String,
    author: String,
    region: String,
});

module.exports = mongoose.model('Event', eventSchema);