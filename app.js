const express = require('express')
const mongoose = require('mongoose')
const model = require('./models/model')
const path = require('path')

const app = express()
 
app.use(express.json())

//set view engine
app.set('view engine', 'ejs')

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//routes

app.get('/', (req,res)=>{
//  res.send('Hello Task Manager')
    res.render('index.ejs')
})

app.get('/add-task', (req,res)=>{
    res.render('add_task.ejs')
})

app.get('/update-task', (req,res)=>{
    res.render('update_task.ejs')
})

app.post('/addtask', async (req,res)=>{
    try {
        const addtask = await model.create(req.body)
        res.status(200).json(addtask)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.get('/gettask', async(req,res)=>{
    try {
        const gettask = await model.find({})
        res.status(200).json(gettask)
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
})

app.get('/gettask/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const gettask = await model.findById(id)
        if(!gettask){
            return res.status(404).json({message: `cannot find data with ID ${id}`}) 
        }
        res.status(200).json(gettask)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.put('/updatetask/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const updatetask = await model.findByIdAndUpdate(id, req.body)
        //can not find task
        if(!updatetask){
            return res.status(404).json({message: `cannot find task with ID ${id}`})
        }
        const updatedtask = await model.findById(id)
        res.status(200).json(updatedtask)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.delete('/deletetask/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const deletetask = await model.findByIdAndDelete(id)
        //can not find task
        if(!deletetask){
            return res.status(404).json({message: `cannot find task with ID ${id}`})
        }res.status(200).json(deletetask)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})



mongoose.connect('mongodb+srv://admin:admin123@cluster0.lpufeos.mongodb.net/taskmanager?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
        console.log('Server Started on port 3000')
    })
    console.log('connected successfully....')
}).catch((error)=>{
    console.log(error)
})