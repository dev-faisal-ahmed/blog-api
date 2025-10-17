export class BlogPost {
  constructor({ id, title, content, author }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
  }
}
