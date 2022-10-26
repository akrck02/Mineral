import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true, 
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    asignedColaborator: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    status: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date
    }
},
{
    timeStamp: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;