from flask import Flask, request, jsonify, send_from_directory
from services.llm_service import convert_code
import os

app = Flask(__name__, static_folder='../public', static_url_path='')

@app.route('/')
def home():
    return send_from_directory('../public', 'index.html')

@app.route('/api/convert', methods=['POST'])
def convert():
    data = request.json
    source_code = data.get('sourceCode', '')
    target_lang = data.get('targetLang', 'typescript') # 'typescript' or 'javascript'
    
    if not source_code:
        return jsonify({"error": "No source code provided"}), 400

    print(f"⚡ Received request to convert to {target_lang}...")
    
    try:
        converted_code = convert_code(source_code, target_lang)
        return jsonify({
            "success": True,
            "convertedCode": converted_code
        })
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 S2P Server running at http://localhost:5000")
    app.run(port=5000, debug=True)
