var mongoose = require('mongoose');
const Schema = mongoose.Schema

var Board = new Schema({
    title: String,
    description: String,
    createdAt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Board', Board);