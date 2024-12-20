import mongoose from 'mongoose';


const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
   
},{timestamps:true})

const Topic=  mongoose.models.Topic || mongoose.model('Topic',topicSchema);
export default Topic;