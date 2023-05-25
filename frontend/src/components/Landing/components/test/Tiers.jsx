// Tiers.js

import React from "react";
import "./Tiers.css";

const tiers = [
  {
    id: 1,
    title: "Basic",
    price: "$9.99",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: 2,
    title: "Standard",
    price: "$19.99",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
  {
    id: 3,
    title: "Premium",
    price: "$29.99",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  },
];

const Tiers = () => {
  return (
    <div className="service-tiers-container">
      {tiers.map((tier) => (
        <div key={tier.id} className="service-tier-card">
          <h2 className="tier-title">{tier.title}</h2>
          <div className="tier-price">{tier.price}</div>
          <ul className="tier-features">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Tiers;
