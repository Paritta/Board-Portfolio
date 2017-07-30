const jwt = require('jsonwebtoken')
const User = require('../../../models/user')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch')

exports.register = (req, res) => {
    const { username, password } = req.body
    
    let newUser = null

    const create = (user) => {
        if(user) { 
            throw new Error('username exits') 
        } else { 
            return User.create(username, password) 
        }
    }

    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            return Promise.resolve(false)
        }
    }

    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {
    const {username, password} = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
        // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // DB user, user.logger:true               
                User.update({_id:user.id}, {$set: { logged: true }}, (err) => {
                    if (err) throw err;        
                })

                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'tjdgns8047',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        console.log('confirm');
        
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
        res.redirect(`/api/post/index?token=${localStorage.getItem('token')}`);
        // res.json({
        //     message: 'logged in successfuly',
        //     token
        // })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

exports.signInPage = (req, res) => {
    res.render('signin')
}

exports.signUpPage = (req, res) => {
    res.render('signup')
}

exports.logout = (req, res) => {
    User.update({logged: true}, {$set: { logged: false }}, (err) => {
                if (err) throw err;        
            })
}