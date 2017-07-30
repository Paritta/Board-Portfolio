const Board = require('../../../models/board')
const board = new Board();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch')

exports.index = (req, res) => {

    const username = req.decoded.username;
    localStorage.setItem('username', username);
    
    Board.find((err, boards) => {
        if (err) {
            res.send(err)
        }
        res.render('index', {
            boards: boards,
            username: username
        });
    })
}

exports.detail = (req, res) => {
    var id = req.params.id;
    Board.findById(id, (err, boards) => {
        if (err) {
            res.send(err);
        }
        res.render('detail', {
            boards: boards
        })
    })
}

exports.add = (req, res) => {
    res.render('add')
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Board.findByIdAndRemove(id, (err, blogs) => {
        if (err) {
            res.send(err);
        }
        res.redirect(`/api/post/index?token=${localStorage.getItem('token')}`);
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const { title, description } = req.query;

    Board.update({_id:id}, {$set: { title: title, description: description }}, (err) => {
        if (err) throw err;        
        res.redirect(`/api/post/index?token=${localStorage.getItem('token')}`);
    })
}

exports.updatePage = (req, res) => {
    var id = req.params.id;

    const {
        title,
        description
    } = req.body
    
    Board.findById(id, (err, boards) => {
        if (err) {
            res.send(err);
        }
        res.render('updatePage', {
            id: id,
            title: boards.title,
            description: boards.description
        })
    })
}

exports.write = (req, res) => {
    const {
        title,
        description
    } = req.body

    const username = localStorage.getItem('username');
    
    const create = (board) => {
        if (board) {
            throw new Error('username exits')
        } else {
            res.redirect(`/api/post/index?token=${localStorage.getItem('token')}`);
            return Board.create(title, description, username)
        }
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    Board.findOneByUsername(title)
        .then(create)
        .catch(onError)
}