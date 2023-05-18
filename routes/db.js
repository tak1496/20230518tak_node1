const express = require('express');
const router = express.Router();

const ps = require('@prisma/client');
const prisma = new ps.PrismaClient();

router.get('/', async function (req, res, next) {
  const users = await prisma.user.findMany();
  const data = {
    title: 'Prisma',
    message: 'Userテーブルのレコード一覧',
    data: users
  }
  res.render('db', data);
});

router.post('/', async function (req, res, next) {
  const { name, email, age } = req.body
  await prisma.user.create({
    data: { name: name, email: email, age: parseInt(age) }
  });
  res.redirect('/db');
});

router.get('/edit/:id', async function (req, res, next) {
  const { id } = req.params;
  const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
  const data = {
    title: 'Prisma',
    message: 'ID = ' + id + ' のデータ更新。',
    user: user
  }
  res.render('edit', data);
});

router.post('/edit', async function (req, res, next) {
  const { id, name, email, age } = req.body;
  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name: name, email: email, age: parseInt(age) }
  });
  res.redirect('/db');
});

router.post('/delete/:id', async function (req, res, next) {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: parseInt(id) } });
  res.redirect('/db');
})
module.exports = router