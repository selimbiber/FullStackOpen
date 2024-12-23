const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, post) => total + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authorsBlogCount = {};

  for (const { author } of blogs) {
    authorsBlogCount[author] = (authorsBlogCount[author] || 0) + 1;
  }

  let topAuthor = null;
  let maxBlogs = 0;

  for (const [author, count] of Object.entries(authorsBlogCount)) {
    if (count > maxBlogs) {
      maxBlogs = count;
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authorsLikesCount = {};

  for (const { author, likes } of blogs) {
    authorsLikesCount[author] = (authorsLikesCount[author] || 0) + likes;
  }

  let topAuthor = null;
  let maxLikes = 0;

  for (const [author, count] of Object.entries(authorsLikesCount)) {
    if (count > maxLikes) {
      topAuthor = author;
      maxLikes = count;
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
