const express = require('express');
let connection = require('../db/database.js');

const User = require('./../model/user.js');
const router = express.Router();

let auth = function (req, res, next) {
    if (req.session)
        return next();
    else
        return res.sendStatus(401);
};

function asyncWrap(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};


router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/not-found', (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
});


router.post('/registration', asyncWrap(async (req, res) => {
    console.log("session: " + req.session);

    res.setHeader('Content-Type', 'application/json');
    
    let user = await User.findUser(req.body.email);

    if (user) {
        res.status(200).json({warning: 'Пользователь с таким email уже существует!'});
    } else {

        let newUser = new User(req.body.email, req.body.password, 5);
        try {
            await newUser.addUser();
        } catch(err){
            console.log(err);
        }  
        res.status(200).json({ redirect: '/login' });
    }
}));

router.post('/login', asyncWrap(async (req, res) => {
    console.log("session: " + req.session);

    let user = await User.findUser(req.body.email);

    if (user) {
        if (user.password == req.body.password) {
            req.session.user = user;
            res.status(200).json({ redirect: '/' });
        } else {
            res.status(200).json({ warningPassword: 'Неверный пароль' });
        }
    } else {
        res.status(200).json({ warningEmail: 'Неверный email' });
    }

}));

router.post('/add-new-order', (req, res) => {
    console.log("server add-new-order");
    res.json({ isIFrame: true });
});

router.get('/add-new-product', (req, res) => {
    res.status(200).json(true);
});

router.get('/information', auth, function (req, res) {
    console.log("user: " + req.session.user);

    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {

        res.status(401).json({error: '401'});
    }
    
});

router.get('/isloggedin', auth, asyncWrap( async function (req, res) {
    console.log("user: " + req.session.user);
    
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(200).json(false);
    }

}));

router.get('/logout', function (req, res) {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
});



module.exports = router;