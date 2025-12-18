// api/generate-insights.js
export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question } = req.body;

    // 2. Forward the request to your Private Hugging Face Space
    const response = await fetch("https://developmentwellmatix-degradation-mechanisms-soh.hf.space/generate-insights", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`, // Pulled from Vercel Env Vars
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    // 3. Return the HF response back to your React frontend
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Failed to communicate with Hugging Face" });
  }
}
