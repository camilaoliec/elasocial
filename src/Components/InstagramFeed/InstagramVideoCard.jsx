import React from 'react'
import "./InstagramVideoCard.scss"

const InstagramVideoCard = ({ post, caption}) => {
    const videoRef = React.useRef(null);
    const [hover, setHover] = React.useState(false)
  return (
    <div 
        className='insta_card'
        onMouseEnter={() => {
            setHover(true);
            videoRef.current?.play();
        }}
        onMouseLeave={() => {
            setHover(false)
            videoRef.current?.pause();
        }}
        >
        <div className="insta_video-container">
            <video ref={videoRef} src={post.media_url} muted loop className='insta_video' />
            {!hover && <button className="insta_btn-play">▶</button>}
        </div>
        {hover && (
            <div className="overlay">
            <p className="caption">
            {caption.length > 350 ? caption.substring(0, 350) + "..." : caption}
            </p>
            </div>
        )}
    </div>
  )
}

export default InstagramVideoCard
