
const apiKey = "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";
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
