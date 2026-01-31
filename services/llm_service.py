import requests
import re
import os
from dotenv import load_dotenv

load_dotenv()
OLLAMA_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434/api/generate")
MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")

def get_system_prompt(target_lang):
    lang_name = "TypeScript" if target_lang == "typescript" else "JavaScript"
    
    return f"""
You are an expert Test Automation Architect. Convert this Selenium Java (TestNG) code to Playwright {lang_name}.

Rules:
1. **Framework**: Use `@playwright/test`.
2. **Language**: Use strictly {lang_name}. {( "Add type annotations." if target_lang == "typescript" else "Do NOT use type annotations." )}
3. **Pattern**: Convert Page Classes to POM pattern. Convert Test Classes to `test()` specs.
4. **Locators**: Convert `By.id/css/xpath` to `page.locator(...)`.
5. **Assertions**: Use `await expect(locator).toBe...`.
6. **Output**: Return ONLY the code. No markdown backticks.
"""

def clean_output(text):
    text = re.sub(r'^```(typescript|javascript|js|ts)?\s*', '', text)
    text = re.sub(r'^```\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return text.strip()

def convert_code(source_code, target_lang="typescript"):
    prompt = f"{get_system_prompt(target_lang)}\n\n// Java Source:\n{source_code}\n\n// Playwright {target_lang} Output:"
    
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.2
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        result = response.json().get('response', '')
        return clean_output(result)
    except Exception as e:
        raise Exception(f"LLM Connection Error: {str(e)}")
