import React from "react";
import "../../../styles/TestimonioCard.css";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function TestimonialCard({ userName, reviewText, stars = 5 }) {
  return (
    <div className="testimonial-card">
      <div className="avatar">
        <FaUser className="avatar-icon" />
      </div>
      <div className="card-content">
        <div className="user-info">{userName}</div>
        <div className="stars">
          {[...Array(stars)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <div className="review-text">
          <strong>Opinión:</strong> {reviewText}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
