import React from "react";
import "../styles/TestimonioCard.css";

const TestimonialCard = ({
  avatar,
  userName,
  location,
  stars,
  reviewText
}) => {
  return (
    <div className="testimonial-card">
      <div className="avatar">
        <div className="avatar-icon">👤</div>
      </div>

      <div className="card-content">
        <p className="user-info">{userName}{location && ` – ${location}`}</p>
        <p><strong>Estrellas:</strong> 
          <span className="stars">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < stars ? '★' : '☆'}</span>
            ))}
          </span>
        </p>
        <p className="review-text">{reviewText}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
