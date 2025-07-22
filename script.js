
const apiKey = "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"; // مفتاحك من OpenAI

async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (input.value.trim() === "") return;

    const userMessage = document.createElement("div");
    userMessage.textContent = "👤: " + input.value;
    chatBox.appendChild(userMessage);

    const loadingMessage = document.createElement("div");
    loadingMessage.textContent = "🤖: جاري التفكير...";
    chatBox.appendChild(loadingMessage);

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "أنت مساعد ذكي يساعد تلاميذ الجزائر في شهادة التعليم المتوسط بأسلوب شبابي رسمي." },
                    { role: "user", content: input.value }
                ]
            })
        });

        const data = await response.json();
        loadingMessage.textContent = "🤖: " + (data.choices?.[0]?.message?.content || "عذرا، ما قدرت نجاوب على هذا السؤال.");
    } catch (error) {
        loadingMessage.textContent = "🤖: حدث خطأ أثناء الاتصال. تأكد من مفتاح API.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
}
