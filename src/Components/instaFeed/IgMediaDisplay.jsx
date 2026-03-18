import React from 'react'
import PropTypes from 'prop-types'

const IgMediaDisplay = ({ url, type, className, isLightBox = false, autoPlay, muted }) => {

    if (!url) return <div className={`${className} media-error`}> Midia nao disponivel</div>
    
    if ( type=== "VIDEO") {
        return (
            <video
                key={url}
                src={url}
                className={className}
                controls={isLightBox}
                autoPlay={autoPlay !== undefined ? autoPlay : !isLightBox}
                muted={muted !== undefined ? muted : !isLightBox}
                loop
                playsInline
            />
        )
    }

    return (
        <img 
            src={url}
            className={className}
            alt='Instagram content'
            loading="lazy"
        />
    )
}

IgMediaDisplay.propTypes={
    url: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM']).isRequired,
    className: PropTypes.string,
    isLightBox: PropTypes.bool
}

export default IgMediaDisplay;
