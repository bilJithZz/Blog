const express = require('express');
const router = express.Router();
const Blog = require('../Model/BlogModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



router.post('/post', upload.single('image'), async (req, res) => {
    try {
        const file = req.image;
        const { title, summary, content } = req.body;

        // Validate request
        if (!title || !summary || !content) {
            return res.status(400).json({ message: 'Title, summary, and content are required' });
        }

        // const filePath = file ? file: null;

        // Create a new blog post
        const newPost = new Blog({
            title,
            summary,
            file,
            content,
            // author: req.user.id  
        });

        await newPost.save(); 

        res.status(201).json({ message: 'Post is created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//to get post
router.get('/blog',async(req,res)=>{
    try{
        const blogs=await Blog.find()
        res.status(200).json(blogs)
    }catch(err){
        res.status(405).json(err)
    }
})


// Route to get a blog post by ID
router.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const findBlog = await Blog.findById(id); 

        if (!findBlog) {
            return res.status(404).json({ message: 'Blog not found' }); 
        }

        res.status(200).json(findBlog);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

module.exports = router;
