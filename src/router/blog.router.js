import sanitizeHtml from "sanitize-html";

import { Router } from "express";
import { createBlogDto } from "../validation/blog.validation.js";
import { BlogPost } from "../entities/blog.post.entity.js";
import { BlogDB } from "../db/blog.db.js";

const blogRouter = Router();

blogRouter.post("/post", async (req, res) => {
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
    return res.status(400).json({ error: error.message ?? "Something went wrong" });
  }
});

export { blogRouter };
