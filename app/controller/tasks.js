const { ObjectId } = require('mongodb')
const taskmongo = require('../../models/mongodb')
const task = 'models/user.json'
const deal = require('../helper/deal-json')
class tasks {
    static alltasks = async (req, res) => {
        try {
            await taskmongo.client.connect()
            const newtasks = await taskmongo.accCollection.find().toArray()
            taskmongo.client.close()
            res.render('alltasks', { pageTitle: 'alltasks', newtasks })
        } catch (err) { console.log(err); }
    }

    static search = async (req, res) => {
        try {
            const text = req.query
            await taskmongo.client.connect()
            const search = await taskmongo.accCollection.find(text).toArray()
            console.log(text);
            taskmongo.client.close()
            res.render('search', { pageTitle: 'search', search })
        } catch (err) { console.log(err) }
    }

    static delete = async (req, res) => {
        try {
            await taskmongo.client.connect()
            await taskmongo.accCollection.deleteMany()
            taskmongo.client.close()
            res.redirect('/')
        } catch (e) {
            res.send(e)
        }
    }

    static addtask = (req, res) => {
        res.render('addtask', { pageTitle: 'add' })
        console.log('******');
    }

    static newtask = async (req, res) => {
        try {
            await taskmongo.client.connect()
            await taskmongo.accCollection.insertOne({
                status: 'false',
                addedDate: new Date(),
                ...req.query,
            })
            taskmongo.client.close()
            res.redirect('/')
        } catch (e) {
            console.log(e);
        }
    }

    static del = async (req, res) => {
        try {
            const _id = req.params._id
            await taskmongo.client.connect()
            await taskmongo.accCollection.deleteOne({ '_id': ObjectId(_id) })
            taskmongo.client.close()
            res.redirect('/')
        } catch (e) { console.log(e); }
    }

    static show = async (req, res) => {
        try {
            const _id = req.params._id
            await taskmongo.client.connect()
            const showtask = await taskmongo.accCollection.findOne({ _id: new ObjectId(_id) })
            taskmongo.client.close()
            res.render('show', { showtask })
        } catch (e) { console.log(e); }
    }

    static status = async (req, res) => {
        try {
            const id = req.params._id
            await taskmongo.client.connect()
            const showtask = await taskmongo.accCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status: "true" } })
            taskmongo.client.close()
            res.redirect('/')
        } catch (e) { console.log(e); }
    }

    static edit = async (req, res) => {
        try {
            const _id = req.params._id
            await taskmongo.client.connect()
            const editTask = await taskmongo.accCollection.findOne({ _id: new ObjectId(_id) })
            taskmongo.client.close()
            res.render('edit', { editTask })
        } catch (e) { console.log(e); }
    }

    static editTask = async (req, res) => {
        try {
            const id = req.params._id
            await taskmongo.client.connect()
            const showtask = await taskmongo.accCollection.updateOne({ _id: new ObjectId(id) }, { $set: req.query })
            taskmongo.client.close()
            res.redirect('/')
        } catch (e) { console.log(e); }
    }
}

module.exports = tasks