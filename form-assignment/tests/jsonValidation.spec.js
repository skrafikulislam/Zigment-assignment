import { test, expect } from "@playwright/test";

test("should display an error for invalid JSON", async ({ page }) => {
  await page.goto("http://localhost:5173");  

  const editor = await page.locator("textarea");  
  await editor.fill('{ "formTitle": "Test Form" ');  

  const errorMessage = await page.locator("text=Invalid JSON format");
  await expect(errorMessage).toBeVisible();
});

test('should generate form fields dynamically based on JSON', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
    const editor = await page.locator('textarea');
    const jsonInput = `{
      "formTitle": "Dynamic Form",
      "formDescription": "Generated dynamically",
      "fields": [
        { "type": "text", "label": "Name", "id": "name" }
      ]
    }`;
    await editor.fill(jsonInput);
  
    const field = await page.locator('label:text("Name")');
    await expect(field).toBeVisible();
  });

  
  test('should validate required fields and submit form', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
     
    const editor = await page.locator('textarea');
    const jsonInput = `{
      "formTitle": "Test Form",
      "fields": [
        { "type": "text", "label": "Name", "id": "name", "required": true }
      ]
    }`;
    await editor.fill(jsonInput);
  
     
    await page.click('button:text("Submit")');
    const error = await page.locator('text=Name is required');
    await expect(error).toBeVisible();
  
     
    await page.fill('input[id="name"]', 'John Doe');
    await page.click('button:text("Submit")');
    const success = await page.locator('text=Form submitted successfully');
    await expect(success).toBeVisible();
  });

  test('should render correctly on mobile and desktop screens', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
    // Test desktop view.
    await page.setViewportSize({ width: 1280, height: 720 });
    const desktopTitle = await page.locator('h1');
    await expect(desktopTitle).toBeVisible();
  
    // Test mobile view.
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileTitle = await page.locator('h1');
    await expect(mobileTitle).toBeVisible();
  });

  
  test('should display error for empty JSON input', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
    const editor = await page.locator('textarea');
    await editor.fill('');
  
    const error = await page.locator('text=JSON cannot be empty');
    await expect(error).toBeVisible();
  });
  
  test('should display error for invalid field types', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
    const editor = await page.locator('textarea');
    const invalidJson = `{
      "formTitle": "Test Form",
      "fields": [
        { "type": "invalidType", "label": "Invalid Field", "id": "invalid" }
      ]
    }`;
    await editor.fill(invalidJson);
  
    const error = await page.locator('text=Invalid field type');
    await expect(error).toBeVisible();
  });
  