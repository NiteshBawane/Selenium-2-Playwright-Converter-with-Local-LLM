import requests
import json
import os
from dotenv import load_dotenv

# Load config
load_dotenv()
OLLAMA_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434/api/generate")
MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")

def test_ollama_connection():
    """
    Simple handshake to verify Ollama is up and the model is available.
    """
    print(f"🔌 Connecting to Ollama at {OLLAMA_URL} using model '{MODEL}'...")
    
    payload = {
        "model": MODEL,
        "prompt": "Say 'Connection Successful' if you can hear me. Do not add any other text.",
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        
        print("\n✅ Response Received:")
        print(f"   {data.get('response', '').strip()}")
        return True
    
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to Ollama. Is it running? (Try 'ollama serve')")
        return False
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        if hasattr(e, 'response') and e.response:
            print(f"   Status Code: {e.response.status_code}")
            print(f"   Content: {e.response.text}")
        return False

if __name__ == "__main__":
    test_ollama_connection()
