import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Victoria H.",
      location: "New York",
      initials: "VH",
      rating: 5,
      title: "Phenomenal Craftsmanship",
      text: "The Double-Breasted Wool Blazer exceeded my expectations. The tailoring is sharp, the wool is heavy yet breathable, and it drapes beautifully. It truly feels like custom couture."
    },
    {
      id: 2,
      name: "Alexander M.",
      location: "London",
      initials: "AM",
      rating: 5,
      title: "Timeless Minimalist Pieces",
      text: "I have rebuilt my wardrobe around LuxeLoft's essentials. The Supima cotton shirts are crisp and retain their shape perfectly after washing. The customer experience is impeccable."
    },
    {
      id: 3,
      name: "Sophia K.",
      location: "Paris",
      initials: "SK",
      rating: 5,
      title: "Incredible Silk Quality",
      text: "I bought the Silk Slip Dress in Champagne Gold. The silk feels heavy, luxurious, and is completely opaque. It floats around the body. Standard-setting fashion indeed."
    }
  ];

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="section-title">
          <p>Client Journals</p>
          <h2>The Luxe Experience</h2>
        </div>

        <div className="grid-cols-3 testimonials-grid">
          {reviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="reviewer-avatar">
                  {review.initials}
                </div>
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{review.name}</h4>
                  <p className="reviewer-location">{review.location}</p>
                </div>
                <div className="verified-badge">
                  <CheckCircle size={14} className="verified-icon" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" className="star-icon" />
                ))}
              </div>

              <h3 className="testimonial-title">"{review.title}"</h3>
              <p className="testimonial-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
