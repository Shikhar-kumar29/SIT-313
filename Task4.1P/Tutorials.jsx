import React from "react";

function Tutorials() {
  const tutorials = [
    {
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JS",
      author: "KL Rahul",
      rating: 5,
      image: "https://picsum.photos/200/150?random=4",
    },
    {
      title: "React Router",
      description: "Master navigation in React",
      author: "MS Dhoni",
      rating: 5,
      image: "https://picsum.photos/200/150?random=5",
    },
    {
      title: "ExpressJS Crash Course",
      description: "Build backend APIs with Express",
      author: "Sachin Tendulkar",
      rating: 4.9,
      image: "https://picsum.photos/200/150?random=6",
    },
  ];

  return (
    <section>
      <h2>Featured Tutorials</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {tutorials.map((tutorial, index) => (
          <div key={index} style={{ textAlign: "center", maxWidth: "200px" }}>
            <img src={tutorial.image} alt={tutorial.title} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
            <p>⭐ {tutorial.rating} {tutorial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tutorials;
