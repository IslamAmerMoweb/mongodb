const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')

const static = path.join(__dirname, '../resources/puplic')
const dir = path.join(__dirname, '../resources/views')
const partial = path.join(__dirname, '../resources/layouts')
const route = require('./routes/router.routes')

app.use(express.static(static))
app.set('view engine', 'hbs')
app.set('views', dir)
hbs.registerPartials(partial)

app.use(express.urlencoded({ extended: true }))
app.use(route)

app.get('*', (req, res) => {
    res.render('error', { pageTitle: 'error' })
})

module.exports = app