import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRight } from "react-icons/fa";
import ArticleCard from "../../../components/compBlog/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/compBlog/ArticleCardSkeleton";
import ErrorMessage from "../../../common/ErrorMessage";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../../../components/components-Tube/Card";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./articles.css";  // Import custom CSS file for additional styles

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/trend`);
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // Handle error state if needed
      }
    };
    fetchVideos();
  }, []);

  const sliderSettings = {
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
    beforeChange: (current, next) => setFocusedSlide(next),
  };

  const [focusedSlide, setFocusedSlide] = useState(0);

  return (
    <>
      <SectionWrapper>
        <section className="flex flex-col container mx-auto px-5 py-10">
          <Slider {...sliderSettings}>
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <div className="slider-item" key={index}>
                    <ArticleCardSkeleton />
                  </div>
                ))
              : isError
              ? <ErrorMessage message="Couldn't fetch the posts data" />
              : data?.data.map((post, index) => (
                  <div
                    key={post._id}
                    className={`slider-item ${
                      focusedSlide === index ? "focused" : "blurred"
                    }`}
                  >
                    <ArticleCard post={post} />
                  </div>
                ))}
          </Slider>
          <Link
            to="/blog"
            className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg mt-10"
          >
            <span>More articles</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <section className="flex flex-col container mx-auto px-5 py-10">
          <Slider {...sliderSettings}>
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <div className="slider-item" key={index}>
                    <CardSkeleton />
                  </div>
                ))
              : isError
              ? <ErrorMessage message="Couldn't fetch the videos data" />
              : videos.map((video, index) => (
                  <div
                    key={video._id}
                    className={`slider-item ${
                      focusedSlide === index ? "focused" : "blurred"
                    }`}
                  >
                    <Card video={video} />
                  </div>
                ))}
          </Slider>
          <Link
            to="/tube"
            className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg mt-10"
          >
            <span>More videos</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </section>
      </SectionWrapper>
    </>
  );
};

const SectionWrapper = styled.div`
  margin-bottom: 20px;
`;

const CardSkeleton = styled.div`
  /* Define your skeleton loading style */
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
`;

export default Articles;
