import React from "react";

export default function AboutTerms() {
  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#5D1451" }}>About Wirevo</h1>
      <p>
        Wirevo is a tech startup, focused on solving problems and building actionable goals
        and innovations through our products and services.
      </p>

      <h2>Terms & Conditions</h2>
      <div style={{ maxHeight: "300px", overflowY: "scroll", padding: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
        <p>By using our products, you acknowledge and agree to our terms.</p>
        <p>All payments are non-refundable.</p>
        <p>Plans are for personal use only.</p>
        <p>More products and services will be coming soon.</p>
      </div>

      <h3>Contact Us</h3>
      <p>Email: <strong>hellowirevo@gmail.com</strong></p>

      <h3>Next Steps</h3>
      <p>We build Action2026 and more products to come!</p>
    </div>
  );
}