// Import React and useState hook for managing component state
import React, { useState } from "react";

// Import styling (you can customize this in App.css)
import "./App.css";

function App() {
  // Define state for form inputs
  const [formData, setFormData] = useState({
    partyOne: "",         // First company or individual
    partyTwo: "",         // Second company or individual
    effectiveDate: "",    // Date NDA starts
    description: "",      // Description of confidential information
    termLength: "",       // Duration of NDA in years
  });

  // Stores the generated NDA text from the backend
  const [generatedNDA, setGeneratedNDA] = useState("");

  // Boolean flag to show loading spinner while waiting for response
  const [loading, setLoading] = useState(false);

  // Stores any error message returned from backend
  const [error, setError] = useState(null);

  // Handle changes in form input fields and update state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the specific input field by merging new value into existing state
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();       // Prevent page reload on form submit
    setLoading(true);         // Set loading to true while waiting for backend
    setError(null);           // Clear previous errors
    setGeneratedNDA("");      // Clear previous NDA text

    try {
      // Make a POST request to your Flask backend with form data
      const response = await fetch("http://localhost:5000/generate-nda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(formData),       // Convert form data to JSON string
      });

      // If server responds with error, throw to trigger catch block
      if (!response.ok) throw new Error("Server error");

      const data = await response.json(); // Parse JSON response
      setGeneratedNDA(data.nda);          // Store the generated NDA
    } catch (err) {
      console.error("NDA generation error:", err);
      setError("❌ Failed to generate NDA. Please try again."); // Show error to user
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    // Centered container with max width and padding
    <div className="container" style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 className="text-center mb-4">🤝 Paralegal NDA Generator</h1>

      {/* NDA input form */}
      <form onSubmit={handleSubmit} className="nda-form">
  <div className="form-row">
    <div className="form-group">
      <label>Party One Name</label>
      <input
        type="text"
        name="partyOne"
        value={formData.partyOne}
        onChange={handleChange}
        placeholder="e.g. Google"
        required
      />
    </div>

    <div className="form-group">
      <label>Party Two Name</label>
      <input
        type="text"
        name="partyTwo"
        value={formData.partyTwo}
        onChange={handleChange}
        placeholder="e.g. Apple"
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label>Effective Date</label>
      <input
        type="date"
        name="effectiveDate"
        value={formData.effectiveDate}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Term Length (years)</label>
      <input
        type="number"
        name="termLength"
        value={formData.termLength}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="form-group full-width">
    <label>Description of Confidential Information</label>
    <textarea
      name="description"
      rows="4"
      value={formData.description}
      onChange={handleChange}
      placeholder="e.g. proprietary algorithms, trade secrets..."
      required
    ></textarea>
  </div>

  <div className="form-actions">
    <button type="submit" disabled={loading}>
      {loading ? "Generating..." : "Generate NDA"}
    </button>
  </div>
</form>


      {/* Show error message if one exists */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Show NDA output if one is generated */}
      {generatedNDA && (
        <div className="mt-4" style={{ background: "#eef", padding: "20px", borderRadius: "8px" }}>
          <h3>📄 Generated NDA</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{generatedNDA}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
