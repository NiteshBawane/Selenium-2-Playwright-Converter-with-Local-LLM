# 🚀 Selenium to Playwright Converter (Local LLM)

Convert your Selenium Java (TestNG) test automation code to modern Playwright TypeScript/JavaScript using a local LLM (Qwen2.5:3b via Ollama).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Ollama](https://img.shields.io/badge/Ollama-Required-purple)

## ✨ Features

- 🧠 **Local AI Processing** - Uses Qwen2.5:3b model via Ollama (no cloud dependencies)
- 🎨 **Modern UI** - Beautiful React + Tailwind interface with syntax highlighting
- ⚡ **Real-time Conversion** - Instant feedback with AI thinking animations
- 📝 **Smart Conversion** - Maintains Page Object Model patterns and best practices
- 🔒 **Privacy First** - All processing happens locally on your machine

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Ollama** - [Download](https://ollama.com)
3. **Qwen2.5:3b Model** - Pull it using: `ollama pull qwen2.5:3b`

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/NiteshBawane/Selenium-2-Playwright-Converter-with-Local-LLM.git
cd Selenium-2-Playwright-Converter-with-Local-LLM
```

### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd ui
npm install
cd ..
```

### 3. Start Ollama
Make sure Ollama is running:
```bash
ollama serve
```

### 4. Run the Application

**Option A: Using the Launcher (Windows)**
```bash
start_node.bat
```

**Option B: Manual Start (All Platforms)**

Terminal 1 (Backend):
```bash
node server.js
```

Terminal 2 (Frontend):
```bash
cd ui
npm run dev
```

### 5. Open in Browser
Navigate to `http://localhost:3000`

## 📂 Project Structure

```
├── architecture/          # Architecture documentation
├── tools/                # Utility scripts
├── ui/                   # React frontend
│   ├── src/
│   │   ├── App.tsx      # Main UI component
│   │   └── index.css    # Tailwind styles
│   └── package.json
├── server.js             # Express backend
├── package.json          # Backend dependencies
└── README.md
```

## 🎯 Usage

1. **Paste Java Code**: Copy your Selenium Java code into the left panel
2. **Select Output Language**: Choose TypeScript or JavaScript
3. **Convert**: Click "Convert Code" and watch the AI work!
4. **Copy Result**: Use the Copy button to grab your Playwright code

## 🛠️ Configuration

Create a `.env` file in the root directory (optional):

```env
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=qwen2.5:3b
```

## 📸 Screenshots

*(Add screenshots of your UI here)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Ollama](https://ollama.com)
- Powered by [Qwen2.5](https://github.com/QwenLM/Qwen2.5)
- UI built with [React](https://react.dev) + [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

If you encounter any issues, please [open an issue](https://github.com/NiteshBawane/Selenium-2-Playwright-Converter-with-Local-LLM/issues).

---

Made with ❤️ by [Nitesh Bawane](https://github.com/NiteshBawane)
