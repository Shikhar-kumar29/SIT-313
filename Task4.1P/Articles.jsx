import React from "react";

function Articles() {
  const articles = [
    {
      title: "React vs Vue",
      description: "Frontend frameworks compared",
      author: "Virat Kohli",
      rating: 5,
      image: "https://picsum.photos/200/150?random=1",
    },
    {
      title: "NodeJS Explained",
      description: "Backend with JavaScript",
      author: "Rohit Sharma",
      rating: 5,
      image: "https://picsum.photos/200/150?random=2",
    },
    {
      title: "React Hooks",
      description: "Understanding hooks in React",
      author: "Shubman Gill",
      rating: 5,
      image: "https://picsum.photos/200/150?random=3",
    },
  ];

  return (
    <section>
      <h2>Featured Articles</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {articles.map((article, index) => (
          <div key={index} style={{ textAlign: "center", maxWidth: "200px" }}>
            <img src={article.image} alt={article.title} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>⭐ {article.rating} {article.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Articles;
