const router = require('express').Router()
const task = require('../controller/tasks')

router.get('/', task.alltasks)

router.get('/addtask', task.addtask)

router.get('/search', task.search)

router.get('/edit/:_id', task.edit)

router.get('/editTask/:_id', task.editTask)

router.get('/delete', task.delete)

router.get('/status/:_id', task.status)

router.get('/newtask', task.newtask)

router.get('/del/:_id', task.del)

router.get('/show/:_id', task.show)

module.exports = router