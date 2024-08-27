import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);

    const createPost = (e) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        if (image) {
            formData.append('image', image); // Append the file object
        }

        // Send the form data
        fetch('http://localhost:4001/create/post', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            console.log('Success:', data);
            setRedirect(true); // Trigger redirect
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]); // Get the file object
        }
    };

    useEffect(() => {
        if (redirect) {
            // Redirect to home page if redirect is true
        }
    }, [redirect]);

    return (
        <div>
            {redirect && <Navigate to='/' />}
            <form onSubmit={createPost}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                />
                <textarea
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
