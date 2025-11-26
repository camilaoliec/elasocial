import React, { useState, useEffect } from 'react'
import { fetchInstagramPosts } from '../../api/instagram';
import "./InstagramFeed.scss"
import InstagramVideoCard from './InstagramVideoCard';

const InstagramFeed = () => {
    
    const [posts, setPosts] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const maxIndex = posts.length - 4;  

    const handleNext = () => {
        if(currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1)
        }
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchInstagramPosts();
            setPosts(data)
        }
        getPosts();
    }, []);

  return (
    <div className="insta_container">
        <button className='insta_btn left' onClick={handlePrev} disabled={currentIndex === 0}>
            ◀
        </button>
        <div className='insta_feed'>
            <div className="insta_track" style={{transform: `translateX(-${currentIndex*334}px)`}}>
                {posts.map((post, index) => (
                    post.media_type === "VIDEO" ? (
                        <InstagramVideoCard 
                            key={index}
                            post={post} 
                            caption={post.caption} />
                    ) : (
                        <div key={index} className="insta_card">
                            <img 
                                src={post.media_url} 
                                alt={post.caption || 'Instagram post'}
                                style={{ width: "100%", height: "100%", objectFit: "container" }}
                            />
                        
                            {post.media_type === "CAROUSEL_ALBUM" && (
                                <span className="carousel-badge">▣</span>
                            )}
                            <div className="overlay">
                                <p className="caption">
                                    {post.caption.length > 350 
                                        ? post.caption.substring(0, 350) + "..." 
                                        : post.caption}
                                </p>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
        <button className='insta_btn right' onClick={handleNext} disabled={currentIndex === maxIndex}>
            ▶
        </button>
    </div>
  )
}

export default InstagramFeed
