import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../../store/reducers/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../../store/reducers/userReducers";
import Recommendation from "../../components/components-Tube/Recommendation";
import Comments from "../../components/components-Tube/Comments";

const Video = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[3];
  console.log("Path:", path);

  const [channel, setChannel] = useState({});
  const [videoUrl, setVideoUrl] = useState('');
  const [isYouTube, setIsYouTube] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        const userId = videoRes.data.userId;

        const channelUrl = `/api/users/find/${userId}`;
        const channelRes = await axios.get(channelUrl);

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setVideoUrl(videoRes.data.videoUrl); // Set the video URL
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  useEffect(() => {
    const isYouTubeUrl = (url) => {
      const standardUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const shortUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;
      return standardUrlPattern.test(url) || shortUrlPattern.test(url);
    };

    if (isYouTubeUrl(videoUrl)) {
      const standardUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const shortUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;
      let match = videoUrl.match(standardUrlPattern);
      if (!match) {
        match = videoUrl.match(shortUrlPattern);
      }
      if (match && match[1]) {
        const newURL = `https://www.youtube.com/embed/${match[1]}`;
        setVideoUrl(newURL);
        setIsYouTube(true);
        console.log("YouTube video URL:", newURL);
      }
    } else {
      setIsYouTube(false);
      console.log("Non-YouTube video URL:", videoUrl);
    }
  }, [videoUrl]);

  const handleLike = async () => {
    try {
      await axios.put(`/api/users/like/${currentVideo._id}`);
      dispatch(like(userInfo._id));
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put(`/api/users/dislike/${currentVideo._id}`);
      dispatch(dislike(userInfo._id));
    } catch (err) {
      console.error("Error disliking video:", err);
    }
  };

  const handleSub = async () => {
    userInfo.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/users/unsub/${channel._id}`)
      : await axios.put(`/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
    console.log(channel._id)
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
        {isYouTube ? (
          <VideoFrame src={videoUrl} controls />
        ) : (
          <VideoFrame src={videoUrl} controls />
        )}
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(userInfo?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(userInfo?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {userInfo.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.iframe`
  min-height: 360px;
  width: 100%;
  object-fit: cover;
`;
