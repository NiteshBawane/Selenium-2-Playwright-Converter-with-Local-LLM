import { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState('typescript');

    const handleConvert = async () => {
        if (!inputCode.trim()) return;
        setLoading(true);
        setOutputCode(''); // Clear previous output
        try {
            const res = await axios.post('/api/convert', {
                sourceCode: inputCode,
                targetLang: lang
            });
            if (res.data && res.data.convertedCode) {
                setOutputCode(res.data.convertedCode);
            }
        } catch (e) {
            console.error(e);
            setOutputCode('Error converting code. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col gap-6">
            <header className="flex justify-between items-center text-white border-b border-gray-700 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        🚀 Selenium 2 Playwright
                    </h1>
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Powered by <span className="font-mono text-purple-400">Qwen2.5:3b</span> (Local LLM)
                    </p>
                </div>
                <div className="flex gap-4">
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
                    >
                        <option value="typescript">TypeScript</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <button
                        onClick={handleConvert}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Converting...' : 'Convert Code'}
                    </button>
                </div>
            </header>

            <main className="flex-1 grid grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="flex flex-col bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                    <div className="bg-slate-900 px-4 py-2 text-sm text-gray-400 font-mono border-b border-slate-700 flex justify-between">
                        <span>JAVA INPUT</span>
                        <button onClick={() => setInputCode('')} className="hover:text-white">Clear</button>
                    </div>
                    <textarea
                        className="flex-1 bg-transparent p-4 font-mono text-sm resize-none focus:outline-none text-white"
                        placeholder="// Paste Selenium Java code here..."
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        spellCheck={false}
                    />
                </div>

                {/* Output Panel */}
                <div className="flex flex-col bg-slate-800 rounded-lg overflow-hidden border border-slate-700 relative">
                    <div className="bg-slate-900 px-4 py-2 text-sm text-gray-400 font-mono border-b border-slate-700 flex justify-between">
                        <span>PLAYWRIGHT OUTPUT</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(outputCode)}
                            className="hover:text-white"
                            disabled={!outputCode}
                        >
                            Copy
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto relative">
                        {outputCode ? (
                            <SyntaxHighlighter
                                language={lang}
                                style={vscDarkPlus}
                                customStyle={{ margin: 0, height: '100%', borderRadius: 0 }}
                                showLineNumbers={true}
                            >
                                {outputCode}
                            </SyntaxHighlighter>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 italic">
                                Result will appear here...
                            </div>
                        )}
                    </div>
                    {loading && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                            {/* Brain Animation */}
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-3xl">
                                    🧠
                                </div>
                            </div>

                            {/* Thinking Text */}
                            <div className="text-center">
                                <p className="text-lg font-semibold text-white mb-1">AI is thinking...</p>
                                <p className="text-sm text-gray-400">
                                    <span className="font-mono text-purple-400">Qwen2.5:3b</span> is analyzing your code
                                </p>
                            </div>

                            {/* Animated Dots */}
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
