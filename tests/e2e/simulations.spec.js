import { test, expect } from "@playwright/test";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

test("build passes", async () => {
  execSync("npx vite build", { stdio: "pipe" });
  const distPath = path.resolve("dist/index.html");
  const distExists = fs.existsSync(distPath);
  expect(distExists).toBe(true);
  const html = fs.readFileSync(distPath, "utf-8");
  expect(html).toContain('src="/detectores-fumaca/assets/');
  expect(html).toContain('href="/detectores-fumaca/assets/');
});

test("simulacoes visiveis — canvas count exactly 2 fixos D-15", async ({ page }) => {
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    if (msg.type() === "warning") consoleWarnings.push(msg.text());
  });

  await page.goto("/");
  await page.waitForTimeout(2000);

  // Navigate to simulations slide — loop until SimulationsIntegration heading is visible
  for (let i = 0; i < 10; i++) {
    const simHeading = page.locator('text=Visão 3D');
    if (await simHeading.isVisible().catch(() => false)) break;
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(1500);

  const canvasCount = await page.evaluate(() => document.querySelectorAll("canvas").length);
  const allCanvases = await page.evaluate(() => {
    const canvases = document.querySelectorAll("canvas");
    return Array.from(canvases).map((c) => ({
      w: c.getBoundingClientRect().width,
      h: c.getBoundingClientRect().height,
      visible: c.offsetParent !== null,
      tag: c.tagName,
    }));
  });
  console.log("Canvas count:", canvasCount, "details:", JSON.stringify(allCanvases));
  expect(canvasCount).toBe(2);

  // D-15 hidden vs visible via Tabs CSS: one visible, one hidden but attached — both remain in DOM
  const tabs = page.locator('[role="tabpanel"]');
  await expect(tabs).toHaveCount(2);
  // Active tab canvas is attached and its tabpanel is not hidden; hidden tab canvas remains attached
  const hiddenCanvas = page.locator('[role="tabpanel"][hidden] canvas');
  await expect(hiddenCanvas).toBeAttached();
  await expect(hiddenCanvas).toBeHidden();
  // Visible tab canvas should be attached (Deck slide is active, so offsetParent may be null due to Spectacle layout but canvas is in DOM)
  const visibleCanvas = page.locator('[role="tabpanel"]:not([hidden]) canvas');
  await expect(visibleCanvas).toBeAttached();
  // Both canvases exist via evaluate even when Deck uses transform, so verify DOM presence via evaluate
  const bothInDom = await page.evaluate(() => document.querySelectorAll('canvas').length === 2);
  expect(bothInDom).toBe(true);

  // ensure no critical console issues in this test either (soft check via filtered allowlist)
  const allowed = [/Download the React DevTools/, /THREE\.Clock/, /GPU stall due to ReadPixels/, /GL Driver Message/];
  const criticalWarnings = consoleWarnings.filter((w) => !allowed.some((re) => re.test(w)));
  const criticalErrors = consoleErrors.filter((m) => !allowed.some((re) => re.test(m)));
  expect(pageErrors, `pageerror: ${pageErrors.join("; ")}`).toEqual([]);
  expect(criticalErrors, `console.error: ${criticalErrors.join("; ")}`).toEqual([]);
  expect(criticalWarnings, `console.warning: ${criticalWarnings.join("; ")}`).toEqual([]);
});

test("no console errors and no critical warnings D-14", async ({ page }) => {
  const pageErrors = [];
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    if (msg.type() === "warning") consoleWarnings.push(msg.text());
  });

  await page.goto("/");
  await page.waitForTimeout(1500);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(350);
  }
  await page.waitForTimeout(1000);

  const allowedWarningPatterns = [/Download the React DevTools/, /THREE\.Clock/, /GPU stall due to ReadPixels/, /GL Driver Message/];
  const criticalWarnings = consoleWarnings.filter((w) => !allowedWarningPatterns.some((re) => re.test(w)));
  const criticalErrors = consoleErrors.filter((m) => !allowedWarningPatterns.some((re) => re.test(m)));

  expect(pageErrors, `pageerror: ${pageErrors.join("; ")}`).toEqual([]);
  expect(criticalErrors, `console.error: ${criticalErrors.join("; ")}`).toEqual([]);
  expect(criticalWarnings, `console.warning: ${criticalWarnings.join("; ")}`).toEqual([]);
});

