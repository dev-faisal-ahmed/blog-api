import path from "path";
import fs from "fs/promises";

export class BlogDB {
  constructor() {
    this.filePath = path.join(process.cwd(), "src/db/blog.db.json");
  }

  async createPost(post) {
    const posts = await this.loadPosts();
    posts.push(post);
    await this.savePosts(posts);
    return post;
  }

  async getPostById(id) {
    const posts = await this.loadPosts();
    const post = posts.find((p) => p.id === id);
    return post;
  }

  async getNextPostId() {
    const posts = await this.loadPosts();
    const nextPostId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    return nextPostId;
  }

  // helpers
  async loadPosts() {
    try {
      await this.ensureFileExist();
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error while reading blog posts", error);
      return [];
    }
  }

  async savePosts(posts) {
    await fs.writeFile(this.filePath, JSON.stringify(posts, null, 2));
  }

  async ensureFileExist() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify([]));
    }
  }
}
