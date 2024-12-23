const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2,
  },
];

test("dummy returns one", () => {
  const receivedResult = listHelper.dummy(blogs);
  const expectedResult = 1;

  assert.strictEqual(receivedResult, expectedResult);
});

describe("total likes", () => {
  const blogs = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const receivedResult = listHelper.totalLikes(blogs);
    const expectedResult = 5;

    assert.strictEqual(receivedResult, expectedResult);
  });
});

describe("most liked blog post", () => {
  test("should return the blog post with the most likes", () => {
    const receivedResult = listHelper.favoriteBlog(blogs);
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    assert.deepStrictEqual(receivedResult, expectedResult);
  });

  test("should return undefined for an empty list", () => {
    const receivedResult = listHelper.favoriteBlog([]);
    const expectedResult = undefined;

    assert.deepStrictEqual(receivedResult, expectedResult);
  });
});

describe("most productive blog author", () => {
  test("should return the most productive blog author with the highest number of blogs", () => {
    const receivedResult = listHelper.mostBlogs(blogs);
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    assert.deepStrictEqual(receivedResult, expectedResult);
  });

  test("should return undefined for an empty list", () => {
    const receivedResult = listHelper.mostBlogs([]);
    const expectedResult = null;

    assert.deepStrictEqual(receivedResult, expectedResult);
  });

  test("should handle multiple authors with the same number of blogs", () => {
    const blogsWithSameCount = [
      {
        _id: "1",
        title: "Blog A",
        author: "Author A",
        url: "http://example.com/a",
        likes: 5,
        __v: 0,
      },
      {
        _id: "2",
        title: "Blog B",
        author: "Author B",
        url: "http://example.com/b",
        likes: 3,
        __v: 0,
      },
      {
        _id: "3",
        title: "Blog C",
        author: "Author A",
        url: "http://example.com/c",
        likes: 2,
        __v: 0,
      },
      {
        _id: "4",
        title: "Blog D",
        author: "Author B",
        url: "http://example.com/d",
        likes: 4,
        __v: 0,
      },
    ];

    const receivedResult = listHelper.mostBlogs(blogsWithSameCount);
    const expectedResult = {
      author: "Author A", // We assume that return the first author
      blogs: 2,
    };

    assert.deepStrictEqual(receivedResult, expectedResult);
  });
});

describe("most liked blog author", () => {
  test("should return the most liked blog posts author with the highest total number of blog post likes", () => {
    const receivedResult = listHelper.mostLikes(blogs);
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    assert.deepStrictEqual(receivedResult, expectedResult);
  });

  test("should return null for an empty list", () => {
    const receivedResult = listHelper.mostLikes([]);
    const expectedResult = null;

    assert.deepStrictEqual(receivedResult, expectedResult);
  });

  test("should handle multiple authors with the same total likes", () => {
    const blogsWithSameLikes = [
      {
        _id: "1",
        title: "Blog A",
        author: "Author A",
        url: "http://example.com/a",
        likes: 10,
        __v: 0,
      },
      {
        _id: "2",
        title: "Blog B",
        author: "Author B",
        url: "http://example.com/b",
        likes: 10,
        __v: 0,
      },
      {
        _id: "3",
        title: "Blog C",
        author: "Author A",
        url: "http://example.com/c",
        likes: 5,
        __v: 0,
      },
    ];

    const receivedResult = listHelper.mostLikes(blogsWithSameLikes);
    const expectedResult = {
      author: "Author A", // We assume that return the first author
      likes: 15,
    };

    assert.deepStrictEqual(receivedResult, expectedResult);
  });
});
