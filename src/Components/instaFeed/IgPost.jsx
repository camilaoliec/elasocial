import PropTypes from "prop-types";
import IgMediaDisplay from "./IgMediaDisplay";
import icon_ig_carousel from "../../assets/icon-carousel.svg";
import "./igBanner.scss";

const renderCaption = (caption) => {
    if (!caption) return "";
    const limite = 350;
    return caption.length > limite
        ? `${caption.substring(0, limite)}...`
        : caption;
};

const IgPost = ({ post, onClick }) => {
    const isCarousel = post.media_type === "CAROUSEL_ALBUM";
    const isNotVideo = post.media_type !== "VIDEO";

    const handleMouseEnter = (e) => {
        const video = e.currentTarget.querySelector("video");
        if (video) video.play();
    };
    const handleMouseLeave = (e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.pause();
        }
    };
    return (
        <div
            className={`ig_card ${post.media_type.toLowerCase()}`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}

        >
            <div className="ig_photo-wrapper">
                <IgMediaDisplay
                    url={post.media_url}
                    type={post.media_type}
                    className="ig_photo-img"
                    autoPlay={false}
                    muted={true}
                />
                {isCarousel && (
                    <span className="ig_photo-carouselBadge">
                        <img src={icon_ig_carousel} alt="Ícone de carrossel" />
                    </span>
                )}
                {isNotVideo && (
                    <div className="overlay">
                        <p className="overlay_caption">
                            {renderCaption(post.caption)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

IgPost.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        media_type: PropTypes.string.isRequired,
        media_url: PropTypes.string.isRequired,
        caption: PropTypes.string, // Adicionado aqui
    }).isRequired,
    onClick: PropTypes.func,
    showOverlay: PropTypes.bool,
};

export default IgPost;
