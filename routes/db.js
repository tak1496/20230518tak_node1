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

module.exports = router