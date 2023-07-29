import mongoose from 'mongoose'

const recordSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    account : {
        type: String,
        required: true
    }
})

const record = mongoose.model("records", recordSchema);

export default record;

