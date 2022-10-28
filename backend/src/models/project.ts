import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: false
    },
    colaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    timestamp: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;