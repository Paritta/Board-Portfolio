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

exports.write = (req, res) => {
    const { title, description } = req.body
    
    const create = (board) => {
        if(board) { 
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

    // var title = req.body.title;
    // var description = req.body.description;

    // board.title = title;
    // board.description = description;

    // board.save((err) => {
    //     if (err) console.log('duplicate!!!');
    //     res.redirect('/api/post/index');
    // })
}