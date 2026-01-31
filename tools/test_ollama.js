const axios = require('axios');

const OLLAMA_URL = 'http://127.0.0.1:11434';

async function checkOllama() {
    console.log(`Checking connection to Ollama at ${OLLAMA_URL}...`);
    try {
        const res = await axios.get(OLLAMA_URL);
        console.log("✅ Ollama is reachable!");
        console.log("Response:", res.data);
        return true;
    } catch (e) {
        console.error("❌ Ollama is NOT reachable.");
        console.error("Error:", e.message);
        console.log("\nMake sure Ollama is running ('ollama serve') and 'codellama' is pulled.");
        return false;
    }
}

async function checkModel(modelName) {
    console.log(`\nChecking for model: ${modelName}...`);
    try {
        const res = await axios.get(`${OLLAMA_URL}/api/tags`);
        const models = res.data.models || [];
        const exists = models.some(m => m.name.includes(modelName));

        if (exists) {
            console.log(`✅ Model '${modelName}' is available.`);
        } else {
            console.log(`⚠️ Model '${modelName}' not found in local library.`);
            console.log("Existing models:", models.map(m => m.name).join(', '));
        }
    } catch (e) {
        console.error("Failed to list models.");
    }
}

(async () => {
    const isUp = await checkOllama();
    if (isUp) {
        await checkModel('qwen2.5'); // Updated to the model you requested previously
    }
})();
