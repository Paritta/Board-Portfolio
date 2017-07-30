var mongoose = require('mongoose');
const Schema = mongoose.Schema

var Board = new Schema({
    title: String,
    description: String,
    author: String,
    createdAt: {type:Date, default:Date.now}
});

Board.statics.create = function(title, description, author) {
    const board = new this({
        title,
        description,
        author
    })
    return board.save()
}

Board.statics.findOneByUsername = function(title) {
    return this.findOne({
        title
    }).exec()
}

module.exports = mongoose.model('Board', Board);