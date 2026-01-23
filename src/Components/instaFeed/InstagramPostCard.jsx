import InstagramVideoCard from './InstagramVideoCard';
import iconCarousel from '../../assets/icon-carousel.svg';
import icon_ig_video from '../../assets/icon_ig_video.svg';
import './InstagramPostCard.scss';

const InstagramPostCard = ({ post, onClick }) => {
  return (
    <div 
      className={post.media_type === "VIDEO" ? "insta_video_card" : "insta_card"} 
      onClick={onClick}
    >
      {post.media_type === "VIDEO" ? (
        <>
          <InstagramVideoCard post={post} caption={post.caption} />
          <div className="icon_ig_video">
            <img src={icon_ig_video} alt="video icon" />
          </div>
        </>
      ) : (
        <>
          <img 
            src={post.media_url} 
            alt={'Instagram post'}
            style={{ width: "100%", height: "100%", objectFit: "container" }}
          />
          {post.media_type === "CAROUSEL_ALBUM" && (
            <span className="carousel-badge">
              <img src={iconCarousel} alt="Carousel icon" />
            </span>
          )}
          <div className="overlay">
            <p className="caption">
              {post.caption?.length > 350 ? post.caption.substring(0, 350) + "..." : post.caption}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default InstagramPostCard;