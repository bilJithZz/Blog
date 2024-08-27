const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    summary: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true 
    },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User' 
    // }
});


const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog; 
