import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { images, stables } from "../../constants";

const CardWrapper = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: rgba(7, 65, 210, 0.1) 0px 9px 30px;

  .post-image {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: auto;
    min-height: 14rem; /* Equivalent to md:h-52 */
  }

  .post-content {
    padding: 1.25rem; /* Equivalent to p-5 */
  }

  .post-title {
    font-family: 'Roboto', sans-serif; /* Ensure Roboto font is imported */
    font-weight: bold;
    font-size: 1.5rem; /* Equivalent to text-xl */
    line-height: 1.5; /* Adjust line-height if necessary */
    color: ${({ theme }) => theme.text}; /* Use styled-components theme variable */
    margin-top: 1rem; /* Equivalent to mt-3 */
  }

  .post-caption {
    color: ${({ theme }) => theme.textSoft}; /* Use styled-components theme variable */
    font-size: 0.875rem; /* Equivalent to text-sm */
    line-height: 1.5; /* Adjust line-height if necessary */
    margin-top: 0.75rem; /* Equivalent to mt-3 */
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Equivalent to gap-x-2 */
  }

  .user-avatar {
    width: 2.25rem; /* Equivalent to w-9 */
    height: 2.25rem; /* Equivalent to h-9 */
    border-radius: 50%;
  }

  .user-name {
    font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.text}; /* Use styled-components theme variable */
    font-size: 0.875rem; /* Equivalent to text-base */
  }

  .user-verification {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Equivalent to gap-x-2 */
    margin-top: 0.25rem; /* Equivalent to mt-1 */
  }

  .verification-icon {
    width: 1rem; /* Adjust size as needed */
    height: 1rem; /* Adjust size as needed */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, verified }) =>
      verified ? theme.soft : theme.bg}; /* Example use of theme variable */
  }

  .verification-text {
    font-style: italic;
    color: ${({ theme }) => theme.textSoft}; /* Use styled-components theme variable */
    font-size: 0.75rem; /* Equivalent to text-xs */
    line-height: 1.5; /* Adjust line-height if necessary */
  }

  .post-date {
    font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.textSoft}; /* Use styled-components theme variable */
    font-size: 0.875rem; /* Equivalent to text-base */
  }
`;

const ArticleCard = ({ post, className }) => {
  const { verified, createdAt } = post.user;

  return (
    <CardWrapper className={className}>
      <Link to={`/blog/${post.slug}`}>
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.samplePostImage
          }
          alt="title"
          className="post-image"
        />
      </Link>
      <div className="post-content">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-caption">{post.caption}</p>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div className="user-profile">
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.userImage
              }
              alt="post profile"
              className="user-avatar"
            />
            <div className="flex flex-col">
              <h4 className="user-name">{post.user.name}</h4>
              <div className="user-verification">
                <span
                  className="verification-icon"
                  verified={verified}
                >
                  {verified ? (
                    <BsCheckLg className="text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className="text-red-500" />
                  )}
                </span>
                <span className="verification-text">
                  {verified ? "Verified" : "Unverified"} writer
                </span>
              </div>
            </div>
          </div>
          <span className="post-date">
            {new Date(createdAt).getDate()}{" "}
            {new Date(createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ArticleCard;
