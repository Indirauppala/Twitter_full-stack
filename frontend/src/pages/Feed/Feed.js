import React, { useEffect, useState } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";
import Post from './Posts/Post'

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/post')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched posts:', data);
                setPosts(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {posts.map(p => <Post key={p.id} p={p} />)}
        </div>
    );
}

export default Feed;
