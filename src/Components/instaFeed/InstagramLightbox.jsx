import React, { useState, useEffect, useCallback, useMemo } from 'react';
import arrow_left from '../../assets/arrow-left.svg';
import arrow_right from '../../assets/arrow-right.svg';
import './InstagramLightbox.scss';
import InstagramComments from './InstagramComments';

const InstagramLightbox = ({ post, profile, onClose, onPrev, onNext }) => {
  
  const [carouselIndex, setCarouselIndex] = useState(0); // para carrossel interno

  // Se a publicação for carousel
  const mediaItems = useMemo(() => {
    return post?.children?.data || (post ? [post] : []);
  }, [post]);
  console.log("Post ID:", post?.id);
  console.log("mediaItems (Carrossel ou item único):", mediaItems);
  console.log("mediaItems.length:", mediaItems.length);
  const handleCarouselNext = useCallback(() => {
      if (mediaItems.length === 0) return;
      setCarouselIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  }, [mediaItems.length]);

  const handleCarouselPrev = useCallback(() => {
    if (mediaItems.length === 0) return;
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  }, [mediaItems.length]);
    
    // Escuta teclas do teclado
  useEffect(() => {
    if (!post) return null;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      const isCarousel = mediaItems.length > 1;

      if (e.key === "ArrowLeft") {
        if (isCarousel) {
          handleCarouselPrev();
        } else {
          onPrev();
        }
      }
      if (e.key === "ArrowRight") {
        if (isCarousel) {
          handleCarouselNext();
        } else {
          onNext();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [post, onClose, onPrev, onNext, mediaItems.length, handleCarouselNext, handleCarouselPrev]);
  
    
  const currentMedia = mediaItems[carouselIndex];
  
  if (!post) return null;
  return (
    <div className="lightbox_overlay" onClick={onClose}>
      <div className="lightbox_container" onClick={(e) => e.stopPropagation()}>

        {/* Left: imagem ou vídeo */}
        <div className="lightbox_media" style={{ width: currentMedia.media_type === "VIDEO" ? "45%" : "50%" }}>
          {currentMedia.media_type === "VIDEO" ? (
            <video
              src={currentMedia.media_url}
              controls
              autoPlay
              className="lightbox_video"
            />
          ) : (
            <img
              src={currentMedia.media_url}
              alt={"Instagram post"}
              className="lightbox_img"
            />
          )}

          {/* Botões de carrossel dentro da mesma publicação */}
          {mediaItems.length > 1 && (
            <>
              {console.log("Clicou: render botões carrossel", mediaItems.length, "itens")}
              <button className="lightbox_carousel_nav left" onClick={() => {
              console.log("Clicou: handleCarouselPrev");
              handleCarouselPrev();
            }} >◀</button>
              <button className="lightbox_carousel_nav right" onClick={handleCarouselNext}>▶</button>
            </>
          )}
        </div>

        {/* Right: perfil, username e legenda */}
        <div className="lightbox_info">
          {profile && (
            <div className="lightbox_user">
              <img
                src={profile.profile_picture_url}
                alt={"@"+profile.username}
                className="lightbox_profile_picture"
              />
              <span className="lightbox_username">{"@"+profile.username}</span>
            </div>
          )}

          {post.caption && (
            <p className="lightbox_caption">{post.caption}</p>
          )}
          <InstagramComments mediaId={post.id} />
        </div>

        {/* Fechar e navegação entre publicações */}
        <button className="lightbox_close" onClick={onClose}>✕</button>
        <button className='lightbox_nav left' onClick={onPrev}>
          <img src={arrow_left} alt="previous publication" />
        </button>
        <button className='lightbox_nav right' onClick={onNext}>
          <img src={arrow_right} alt="next publication" />
        </button>
      </div>
    </div>
  );
};

export default InstagramLightbox;
