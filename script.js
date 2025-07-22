const apiKey = "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"
async function sendMessage(userInput) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "أنت مساعد شبابي رسمي لتلاميذ البيام في الجزائر، أجب فقط على الأسئلة المتعلقة بالبيام ولا تتحدث في مواضيع خارجة."
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById("response").textContent = data.choices[0].message.content;
  } else {
    console.error("API Error:", data);
    document.getElementById("response").textContent = "❌ حدث خطأ: تحقق من المفتاح أو من رصيدك في OpenAI.";
  }
}

document.getElementById("ask-button").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  document.getElementById("response").textContent = "⏳ يتم التحليل، انتظر...";
  await sendMessage(userInput);
});
