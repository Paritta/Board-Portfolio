var mongoose = require('mongoose');
const Schema = mongoose.Schema

var Board = new Schema({
    title: String,
    description: String,
    createdAt: {type:Date, default:Date.now}
});

Board.statics.create = function(title, description) {
    const board = new this({
        title,
        description
    })
    return board.save()
}

Board.statics.findOneByUsername = function(title) {
    return this.findOne({
        title
    }).exec()
}

module.exports = mongoose.model('Board', Board);