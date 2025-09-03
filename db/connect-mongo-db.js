const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb+srv://ignaciovargas_db_user:wQerVF3j4e7qRmhb@cluster0.wgcuycy.mongodb.net/INVENTORY-BK?retryWrites=true&w=majority&appName=Cluster0'
        await mongoose.connect(url);

        console.log('MongoDB connected');
        
    }  catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
module.exports = {
    getConnection
};
