import React, { useState, useEffect } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./hero-slide.scss";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);
  // const [tvItems, setTvItems] = useState([]);

  // const  params  = useParams();
  // console.log(params,'?????')

    useEffect(() => {
      const getMovies = async () => {
          try {
              const response = await tmdbApi.getMoviesList(movieType.popular, {params:{page:1}});
              // console.log(response);
              setMovieItems(response.results.slice(0, 10));
          } catch {
              console.log('error');
          }
      }
      getMovies();

    //   const getTV = async () => {
    //     try {          
    //         const response = await tmdbApi.getTvList(tvType.popular, {params:{page:1}});
    //         console.log(response);
    //         setTvItems(response.results.slice(0, 10));
    //         // console.log(tvItems,"as;dlikkkk")
    //     } catch {
    //         console.log('error');
    //     }
    // }
    // getTV();
  }, []);

  // useEffect(() => {
  //   const getMovies = async () => {
  //     // console.log(apiConfig.apiKey)

  //     let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiConfig.apiKey}&language=en-US&page=1`
  //     let response = await fetch(url)
  //     let data = await response.json()
  //     console.log(data.results)
  //     console.log(data.results.slice(1, 4), '???')
  //     setMovieItems(data.results.slice(1, 4))
  //   }
  //   getMovies();
  // }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}

      {/* {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))} */}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let navigate = useNavigate();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videSrc = "https://youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton
              onClick={setModalActive /* () => console.log("trailer") */}
            >
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
