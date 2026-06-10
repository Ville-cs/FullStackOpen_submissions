import { test, expect } from "@playwright/test";

test("todo component has delete button", async ({ page }) => {
  await page.goto("/");
  const button = page.getByText("delete");
  expect(button).toBeVisible;
});
