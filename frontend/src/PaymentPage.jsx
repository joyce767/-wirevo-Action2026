import React, { useState } from "react";
import { useRouter } from "next/router";

const PaymentPage = () => {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handlePay = () => {
    if (!agreed) {
      alert("Please agree to the Terms before proceeding.");
      return;
    }

    // === Simulated payment ===
    // Replace this with Paystack logic when ready
    const paymentSuccess = true;

    if (paymentSuccess) {
      router.push("/about-terms"); // redirect after payment
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#5D1451" }}>Unlock Your Action2026 Plan</h1>
      <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
        Pay ₦5,000 to get your personalized Action2026 plan instantly. Scroll to read our Terms of Use.
      </p>

      <div style={{ margin: "30px 0", textAlign: "center" }}>
        <button
          onClick={handlePay}
          style={{
            padding: "12px 25px",
            fontSize: "1rem",
            backgroundColor: "#D81E5B",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Pay ₦5,000
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            style={{ marginRight: "10px" }}
          />
          I have read and agree to the Terms & Conditions
        </label>
      </div>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9"
        }}
      >
        <h3>Terms & Conditions</h3>
        <p>
          Wirevo is a tech startup building actionable goals and innovations through our products and services.
          By paying ₦5,000, you acknowledge and agree to our terms.
        </p>
        <p>All plans are for personal use only. Payments are non-refundable. More products will be coming soon.</p>
        <p>Contact us at <strong>hellowirevo@gmail.com</strong> for support.</p>
      </div>
    </div>
  );
};

export default PaymentPage;