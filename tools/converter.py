import os
import requests
import json
import re

# Configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "qwen2.5:3b"
OUTPUT_DIR = "converted_output"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

SYSTEM_PROMPT = """
You are an expert Test Automation Architect. Convert this Selenium Java code to Playwright TypeScript.
Rules:
1. Use `test` from '@playwright/test'.
2. Use Page Object Model pattern if the input is a class.
3. Convert `@Test` to `test(...)`.
4. Convert `By.id` etc to `page.locator`.
5. Return ONLY the TypeScript code. No markdown formatting.
"""

def detect_type(java_code):
    if "@Test" in java_code:
        return "TEST_SPEC"
    return "PAGE_OBJECT"

def call_llm(java_code):
    prompt = f"{SYSTEM_PROMPT}\n\n// Java Code:\n{java_code}\n\n// TypeScript Code:"
    
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.2  # Keep it deterministic
        }
    }
    
    try:
        print(f"⏳ Sending to Ollama ({MODEL})...")
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        result = response.json().get('response', '')
        return result
    except Exception as e:
        print(f"❌ LLM Error: {e}")
        return None

def clean_output(text):
    # Remove markdown code blocks if present
    text = re.sub(r'^```typescript\s*', '', text)
    text = re.sub(r'^```\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return text.strip()

def convert_file(file_path):
    print(f"📂 Reading: {file_path}")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            java_code = f.read()
    except Exception as e:
        print(f"❌ File Read Error: {e}")
        return

    # Convert
    ts_code = call_llm(java_code)
    
    if not ts_code:
        print("❌ Failed into convert.")
        return

    # Clean
    ts_code = clean_output(ts_code)

    # Save
    base_name = os.path.basename(file_path)
    new_name = base_name.replace('.java', '.ts')
    output_path = os.path.join(OUTPUT_DIR, new_name)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    
    print(f"✅ Saved to: {output_path}")

# Example Runner (User can uncomment or call this function)
if __name__ == "__main__":
    # Create a dummy file for testing if none exists
    dummy_java = "Tools/TestLogin.java"
    if not os.path.exists(dummy_java):
        print(f"⚠️ No input file found. Creating dummy {dummy_java} for test...")
        os.makedirs("Tools", exist_ok=True)
        with open(dummy_java, "w") as f:
            f.write("""
package com.example;
import org.testng.annotations.Test;
import org.openqa.selenium.By;

public class TestLogin {
    @Test
    public void validLogin() {
        driver.findElement(By.id("user")).sendKeys("admin");
        driver.findElement(By.id("pass")).sendKeys("1234");
        driver.findElement(By.id("login")).click();
    }
}
            """)
    
    convert_file(dummy_java)
