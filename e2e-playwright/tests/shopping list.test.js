const { test, expect } = require("@playwright/test");

test("Adding and listing", async ({ page }) => {
  await page.goto("/lists");

  // Verify the page title
  await expect(page).toHaveTitle("Shopping Lists");

  //  Verify that the headers are visible and contain the expected text
  await expect(page.locator("h1")).toHaveText("Lists"); // Check the main title
  await expect(page.locator('h2:has-text("Add a list")')).toBeVisible(); // Check for "Add a list"
  await expect(page.locator('h2:has-text("Active lists")')).toBeVisible(); // Check for "Active lists"

  // Verify that the form for adding a list is present and visible
  await expect(page.locator('input[name="name"]')).toBeVisible(); // Input field for name
  await expect(page.locator('input[type="submit"][value="Create list!"]'))
    .toBeVisible(); // Submit button
});

test("Can create a list", async ({ page }) => {
  // Navigate to the lists page
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[name=name]").type(listName);
  await page.locator('input[type="submit"][value="Create list!"]').click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can open a list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator('input[name="name"]').type(listName);
  await page.locator('input[type="submit"][value="Create list!"]').click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(`Shopping List: ${listName}`);
});

test("Adding and listing items", async ({ page }) => {
  await page.goto("/lists/1");

  // Verify the page title
  await expect(page).toHaveTitle("Shopping Lists");

  //  Verify that the headers are visible and contain the expected text
  await expect(page.locator('h2:has-text("Add an Item")')).toBeVisible(); // Check for "Add a list"
  await expect(page.locator('h2:has-text("Items")')).toBeVisible(); // Check for "Active lists"

  // Verify that the form for adding a item is present and visible
  await expect(page.locator('input[name="name"]')).toBeVisible(); // Input field for name
  await expect(page.locator('input[type="submit"][value="Add Item"]'))
    .toBeVisible(); // Submit button
});
test("Can add an item", async ({ page }) => {
  // Navigate to the lists page
  await page.goto("/lists/1");
  const itemName = `Item: ${Math.random()}`;
  await page.locator("input[name=name]").type(itemName);
  await page.locator('input[type="submit"][value="Add Item"]').click();
  await page.waitForSelector(`text='${itemName}'`);
  await expect(page.locator(`text='${itemName}'`)).toContainText(itemName);
});

test("mark item as collected", async ({ page }) => {
  // Navigate to the list page
  await page.goto("/lists/1");

  // Generate a random item name
  const itemName = `Item: ${Math.random()}`;

  // Fill in the form and submit it
  await page.waitForSelector('input[name="name"]', {
    state: "visible",
    timeout: 15000,
  });
  await page.locator('input[name="name"]').type(itemName);
  await page.locator('input[type="submit"][value="Add Item"]').click();

  // Wait for the item to appear in the list
  await page.waitForSelector(`text='${itemName}'`, { timeout: 20000 });
  // Verify the item has been added
  await expect(page.locator(`text='${itemName}'`)).toHaveText(
    new RegExp(itemName.trim()),
  );

  // Mark the item as collected
  const buttonLocator = page.locator(
    `li:has-text("${itemName}") >> input[value="Mark collected!"]`,
  );
  // Wait for the button to be visible before clicking
  await buttonLocator.waitFor({ state: "visible", timeout: 20000 });
  await buttonLocator.click();

  // Wait for the item to be marked as collected
  await expect(page.locator(`text='${itemName}'`)).toHaveCSS(
    "text-decoration",
    /line-through/,
  );
});
test("Can deactivate a shopping list", async ({ page }) => {
  // Go to the shopping lists page
  await page.goto("/lists");

  // Create a new list with a unique name
  const listName = `Test List: ${Math.random()}`;
  await page.locator("input[name='name']").fill(listName);
  await page.locator('input[type="submit"][value="Create list!"]').click();

  // Wait for the list to appear
  const listLocator = page.locator(`text='${listName}'`);

  // Ensure the list is visible
  await expect(listLocator).toBeVisible({ timeout: 10000 });

  // Wait for the deactivate button associated with the newly created list
  const deactivateButton = listLocator.locator("..").locator(
    'input[type="submit"][value="Deactivate list!"]',
  );

  // Ensure the deactivate button is visible
  try {
    await expect(deactivateButton).toBeVisible({ timeout: 10000 });
  } catch (error) {
    console.error(
      "Deactivate button not found. Page content:",
      await page.content(),
    );
    throw error; // Rethrow the error after logging
  }

  // Deactivate the list
  await deactivateButton.click();

  // Verify that the list no longer appears
  await expect(listLocator).not.toBeVisible({ timeout: 10000 });
});
