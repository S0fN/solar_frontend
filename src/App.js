import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsArrowUp } from "react-icons/bs";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  setLoading(true);
  setResponse("");

  try {
    const res = await fetch("/api/solar-api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }), 
    });

    const data = await res.json();

    if (data.result) {
      setResponse(data.result);
    } else if (data.error) {
      setResponse("Error: " + data.error);
    } else {
      setResponse("No response");
    }

  } catch (err) {
    setResponse("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <h1 className="display-3 fw-bold mb-5 text-primary">Solar Cells</h1>

      <form onSubmit={handleSubmit} className="w-75 mb-4">
        <div className="input-group input-group-lg rounded-pill overflow-hidden shadow-sm">
          <input
            type="text"
            className="form-control border-0"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-light border-0">
            <BsArrowUp size={20} />
          </button>
        </div>
      </form>

      {loading && <div className="text-muted fs-5">Loading...</div>}

      {response && (
        <div className="card w-75 shadow-lg mt-4">
          <div className="card-body">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {response}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
  
