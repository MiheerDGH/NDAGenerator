// Import React and useState hook for managing component state
import React, { useState } from "react";

// Import styling
import "./App.css";

// Import jsPDF for PDF generation
import jsPDF from "jspdf";

function App() {
  // State for form inputs
  const [formData, setFormData] = useState({
    partyOne: "",
    partyTwo: "",
    effectiveDate: "",
    description: "",
    termLength: "",
  });

  const [generatedNDA, setGeneratedNDA] = useState("");  // Generated NDA text
  const [loading, setLoading] = useState(false);         // Loading spinner
  const [error, setError] = useState(null);              // Error message
  const [showModal, setShowModal] = useState(false);     // Modal popup

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedNDA("");

    try {
      const response = await fetch("http://localhost:5000/generate-nda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setGeneratedNDA(data.nda);
    } catch (err) {
      console.error("NDA generation error:", err);
      setError("❌ Failed to generate NDA. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Download as plain text
  const downloadTxt = () => {
    const blob = new Blob([generatedNDA], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nda.txt";
    link.click();
  };

  // Download as paginated PDF
  const handleDownloadPDF = () => {
    if (!generatedNDA) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
    });

    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 18;
    const startY = margin + 30;

    // Split text into wrapped lines
    const lines = doc.splitTextToSize(generatedNDA, maxLineWidth);
    let cursorY = startY;

    // Write lines with pagination
    lines.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    doc.save("Generated_NDA.pdf");
  };

  return (
    <div className="container" style={{ maxWidth: "770px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 className="text-center mb-4">🤝 LegalChain NDA Generator</h1>

      {/* NDA Form */}
      <form onSubmit={handleSubmit} className="nda-form">
        <div className="form-row">
          <div className="form-group">
            <label>Party One Name</label>
            <input type="text" name="partyOne" value={formData.partyOne} onChange={handleChange} placeholder="e.g. Google" required />
          </div>
          <div className="form-group">
            <label>Party Two Name</label>
            <input type="text" name="partyTwo" value={formData.partyTwo} onChange={handleChange} placeholder="e.g. Apple" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Effective Date</label>
            <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Term Length (years)</label>
            <input type="number" name="termLength" value={formData.termLength} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description of Confidential Information</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="e.g. proprietary algorithms, trade secrets..." required></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                Generating...
                <span className="spinner" />
              </>
            ) : "Generate NDA"}
          </button>
        </div>
      </form>

      {/* Error Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Error</h3>
            <p>{error}</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* NDA Display + Download Options */}
      {generatedNDA && (
        <div className="mt-4" style={{ background: "#eef", padding: "20px", borderRadius: "8px" }}>
          <h3>📄 Generated NDA</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{generatedNDA}</pre>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={downloadTxt}>Download as .txt</button>
            <button onClick={handleDownloadPDF}>Download as PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
