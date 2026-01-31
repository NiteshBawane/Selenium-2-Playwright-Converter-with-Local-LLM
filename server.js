const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;
const OLLAMA_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';

app.use(cors());
app.use(express.json());

// Initial handshake
app.get('/health', async (req, res) => {
    try {
        await axios.get('http://localhost:11434');
        res.json({ status: 'ok', ollama: 'connected' });
    } catch (e) {
        res.json({ status: 'ok', ollama: 'disconnected', error: e.message });
    }
});

app.post('/api/convert', async (req, res) => {
    const { sourceCode, targetLang } = req.body;

    // Construct Prompt
    const lang = targetLang === 'javascript' ? 'JavaScript' : 'TypeScript';
    const systemPrompt = `You are an expert Test Automation Architect. Convert this Selenium Java (TestNG) code to idiomatic Playwright ${lang}.
Rules:
1. Use '@playwright/test'.
2. Use Page Object Model if class detected.
3. Convert By.id/css/xpath to page.locator().
4. Use await expect().toBeVisible() style assertions.
5. Return ONLY code. No markdown backticks.`;

    const fullPrompt = `${systemPrompt}\n\n// Java Source:\n${sourceCode}\n\n// Playwright ${lang} Output:`;

    console.log(`⚡ Converting to ${lang}...`);

    try {
        const response = await axios.post(OLLAMA_URL, {
            model: MODEL,
            prompt: fullPrompt,
            stream: false,
            options: { temperature: 0.2 }
        });

        let code = response.data.response || '';
        // Cleanup Markdown
        code = code.replace(/```(typescript|javascript|js|ts)?/g, '').replace(/```/g, '').trim();

        res.json({ success: true, convertedCode: code });

    } catch (error) {
        console.error("LLM Error:", error.message);
        res.status(500).json({ error: "Failed to connect to Ollama. Is it running?" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
