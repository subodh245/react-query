import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";

const PostList = () => {
  const {
    data: postData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
  });

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your post"
          className="postbox"
          name="title"
        />
        <div className="tags">
          {tagsData?.map((tag) => {
            return (
              <div key={tag}>
                <input name={tag} id={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button>Post</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}

      {postData &&
        postData?.map((post) => {
          return (
            <div key={post.id} className="post">
              <div>{post.title}</div>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
