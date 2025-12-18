export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { input } = req.body;

    const response = await fetch("https://developmentwellmatix-solar-backend.hf.space/api", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }), 
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Solar Backend Proxy error:", error);
    return res.status(500).json({ error: "Failed to communicate with Solar Backend" });
  }
}
