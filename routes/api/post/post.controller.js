const Board = require('../../../models/board')

exports.routing = (req, res) => {
    res.render('index')
}

exports.add = (req, res) => {
    res.render('add')
}

exports.write = (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    console.log(title);

    var board = new Board();

    board.title = title;
    board.description = description;

    board.save((err)=>{
    if(err) return handleError(err);
    console.log('save ok!!!');
    res.redirect('/api/post/main');
  })
}