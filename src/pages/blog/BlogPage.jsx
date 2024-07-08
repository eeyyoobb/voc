import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/compBlog/ArticleCardSkeleton";
import ErrorMessage from "../../common/ErrorMessage";
import ArticleCard from "../../components/compBlog/ArticleCard";
import Pagination from "../../common/Pagination";
import { useSearchParams } from "react-router-dom";
import Search from "../../common/Search";
import styled from "styled-components";

let isFirstRun = true;

const BlogContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width:auto;
  margin: 0 auto;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);
  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 12),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, refetch]);

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <BlogContainer>
      <Search
        className="w-full max-w-xl mb-10"
        onSearchKeyword={handleSearch}
      />
      <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading || isFetching ? (
          [...Array(4)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : data?.data.length === 0 ? (
          <p className="text-orange-500">No Posts Found!</p>
        ) : (
          data?.data.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        )}
      </div>
      {!isLoading && (
        <Pagination
          onPageChange={(page) => handlePageChange(page)}
          currentPage={currentPage}
          totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
        />
      )}
    </BlogContainer>
  );
};

export default BlogPage;