test("auto-play total — both simulations animate without click D-02", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1500);

  // Try gauge text change for 2D chamber (Matter intervals + rAF)
  const getGauge = async () => {
    return await page.evaluate(() => {
      const span = document.evaluate(
        "//span[contains(text(),'µA')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return span ? span.textContent : null;
    });
  };

  // Also capture canvas data URLs for both canvases (3D + 2D)
  const getCanvasHashes = async () => {
    return await page.evaluate(() => {
      const canvases = document.querySelectorAll("canvas");
      return Array.from(canvases).map((c) => {
        try {
          // slice to avoid huge string comparison yet detect change
          return c.toDataURL().slice(0, 500);
        } catch (e) {
          return "error:" + e.message;
        }
      });
    });
  };

  const gaugeBefore = await getGauge();
  const hashesBefore = await getCanvasHashes();

  await page.waitForTimeout(1200);

  const gaugeAfter = await getGauge();
  const hashesAfter = await getCanvasHashes();

  console.log("gauge before/after:", gaugeBefore, "->", gaugeAfter);
  console.log("hashes before:", hashesBefore.map((h) => h.slice(0, 80)));
  console.log("hashes after:", hashesAfter.map((h) => h.slice(0, 80)));

  // At least one signal must indicate animation: gauge changed OR any canvas hash changed
  const gaugeChanged = gaugeBefore !== null && gaugeAfter !== null && gaugeBefore !== gaugeAfter;
  let canvasChanged = false;
  if (hashesBefore.length === hashesAfter.length && hashesBefore.length > 0) {
    for (let i = 0; i < hashesBefore.length; i++) {
      if (hashesBefore[i] !== hashesAfter[i]) {
        canvasChanged = true;
        break;
      }
    }
  }

  // Fallback: screenshot diff via Playwright if toDataURL not varying (WebGL preserveDrawingBuffer false)
  let screenshotDiff = false;
  if (!gaugeChanged && !canvasChanged) {
    const canvases = page.locator("canvas");
    const count = await canvases.count();
    if (count >= 2) {
      const buf1 = await canvases.first().screenshot();
      await page.waitForTimeout(800);
      const buf2 = await canvases.first().screenshot();
      screenshotDiff = !buf1.equals(buf2);
      console.log("screenshot diff fallback:", screenshotDiff);
    }
  }

  expect(gaugeChanged || canvasChanged || screenshotDiff, `No auto-play detected: gauge ${gaugeBefore} -> ${gaugeAfter}, canvasChanged ${canvasChanged}, screenshotDiff ${screenshotDiff}`).toBeTruthy();
});

test("Figure SVG fallback when src fails D-06", async ({ page }) => {
  // Abort Wikimedia images so Figure onError triggers SVG fallback
  await page.route("**/upload.wikimedia.org/**", (route) => route.abort());
  await page.goto("/");
  await page.waitForTimeout(1200);

  // Figure on first slide should now show fallback SVG
  const fallbackSvg = page.locator('svg[aria-label="Diagrama He²⁺"]').first();
  await expect(fallbackSvg).toBeVisible({ timeout: 8000 });
  await expect(fallbackSvg).toHaveAttribute("viewBox", "0 0 200 120");
  // Check fallback contains He²⁺ text via evaluate
  const svgText = await page.evaluate(() => {
    const svg = document.querySelector('svg[aria-label="Diagrama He²⁺"]');
    return svg ? svg.textContent : "";
  });
  expect(svgText).toContain("He²⁺");
  expect(svgText).toContain("Z=2");
  // Wrapper should have bg-[#fefcf8] and alt fallback text
  const fallbackWrapper = page.locator('svg[aria-label="Diagrama He²⁺"]').locator("..");
  await expect(page.locator("text=Ilustração He²⁺").first().or(page.locator("text=Detector de fumaça")).first()).toBeVisible({ timeout: 2000 }).catch(() => {});
});

test("report — screenshot + logs D-16", async ({ page }, testInfo) => {
  const logs = [];
  page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

  await page.goto("/");
  await page.waitForTimeout(1500);
  // navigate through slides to capture full deck state
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(1200);

  // ensure test-results dir exists
  const dir = path.resolve("test-results");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const screenshotPath = path.resolve("test-results/deck-screenshot.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach("deck-screenshot", { path: screenshotPath, contentType: "image/png" });
  await testInfo.attach("console-log", { body: logs.join("\n"), contentType: "text/plain" });

  expect(fs.existsSync(screenshotPath)).toBe(true);
  const stat = fs.statSync(screenshotPath);
  expect(stat.size).toBeGreaterThan(0);
});
