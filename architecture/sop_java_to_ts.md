# SOP: Java to TypeScript Conversion Logic

**Goal**: deterministic conversion of Selenium Java code to Playwright TypeScript code using an LLM.

## 1. The Prompt Strategy
We use a **System Prompt** + **Code Context** strategy.

### System Prompt
> You are an expert Test Automation Architect. Your goal is to convert Selenium Java (TestNG) code into idiomatic Playwright TypeScript code.
> 
> **Rules:**
> 1. **Framework Mapping**:
>    - `By.id("foo")` -> `page.locator('#foo')`
>    - `driver.findElement(...)` -> `await page.locator(...)`
>    - `@Test` -> `test('...', async ({ page }) => { ... })`
> 2. **Page Object Model**:
>    - If the input is a Page Class, recreate it as a TS Class.
>    - Define locators as `readonly locator: Locator;` properties.
>    - Initialize locators in the `constructor`.
> 3. **Behavior**:
>    - Prefer `await expect(locator).toBeVisible()` over strict waits.
>    - Do not strictly transpile Java syntax (like `List<WebElement>`); use JS Arrays.
> 4. **Output Format**:
>    - Return ONLY the TypeScript code. No markdown backticks.

## 2. Process Flow
1. **Read Input**: Read the file content.
2. **Contextualize**: Is it a Page Object or a Test? (Simple heuristic: Contains `@Test` annotation = Test; otherwise POM).
3. **LLM Call**: Send payload to Ollama (`qwen2.5:3b`).
4. **Sanitize**: Strip markdown fences (` ```typescript `) if present.
5. **Save**: Write to `output/` directory with `.ts` extension.

## 3. Error Handling
- If LLM response is empty -> Retry once.
- If syntax error (heuristic) -> Log to `errors.log`.
