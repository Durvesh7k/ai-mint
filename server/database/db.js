import mongoose from 'mongoose'

export const Connection = async (URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting to database")
    }
} 