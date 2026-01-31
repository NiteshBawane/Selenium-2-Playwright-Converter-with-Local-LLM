# ♊ gemini.md - Project Constitution

**Project:** Selenium (Java) to Playwright (JS/TS) Converter
**Status:** Phase 1 (Blueprint)
**Protocol:** B.L.A.S.T.

---

## 📐 Data Schemas (The Law)

### 1. Input Schema (JavaCodePayload)
The system accepts a JSON object representing the source code.
```json
{
  "sourceCode": "string (Raw Java Selenium/TestNG code)",
  "sourceFileName": "string (Optional, e.g., 'LoginPage.java')",
  "isPageObject": "boolean (True if file is a POM, False if Test class)"
}
```

### 2. Output Schema (ConversionResult)
The system returns a JSON object with the converted result.
```json
{
  "success": "boolean",
  "tsCode": "string (Converted Playwright TypeScript code)",
  "outputPath": "string (Absolute path where file was saved)",
  "errors": ["string (List of conversion errors or warnings)"],
  "notes": ["string (AI generated comments/explanations)"]
}
```

---

## 🛡️ Behavioral Rules

1. **Target Language**: ALWAYS generate **TypeScript** (`.ts`).
2. **Framework Pattern**: Use **TestNG** to **Playwright Test Runner** mapping.
    - `@Test` -> `test('name', async ({ page }) => { ... })`
    - `@BeforeClass` -> `test.beforeAll(...)`
    - `@BeforeMethod` -> `test.beforeEach(...)`
3. **Design Pattern**: Detect and implement **Page Object Model (POM)** structure where classes define locators and methods.
4. **Readability**: Do not produce minified or obfuscated code. Prioritize clean, idiomatic TypeScript.
5. **Safety**: Do not overwrite input files.
6. **Self-Documentation**: Add `// Comment` explaining complex translations (e.g., explicit waits to auto-waiting).

---

## 🏛️ Architectural Invariants

1. **3-Layer Architecture**:
    *   **UI Layer**: HTML/JS frontend for input.
    *   **Logic Layer**: Python/Node script to parse and convert.
    *   **Storage Layer**: Local filesystem write.
2. **Data-First**: Validate input against `JavaCodePayload` before processing.
3. **Self-Healing**: If strict conversion fails for a specific line, wrap it in a `// TODO: Manual intervention required` comment rather than crashing the whole file.

---

## 🔧 Maintenance Log
- **[2026-01-31]**: Defined Input/Output Schemas and Behavioral Rules.
- **[Date]**: Initialized `gemini.md`.
