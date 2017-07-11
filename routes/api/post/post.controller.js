const Board = require('../../../models/board')
const board = new Board();


exports.index = (req, res) => {
    Board.find((err, boards) => {
        if (err) {
            res.send(err)
        }
        res.render('index', {
            boards: boards
        });
    })
}

exports.detail = (req, res) => {
    console.log(req.params.id);
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
        res.redirect('/api/post/index');
    })
}

exports.write = (req, res) => {
    const {
        title,
        description
    } = req.body

    const create = (board) => {
        if (board) {
            throw new Error('username exits')
        } else {
            res.redirect('/api/post/index');
            return Board.create(title, description)
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