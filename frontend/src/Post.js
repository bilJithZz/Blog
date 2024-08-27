import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = () => {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4001/create/blog");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="blog">
      <Link className='link' to='/detailPost'>
        <div className='blogpost'>
          {posts.map((post, key) => (
            <div key={key} className="post">
              <img src={post.file} alt="img" />
              <h6>{post.summary}</h6>
              <p>{post.content}</p>
            </div>
          ))}
          {/* Static content */}
          <div className="post">
            <img src="https://images.ctfassets.net/lzny33ho1g45/best-blog-sites-p-img/2bd18ac572f84c2984908d924d4613f3/blogging.jpg?w=1520&fm=avif&q=30&fit=thumb&h=760" alt="img" />
            <h3>This is Image of the above domain</h3>
            <p>This is Image of the above domainThis is Image of the above domainvvThis is Image of the above domainThis is Image of the above domainThis is Image of the above domainThis is Image of the above domain</p>
          </div>
          {/* Add more static content if needed */}
        </div>
      </Link>
    </div>
  );
}

export default Post;
