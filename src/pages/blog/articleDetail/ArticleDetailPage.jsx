import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";

import BreadCrumbs from "../../../components/compBlog/BreadCrumbs";
import CommentsContainer from "../../../components/comments/CommentsContainer";
import SocialShareButtons from "../../../common/SocialShareButtons";
import { images, stables } from "../../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import { getAllPosts, getSinglePost } from "../../../services/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../../common/ErrorMessage";
import parseJsonToHtml from "../../../utils/parseJsonToHtml";
import Editor from "../../../components/editor/Editor";

const ArticleDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.25rem 1.25rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 1.25rem;
    align-items: flex-start;
  }
`;

const Article = styled.article`
  flex: 1;
`;

const Image = styled.img`
  border-radius: 0.75rem;
  width: 100%;
`;

const CategoriesContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const CategoryLink = styled(Link)`
  color: ${({ theme }) => theme.link};
  font-size: 0.875rem;
  font-family: "Roboto", sans-serif;
  display: inline-block;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
  @media (min-width: 768px) {
    font-size: 1.625rem;
  }
`;

const EditorContainer = styled.div`
  width: 100%;
`;

const ShareSection = styled.div`
  margin-top: 1.75rem;
`;

const ShareHeader = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ArticleDetailPage = ({ darkMode }) => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: data.title, link: `/blog/${data.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <ArticleDetailContainer>
          <Article>
            <BreadCrumbs data={breadCrumbsData} />
            <Image
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.samplePostImage
              }
              alt={data?.title}
            />
            <CategoriesContainer>
              {data?.categories.map((category) => (
                <CategoryLink
                  key={category.name}
                  to={`/blog?category=${category.name}`}
                >
                  {category.name}
                </CategoryLink>
              ))}
            </CategoriesContainer>
            <Title>{data?.title}</Title>
            <EditorContainer>
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </EditorContainer>
            <CommentsContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </Article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={postsData?.data}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <ShareSection>
              <ShareHeader>Share on:</ShareHeader>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </ShareSection>
          </div>
        </ArticleDetailContainer>
      )}
    </>
  );
};

export default ArticleDetailPage;
