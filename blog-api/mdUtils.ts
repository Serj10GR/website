import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ICardPost, IPost } from "./types";

const postsDirectory = "posts";

export const getAllPosts = (): Array<ICardPost> => {
  const files = fs.readdirSync(postsDirectory);
  const allPosts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const readFile = fs.readFileSync(
      path.join(postsDirectory, fileName),
      "utf8"
    );

    const { data } = matter(readFile);

    return {
      slug,
      title: data.title,
      headerImgId: data.headerImgId,
    };
  });

  return allPosts;
};

export const getAllPaths = () => {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const paths = files.map((file) => {
    return {
      params: {
        slug: file.replace(/\.md$/, ""),
      },
    };
  });

  return paths;
};

export const getPost = (slug: string): IPost => {
  const markdownWithMetadata = fs.readFileSync(
    path.join(postsDirectory, slug + ".md"),
    "utf8"
  );

  const { content, data } = matter(markdownWithMetadata);

  return {
    title: data.title,
    publishedAt: data.publishedAt,
    headerImgId: data.headerImgId,
    htmlContent: content,
  };
};