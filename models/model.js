const mongoose = require('mongoose')

const ModelSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, "Please enter the task title"] },
        description: { type: String, required: false },
        priority: { type: String, required: true },
        status: { type: String, required: true }
    }
)

const Task = mongoose.model('Task', ModelSchema)

module.exports = Task