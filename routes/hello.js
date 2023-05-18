const express = require('express');
const router = express.Router()

const db = [
  { name: 'taro', mail: 'taro@yamada' },
  { name: 'hanako', mail: 'hanako@flower' },
  { name: 'sachiko', mail: 'sachiko@happy' },
  { name: 'jiro', mail: 'jiro@change' },
];

router.get('/', function (req, res, next) {
  const data = {
    title: 'Hello!',
    message: 'フォームを入力して下さい',
    comments: req.session.comments
  }
  res.render('hello', data);
});

router.post('/', function (req, res, next) {
  req.session.comments.unshift(req.body.comment);
  const data = {
    title: 'Hello!',
    message: '※コメントの保存',
    comments: req.session.comments
  }
  res.render('hello', data);
});

router.post('/ajax', function (req, res, next) {
  const result = {
    id: req.body.id,
    pass: req.body.pass,
    message: 'こんにちは、' + req.body.id + 'さん！'
  }
  res.send(result);
});

module.exports = router;