// App.jsx
import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

const backendUrl = "http://localhost:5000"; // Change to live backend URL when deployed

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [challenge, setChallenge] = useState("");
  const [target, setTarget] = useState("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  // --------------------------
  // PAYSTACK PAYMENT FUNCTION
  // --------------------------
  const payWithPaystack = () => {
    if (!email) {
      alert("Please enter your email to proceed with payment");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_live_70ebfaaa1ecb2927b717a8c1e5c5243ddf71b03d", // Replace with your Paystack public key
      email: email,
      amount: 500000, // ₦5,000 in kobo
      currency: "NGN",
      ref: `${Math.floor(Math.random() * 1000000000) + 1}`,
      onClose: () => alert("Payment not completed!"),
      callback: function (response) {
        console.log("Payment successful:", response);
        setPaid(true); // Unlock planner form
      },
    });

    handler.openIframe();
  };

  // --------------------------
  // GENERATE PDF PLANNER
  // --------------------------
  const generatePlanner = async () => {
    if (!name || !goal || !challenge || !target) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/generate-plan`, {
        name,
        goal,
        challenge,
        target,
      });

      // Save PDF
      const blob = new Blob([res.data], { type: "application/pdf" });
      saveAs(blob, `${name}_2026_Planner.pdf`);

      setPlan("Your personalized 2026 Action Planner has been generated!");
    } catch (err) {
      console.error(err);
      alert("Error generating planner");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* Logo */}
      <img src="/src/assets/evo.png" alt="Wirevo Logo" className="logo" />

      {/* Intro */}
      <h1>Wirevo Action 2026 Planner</h1>
      <p className="intro">
        Unlock clarity, direction, and guidance for your business and personal
        goals before 2026. This tool provides personalized predictive advice!
      </p>

      {!paid ? (
        <div className="payment-section">
          <input
            type="email"
            placeholder="Enter your email for payment"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="cta-button" onClick={payWithPaystack}>
            Pay 5,000 & Unlock Planner
          </button>
        </div>
      ) : (
        <div className="form-section">
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type of Business / Career"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            type="text"
            placeholder="What Can Help You Succeed?"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Focus / Target for 2026"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <button
            className="cta-button"
            onClick={generatePlanner}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate My Planner"}
          </button>
        </div>
      )}

      {plan && <p className="plan-output">{plan}</p>}
    </div>
  );
}

export default App;