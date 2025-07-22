
const apiKey = "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";

// دالة إرسال السؤال واستلام الجواب
async function sendMessage(userInput) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // يمكنك تغيير الموديل إذا أردت
      messages: [
        {
          role: "system",
          content: "أنت مساعد دراسي شبابي بأسلوب رسمي بسيط، موجه لتلاميذ شهادة التعليم المتوسط في الجزائر، وتقدم شروحات وتمارين ونصائح تخص البيام فقط. لا تخرج عن هذا المجال."
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

// زر الإرسال
document.getElementById("ask-button").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  document.getElementById("response").textContent = "⏳ يتم التحليل، انتظر...";
  await sendMessage(userInput);
});
