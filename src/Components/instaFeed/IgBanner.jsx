import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./IgBanner.scss";
import { fetchInstagramPosts } from "../../api/instagram";
import IgPost from "./IgPost";
import icon_left from "../../assets/arrow-left.svg";
import icon_right from "../../assets/arrow-right.svg";
import IgLightbox from "./IgLightbox";
import { fetchInstagramProfile } from "../../api/instagram";

const IgBanner = () => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [canScrollPrev, setCanScrollPrev] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: false,
      slidesToScroll: 4,
      align: "start",
      breakpoints: {
    '(max-width: 1000px)': { slidesToScroll: 2 }
  }
    });

    const scrollPrev = useCallback(
      () => emblaApi && emblaApi.scrollPrev(),
      [emblaApi],
    );
    const scrollNext = useCallback(() => {
      if (!emblaApi) return;

      if (!emblaApi.canScrollNext()) {
          emblaApi.scrollTo(0); 
      } else {
          emblaApi.scrollNext();
      }
    }, [emblaApi]);

    const onSelect = useCallback((api) => {
      setCanScrollPrev(api.canScrollPrev());
    }, []);

    useEffect(() => {
      if (!emblaApi) return;

      onSelect(emblaApi); // Checa o estado inicial
      emblaApi.on("select", onSelect); // Checa toda vez que o carrossel move
      emblaApi.on("reInit", onSelect);
      emblaApi.on("scrollSnap", onSelect);
    }, [emblaApi, onSelect]);

    useEffect(() => {
      const loadData = async () => {
          const postData = await fetchInstagramPosts();
          setPosts(postData.slice(0, 12));
          const profileData = await fetchInstagramProfile();
          setProfile(profileData);
      };
      loadData();
    }, []);

    const handleNext = () => {
      setSelectedIndex((prev) => (prev < posts.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : posts.length - 1));
    };

    const openLightbox = (index) => {
      setSelectedIndex(index);
       setLightboxOpen(true);
    };

    return (
        <div className="igBanner embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="igBanner_container embla__container">
                    {posts.map((post, index) => (
                        <div
                            className="igBanner_post embla__slide"
                            key={post.id || index}
                            onClick={() => openLightbox(index)}
                            style={{ cursor: "pointer" }}
                        >
                            <IgPost post={post} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="igButtons">
                {/* 3. Renderização condicional do botão esquerdo */}
                {canScrollPrev && (
                    <button
                        className="igButtons embla__prev"
                        onClick={scrollPrev}
                    >
                        <img src={icon_left} alt="Previous" />
                    </button>
                )}

                <button className="igButtons embla__next" onClick={scrollNext}>
                    <img src={icon_right} alt="Next" />
                </button>
            </div>

            {lightboxOpen && selectedIndex !== null && (
                <IgLightbox
                    post={posts[selectedIndex]} // Passa o post baseado no index atual
                    profile={profile}
                    onClose={() => setLightboxOpen(false)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </div>
    );
};

export default IgBanner;
