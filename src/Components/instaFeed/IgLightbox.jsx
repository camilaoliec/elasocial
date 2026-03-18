import React, { useState, useEffect, useCallback, useMemo } from 'react';
import arrow_left from '../../assets/arrow-left.svg';
import arrow_right from '../../assets/arrow-right.svg';
import { fetchPostLikes } from '../../api/instagram';
import './IgLightbox.scss';
import Like from "../../assets/icon_like.svg";

const IgLightbox = ({ post, profile, onClose, onPrev, onNext }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [likes, setLikes]=useState(null)
  
    const mediaItems = useMemo(() => {
      return post?.children?.data || (post ? [post] : []);
    }, [post]);

    
    const handleCarouselNext = useCallback(() => {
        if (mediaItems.length <= 1) return;
        setCarouselIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
    }, [mediaItems.length]);
    
    const handleCarouselPrev = useCallback(() => {
        if (mediaItems.length <= 1) return;
        setCarouselIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
    }, [mediaItems.length]);
    
    useEffect(() => {
      setCarouselIndex(0);
    }, [post?.id]);

    useEffect(() => {
      const getLikes = async () => {
          if (post?.id) {
              const count = await fetchPostLikes(post.id);
              setLikes(count);
          }
      };
      getLikes();
  }, [post?.id]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);
    
    useEffect(() => {
      if (!post) return;
      const handleKey = (e) => {
        if (e.key === "Escape") onClose();
        
        const isCarousel = mediaItems.length > 1;
  
        if (e.key === "ArrowLeft") {
          // Se estiver no primeiro item do carrossel, vai para o post anterior
          if (isCarousel && carouselIndex > 0) handleCarouselPrev();
          else onPrev();
        }
        if (e.key === "ArrowRight") {
          // Se estiver no último item do carrossel, vai para o próximo post
          if (isCarousel && carouselIndex < mediaItems.length - 1) handleCarouselNext();
          else onNext();
        }
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [post, onClose, onPrev, onNext, mediaItems.length, carouselIndex, handleCarouselNext, handleCarouselPrev]);
    
    if (!post) return null;

  const currentMedia = mediaItems[carouselIndex];

  return (
    <div className="lightbox_overlay" onClick={onClose} role="dialog" aria-modal="true">
        <div className="lightbox_container" onClick={(e) => e.stopPropagation()}>
        
            <div className={`lightbox_media ${currentMedia.media_type.toLowerCase()}`}>
            {currentMedia.media_type === "VIDEO" ? (
                <video key={currentMedia.media_url} src={currentMedia.media_url} controls autoPlay className="lightbox_video" />
            ) : (
                <img key={currentMedia.media_url} src={currentMedia.media_url} alt="Instagram content" className="lightbox_img" />
            )}

            {mediaItems.length > 1 && (
                <div className="carousel_controls">
              <button className="lightbox_carousel_nav left" onClick={handleCarouselPrev}>◀</button>
              <button className="lightbox_carousel_nav right" onClick={handleCarouselNext}>▶</button>
              {/* Bolinhas*/}
              <div className="carousel_dots">
                {mediaItems.map((_, i) => (
                    <span key={i} className={`dot ${i === carouselIndex ? 'active' : ''}`} />
                ))}
              </div>
            </div>
            )}
        </div>

        {/* Lado Direito: Info */}
        <div className="lightbox_info">
            <button className="lightbox_x" onClick={onClose} aria-label="Fechar">✕</button>
          <header className="lightbox_header">
            {profile ? (
              <div className="lightbox_user">
                <img src={profile.profile_picture_url} alt={profile.username} className="lightbox_profile_picture" />
                <span className="lightbox_username">@{profile.username}</span>
              </div>
            ):(
                <p>Carregando Perfil...</p>
            )}
          </header>

            <div className="lightbox_content">
                {post.caption && <p className="likes">{post.caption?.length > 600 ? post.caption.substring(0, 600) + "..." : post.caption}</p>}
                    <div className="lightbox_likes_row">
                        <img src={Like} className="like_icon" alt='Like icon'/>
                        <span>Curtido por <strong>{likes ?? 0}</strong> pessoas</span>
                    </div>
                </div>
            </div>

        </div>
        {/* Navegação Global (Posts) */}
        <button className='lightbox_nav global-left' onClick={(e) =>{
          e.stopPropagation();
          onPrev()
        }} title="Post anterior">
        <img src={arrow_left} alt="Anterior" />
        </button>
        <button className='lightbox_nav global-right' onClick={(e) => {
          e.stopPropagation();
          onNext()
        }} title="Próximo post">
        <img src={arrow_right} alt="Próximo" />
        </button>
    </div>
  );
};

export default IgLightbox;


