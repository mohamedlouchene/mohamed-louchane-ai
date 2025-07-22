document.getElementById("ask-button").addEventListener("click", async () => {
  const input = document.getElementById("user-input").value;
  const responseBox = document.getElementById("response");

  if (!input.trim()) {
    responseBox.innerText = "❗ من فضلك أدخل سؤالًا حول شهادة التعليم المتوسط.";
    return;
  }

  responseBox.innerText = "⏳ جاري التفكير...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: input })
    });

    const data = await res.json();
    responseBox.innerText = data.reply || "❌ حدث خطأ أثناء توليد الإجابة.";
  } catch (err) {
    responseBox.innerText = "❌ حدث خطأ في الاتصال بالخادم.";
  }
});
