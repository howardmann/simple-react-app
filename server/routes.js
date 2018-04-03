let router = require('express').Router()

router
  .get('/', (req, res, next) => {
    res.json({
      status: 'ok'
    })
  })
  .get('/ping', (req, res, next) => {
    res.status(200).json({
      result: true,
      data: 'pong'
    })
  })
  .post('/user/add', (req, res, next) => {
    console.log('req.body:', req.body)
    setTimeout(() => res.status(200).json({result: true}), 2000)
  })


module.exports = router