import React, { useState, useEffect } from 'react';
import { fetchInstagramPosts, fetchInstagramProfile } from '../../api/instagram';
import InstagramPostCard from './InstagramPostCard'; 
import InstagramLightbox from './InstagramLightbox';
import "./InstagramFeed.scss";

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = posts.length - 4;

  // 🔥 Busca posts + perfil
  useEffect(() => {
    const loadData = async () => {
      const postData = await fetchInstagramPosts();
      const profileData = await fetchInstagramProfile();
      setPosts(postData);
      setProfile(profileData);
    };
    loadData();
  }, []);

  const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = () => setLightboxIndex(prev => prev > 0 ? prev - 1 : posts.length - 1);
  const lightboxNext = () => setLightboxIndex(prev => prev < posts.length - 1 ? prev + 1 : 0);

  return (
    <div className="insta_container">
      <button className='insta_btn left' onClick={handlePrev} disabled={currentIndex === 0}>◀</button>

      <div className='insta_feed'>
        <div className="insta_track" style={{ transform: `translateX(-${currentIndex * 334}px)` }}>
          {posts.map((post, index) => (
            <InstagramPostCard 
              key={post.id || index} 
              post={post} 
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      <button className='insta_btn right' onClick={handleNext} disabled={currentIndex === maxIndex}>▶</button>

      {lightboxOpen && (
        <InstagramLightbox
          post={posts[lightboxIndex]}
          profile={profile} // 🔥 envia perfil como prop
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      )}
    </div>
  );
};

export default InstagramFeed;

