import mongoose from 'mongoose';

const connectMongoDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    }catch(error){
        console.log(error)
    }
};

export default connectMongoDb;