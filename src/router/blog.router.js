import sanitizeHtml from "sanitize-html";

import { Router } from "express";
import { createBlogDto } from "../validation/blog.validation.js";
import { BlogPost } from "../entities/blog.post.entity.js";
import { BlogDB } from "../db/blog.db.js";

const blogRouter = Router();

blogRouter
  // Create a blog post
  .post("/posts", async (req, res) => {
    try {
      const value = await createBlogDto.validateAsync(req.body ?? {});

      const title = sanitizeHtml(value.title);
      const content = sanitizeHtml(value.content);
      const author = sanitizeHtml(value.author);

      const blogDB = new BlogDB();

      const nextPostId = await blogDB.getNextPostId();
      const blogPost = new BlogPost({ id: nextPostId, title, content, author });
      const newBlogPost = await blogDB.createPost(blogPost);

      return res.status(201).json({ message: "Blog post created successfully", post: newBlogPost });
    } catch (error) {
      console.log("Error while creating blog post", error);
      return res.status(500).json({ error: error.message ?? "Something went wrong" });
    }
  })

  // Get a blog post by id
  .get("/posts/:id", async (req, res) => {
    try {
      const postId = Number(req.params.id);
      const blogDB = new BlogDB();

      const post = await blogDB.getPostById(postId);
      if (!post) return res.status(404).json({ error: `Blog post with Id ${postId} not found` });

      return res.status(200).json(post);
    } catch (error) {
      console.log("Error while getting blog post", error);
      return res.status(500).json({ error: error.message ?? "Something went wrong" });
    }
  });

export { blogRouter };
