export async function generateSummary(notes: string): Promise<string> {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({ inputs: notes }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        console.error("Hugging Face error:", data.error);
        return "Summary generation failed.";
      }
  
      return data[0]?.summary_text || "No summary generated.";
    } catch (error) {
      console.error("Error contacting Hugging Face:", error);
      return "Summary failed due to connection error.";
    }
  }
  