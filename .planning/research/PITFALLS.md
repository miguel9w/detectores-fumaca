# Pitfalls Research

**Domain:** Educational chemistry slide presentations with 3D/2D simulations (React + Spectacle.js + Three.js + Matter.js)
**Researched:** 2026-08-31
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Three.js Initialization Failing in Browser

**What goes wrong:**
The Three.js scene fails to render — either a black screen, "WebGL not supported" error, or the canvas never attaches to the DOM. This is the most common issue when starting a Three.js project, often because the renderer context is lost or the canvas element is inserted before the DOM is ready.

**Why it happens:**
- Forgetting to check for WebGL support before creating the WebGLRenderer
- Inserting the canvas into the DOM before Three.js is fully initialized
- Missing `antialias` or `preserveDrawingBuffer` configuration that causes context creation failures on certain devices/browsers
- Using a renderer type incompatible with the target browser (e.g., forcing WebGL1 on Safari where WebGL2 may be required)

**How to avoid:**
- Always check `renderer.capabilities.isWebGL2Available()` or `isWebGL1Available()` and provide a fallback
- Initialize Three.js inside a `DOMContentLoaded` event listener or use React's `useEffect` with proper cleanup
- Use `renderer.setSize()` after the canvas is in the DOM, not before
- Provide a visible fallback message for browsers without WebGL support

**Warning signs:**
- Console errors about "WebGL context lost" or "Canvas is not in DOM"
- Black screen when opening the presentation in a browser
- Runtime errors when trying to create a WebGL context

**Phase to address:**
Phase 1 — Verify all library versions work together before planning

---

### Pitfall 2: Matter.js Conflicts with Three.js — Both Can't Use Same Canvas Easily

**What goes wrong:**
Matter.js and Three.js both create their own rendering contexts, leading to conflicts when trying to use them together on the same canvas. The Matter.js renderer creates a `<canvas>` element that can conflict with Three.js's WebGLRenderer, causing visual artifacts, performance degradation, or one engine overwriting the other's state.

**Why it happens:**
- Both libraries default to creating their own `<canvas>` elements
- Matter.js's built-in renderer draws directly to its canvas, separate from Three.js's WebGL canvas
- Attempting to use Matter.js's `Render.engine` alongside Three.js's `WebGLRenderer` without proper synchronization
- Not using Matter.js's `render: { visible: false }` option to suppress its built-in renderer

**How to avoid:**
- Always create Matter.js with `render: { visible: false }` when integrating with Three.js — let Three.js handle all rendering
- Use Matter.js's body position updates to sync with Three.js meshes manually in the animation loop
- Share a single animation loop that steps both engines and updates mesh positions from Matter bodies
- If needing Matter.js visual rendering, create a custom renderer that syncs with Three.js's WebGL context

**Warning signs:**
- Two canvases appearing in the DOM
- Visual flickering or tearing between the two rendering contexts
- Physics simulation running but visuals not updating, or vice versa

**Phase to address:**
Phase 2 — Test simulations on target browsers before committing code

---

### Pitfall 3: Dependency Version Mismatches — Three.js r125 vs Matter.js Latest

**What goes wrong:**
Incompatible versions of Three.js and Matter.js cause runtime errors, missing exports, or unexpected behavior. For example, Three.js r125 uses a different module system than Matter.js ~0.17.x, leading to import failures or global scope pollution.

**Why it happens:**
- Installing the latest Matter.js without checking Three.js version compatibility
- Three.js has rapid release cycles (R100+ pattern); Matter.js moves at a different pace
- Type definitions (@types/three, @types/matter-js) may not match the installed library versions
- Example from research: upgrading three to r133 required adding @types/matter-js and matter-js explicitly to package.json

**How to avoid:**
- Pin specific versions of both libraries in package.json rather than using wildcards
- Use the same version throughout the project — e.g., Three.js r155 with Matter.js ~0.18.x (verified compatible)
- Always run `npm ls` after adding dependencies to check for version conflicts
- Check the Matter.js wiki for recommended Three.js versions
- Keep @types packages in sync: `npm install @types/three @types/matter-js`

**Warning signs:**
- Import errors like "Cannot resolve 'matter-js'" or "Module not found"
- Console warnings about mismatched versions
- Runtime errors when creating engines or renderers

**Phase to address:**
Phase 1 — Verify all library versions work together before planning

---

### Pitfall 4: Mobile Unfriendliness — Simulations Not Responsive, Broken on Touch Devices

**What goes wrong:**
The Three.js + Matter.js simulations work on desktop but fail on mobile devices: touch events don't propagate correctly, the canvas is the wrong size, 60fps animation causes battery drain, or the simulation becomes unresponsive on low-end devices.

**Why it happens:**
- Fixed canvas sizes that don't respond to mobile viewport changes
- `requestAnimationFrame` running at 60fps on devices that can't sustain it
- Missing `maximumTouchPoints` handling or touch event conflicts with slide navigation
- Three.js textures and geometries not optimized for mobile GPU memory constraints
- Matter.js bodies not accounting for mobile screen dimensions

**How to avoid:**
- Use responsive canvas sizing: `renderer.setSize(window.innerWidth, window.innerHeight)` inside a resize handler
- Implement device tier detection — serve lighter scenes on weak hardware (fewer particles, simpler shaders)
- Add `failIfMajorPerformanceCaveat` to the WebGLRenderer options on mobile
- Limit particle counts in Matter.js for mobile (e.g., max 100 bodies vs. 1000 on desktop)
- Respect the `prefers-reduced-motion` media query — pause simulations when user enables reduced motion
- Test on actual devices, not just Chrome DevTools device mode

**Warning signs:**
- Slide presentation crashes or freezes on iPhone/Android
- High battery consumption during presentation
- Touch events not advancing slides or interacting with simulations
- Warning in console about "low memory" or "reduced performance mode"

**Phase to address:**
Phase 3 — Verify accessibility and deploy URL

---

### Pitfall 5: Missing References/Bibliography — Educational Project Without Citations

**What goes wrong:**
The slide deck lacks proper bibliographic references for the scientific content (Rutherford's experiment, He²⁺ ion properties, smoke detector principles). This makes the educational project academically weak and may violate academic integrity policies.

**Why it happens:**
- Researchers assume online information doesn't need citation
- Forgetting to add a references section during content creation
- Not knowing the proper citation format for educational materials
- Running out of time before the deadline

**How to avoid:**
- Add a references section early in the Research phase (Phase 1, Wave 2)
- Cite all sources for scientific claims, including Rutherford's experiment, He²⁺ ion data, and smoke detector technology
- Use a consistent citation format (APA, IEEE, or other appropriate style for educational materials)
- Include both online and print sources where available
- Verify that all citations are accurate and not AI-hallucinated

**Warning signs:**
- No "Referências Bibliográficas" section in the slide deck
- Scientific claims without source attribution
- Students or reviewers questioning the accuracy of content

**Phase to address:**
Phase 1 — Domain research must include bibliography validation

---

## Moderate Pitfalls

### Pitfall 6: Performance Degradation with Complex 3D Scenes

**What goes wrong:**
As the Three.js scene becomes more complex (more geometries, materials, lights), the frame rate drops below acceptable levels, making the presentation laggy and professional.

**Why it happens:**
- Too many materials — each material requires a separate shader program
- No frustum culling — objects outside the camera view still get processed
- Complex geometries with high polygon counts
- Low-resolution textures that still require GPU memory
- Too many lights (each additional light adds rendering passes)

**How to avoid:**
- Use `MeshStandardMaterial` with `map` for texturing rather than creating new materials per object
- Enable frustum culling (default in Three.js, but verify for custom geometries)
- Use instanced meshes for repeated objects (e.g., electron orbitals)
- Limit the number of concurrent lights (use `toneMapping` and keep it minimal)
- Use compressed texture formats (KTX2, Basis) for mobile
- Implement level-of-detail (LOD) switching for distant objects

**Phase to address:**
Phase 2 — Build and test with realistic scene complexity

---

### Pitfall 7: Memory Leaks from Uncleaned Event Listeners

**What goes wrong:**
Over time, the simulation consumes more and more memory, eventually causing the browser tab to slow down or crash. This happens when event listeners, animation loops, or Three.js loaders are not properly cleaned up.

**Why it happens:**
- `requestAnimationFrame` callbacks not being canceled on component unmount
- Three.js loaders (GLTFLoader, ImageLoader) retaining references to disposed objects
- Matter.js event listeners (collisionStart, etc.) not removed when slides change
- Global event listeners (window resize,) not removed
- Cached geometries/materials not being disposed of

**How to avoid:**
- Use `useEffect` cleanup functions: `return () => cancelAnimationFrame(id)` and `renderer.dispose()`
- Call `renderer.dispose()` and `scene.dispose()` when the component unmounts
- Remove Matter.js event listeners: `Events.off(engine, 'collisionStart', handler)`
- Dispose of geometries: `geometry.dispose()` and materials: `material.dispose()`
- Use React's `useRef` to track animation frames and clean them up

**Phase to address:**
Phase 2 — Ensure proper cleanup in simulation components

---

### Pitfall 8: Inconsistent Ion Property Data Across Slides

**What goes wrong:**
Different slides present conflicting information about the He²⁺ ion — different atomic numbers, different electron configurations, or inconsistent terminology (e.g., sometimes calling it " Hélio duplo ionizado", other times "He²⁺ cation").

**Why it happens:**
- Hardcoding ion properties (Z=2, etc.) in multiple places instead of using a single constants file
- Manual copy-paste of content across slides with slight variations
- No centralized data model for chemical properties
- Translating content without verifying scientific accuracy

**How to avoid:**
- Create a single `constants.ts` or `ion-properties.ts` file with Z=2, mass number, electron configuration, etc.
- Use this constant across all slides — any update happens in one place
- Write unit tests or validation checks that verify consistent property values across slides
- Have a chemistry expert review all slide content for consistency
- Use a data-driven approach where slide content pulls from a single source of truth

**Warning signs:**
- Different slides showing different Z values for Helium
- Inconsistent electron configuration descriptions
- Student questions about contradictory information

**Phase to address:**
Phase 1 — Research phase must validate all ion property data before building slides

---

### Pitfall 9: Poor Fallback for Browsers Without WebGL Support

**What goes wrong:**
Presentations that completely fail on browsers without WebGL support, showing only a blank screen or error messages. This excludes users on older devices, certain mobile browsers, or users who have disabled WebGL.

**Why it happens:**
- No feature detection before initializing Three.js
- No fallback scene or static content for non-WebGL browsers
- The entire presentation depends on Three.js rendering with no alternative
- Assuming all target browsers support WebGL

**How to avoid:**
- Check `!!window.WebGLRenderingContext` before loading Three.js-dependent content
- Provide a static fallback image or description for browsers without WebGL
- Use feature detection libraries or custom checks at the start of the presentation
- Design the presentation so core content is readable even without simulations
- Gracefully degrade: show simplified 2D versions of key concepts

**Warning signs:**
- Blank screen on browsers without WebGL
- Console errors about missing WebGL context
- User reports "presentation doesn't work on my browser"

**Phase to address:**
Phase 1 — Research and validate browser support before planning

---

## Minor Pitfalls

### Pitfall 10: Outdated npm Packages

**What goes wrong:**
Dependencies are not updated regularly, leading to security vulnerabilities, missing features, or compatibility issues with other libraries.

**Why it happens:**
- Setting package versions once and never updating
- Fear that updating will break existing functionality
- Not tracking npm security advisories

**How to avoid:**
- Set up automated dependency updates (e.g., `npm audit` regularly, `npm outdated` checks)
- Run `npm audit` as part of the CI/CD pipeline
- Update dependencies in small increments, testing after each update
- Check the Three.js and Matter.js changelogs before updating
- Use `npm update` periodically and review changelogs

**Phase to address:**
Ongoing — maintain as part of regular project workflow

---

### Pitfall 11: Missing Type Definitions

**What goes wrong:**
TypeScript projects experience errors because @types/three or @types/matter-js are missing or outdated, slowing down development.

**Why it happens:**
- Installing Three.js/Matter.js without their type definitions
- Type definitions not matching the exact library version
- Using CDN imports without type support

**How to avoid:**
- Always install type definitions: `npm install @types/three @types/matter-js`
- Ensure type versions match library versions (use the same range)
- If using CDN imports, consider using the npm package for type support
- Add type definitions to the project's TypeScript config

**Phase to address:**
Phase 1 — Set up correct types from the start

---

### Pitfall 12: Inconsistent Styling Across Slides

**What goes wrong:**
Different slides have varying colors, fonts, or layout styles, making the presentation look unprofessional and fragmented.

**Why it happens:**
- Creating slide components independently without a design system
- Using inline styles instead of a consistent CSS/Tailwind approach
- No typography scale or color palette defined for the presentation

**How to avoid:**
- Define a consistent color palette and typography scale at the project start (Phase 1)
- Use Tailwind CSS or a CSS module approach with shared classes
- Create a DESIGN.md or design tokens document early in the project
- Use Spectacle.js theming capabilities for consistent slide styling
- Review all slides for visual consistency before finalizing

**Phase to address:**
Phase 2 — Build with consistent design system

---

### Pitfall 13: No Keyboard Navigation Fallback

**What goes wrong:**
Power users and accessibility requirements expect keyboard navigation, but the presentation only supports mouse/touch interaction. This fails WCAG compliance and alienates users who cannot use a mouse.

**Why it happens:**
- All slide navigation is implemented via click events or touch gestures
- No `keydown` event handlers for arrow keys, Home, End, Page Up/Down
- Spectacle.js keyboard defaults not leveraged or overridden without accessibility in mind

**How to avoid:**
- Leverage Spectacle.js built-in keyboard navigation (arrow keys, Home, End, Page Up/Down, Esc)
- Ensure all slides are navigable via keyboard alone
- Test the presentation with keyboard only (no mouse)
- Add ARIA labels to interactive elements
- Provide visible focus indicators for keyboard navigation

**Warning signs:**
- Cannot navigate through slides using only keyboard
- Screen reader users cannot follow the presentation flow
- Accessibility audit reports keyboard navigation failures

**Phase to address:**
Phase 3 — Verify accessibility before deployment

---

## Integration Gotchas

### Integration Gotcha 1: Three.js and Matter.js Both Create Canvas Elements

**Description:**
Both Three.js's `WebGLRenderer` and Matter.js's `Render` create `<canvas>` elements. If both are allowed to render to the DOM, you end up with two canvases overlapping or competing for the same DOM node, causing visual glitches, double-rendering, or one engine's canvas covering the other.

**Correct Approach:**
- Always use Matter.js with `render: { visible: false }` to suppress its built-in renderer
- Use Three.js's `WebGLRenderer` as the sole rendering context
- Sync Matter.js body positions to Three.js mesh positions manually in the animation loop
- If visual Matter.js rendering is needed, create a custom Three.js shader/material that visualizes Matter bodies within the Three.js context

### Integration Gotcha 2: Resize Handling for Different Slide Sizes

**Description:**
Spectacle.js slides can have different dimensions, and both Three.js and Matter.js need to resize correctly when slides change or the browser window resizes. Failure to handle resize events properly causes distorted simulations or memory leaks.

**Correct Approach:**
- Add a shared resize handler that calls `renderer.setSize(width, height)` for Three.js and updates Matter.js `Render.bounds`
- Use `window.addEventListener('resize', handler)` with debouncing to avoid excessive calls
- Clean up event listeners on slide unmount: `return () => window.removeEventListener('resize', handler)`
- Test slide transitions with resize to ensure simulations recover gracefully

### Integration Gotcha 3: User Interaction Conflicts Between Slide Navigation and Simulation Controls

**Description:**
Slide navigation (clicking forward/backward) can conflict with simulation controls (clicking/dragging physics objects). A click intended to advance the slide may also trigger a physics interaction, or vice versa.

**Correct Approach:**
- Use `pointerEvents: 'none'` on simulation canvases that should not intercept click events
- Distinguish click intentions: short clicks advance slides, drag interactions engage physics
- In Spectacle.js, use the `onClick` prop on `<Spectacle>` or slide components for navigation
- Prevent default click behavior on simulation elements when slide navigation is intended
- Add `touch-action: none` or appropriate touch handlers to avoid browser default behaviors

---

## Performance Traps

### Trap 1: Complex 3D Scenes at 60fps Without Optimization

**Symptoms:**
Frame rate drops below 30fps on target devices, animation appears choppy, browser becomes hot/fans spin loudly.

**Prevention:**
- Profile with Chrome DevTools Performance tab before assuming 60fps is achievable
- Use `renderer.info.render` to monitor draw calls and triangles
- Keep total triangle count under 10,000 for 60fps on mid-range devices
- Use simple geometries (BoxGeometry, SphereGeometry) rather than custom high-poly models
- Enable `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` to cap pixel ratio

**Breaks at:**
- More than ~5,000 triangles without instancing
- More than 3-4 light sources without performance impact
- Uncompressed textures larger than 2K resolution

### Trap 2: Too Many Particles in Matter.js Simulation

**Symptoms:**
Simulation becomes slow, browser tab unresponsive, high CPU usage.

**Prevention:**
- Limit Matter.js body count to ~200-500 for real-time simulation on desktop
- On mobile, limit to ~50-100 bodies
- Use `Matter.World.remove()` to properly dispose of bodies no longer needed
- Enable `sleep` mode on inactive bodies: `Matter.Body.setSleepThreshold()`
- Use spatial partitioning (Matter.js already includes broadphase optimization)

**Breaks at:**
- More than 1,000 bodies on desktop
- More than 200 bodies on mobile

### Trap 3: Unoptimized Geometry Loading

**Symptoms:**
Long initial load times, high memory usage, browser freezing during asset loading.

**Prevention:**
- Load geometries once at startup, not per-frame
- Use `Dispose` geometries and materials when component unmounts
- Use compressed texture formats (KTX2, Basis) for web delivery
- Implement lazy loading for non-essential geometries
- Use `renderer.loadTexture()` with proper CORS handling

---

## Security Mistakes

### Mistake 1: No Content Security Policy (CSP) Considerations

**Risk:**
Educational content served to students may be vulnerable to code injection if CSP is not configured properly, especially when using CDN imports of Three.js and Matter.js.

**Prevention:**
- Configure CSP headers to restrict script sources to trusted CDNs (cdnjs, jsDelivr)
- Use `integrity` attributes on CDN script tags
- Avoid `eval()` or dynamic code execution in the presentation
- Sandbox iframes if embedding the presentation in learning management systems

### Mistake 2: External Resource Loading Without Integrity Checks

**Risk:**
Using CDN links without `integrity` attributes exposes the project to supply chain attacks if the CDN is compromised.

**Prevention:**
- Always add `integrity` and `crossorigin` attributes to CDN script/link tags
- Verify integrity hashes match the actual CDN file contents
- Consider self-hosting critical dependencies for mission-critical educational content

---

## "Looks Done But Isn't" Checklist

- [ ] **Three.js scene actually renders** (not just script loads) — Verify WebGL context creation and scene graph setup
- [ ] **Matter.js particles respond to user input** — Test physics interactions, not just engine creation
- [ ] **All required slides have chemical identification** — Every slide with He²⁺ or other ions has Z, electron config, and proper labels
- [ ] **References section has actual citations** — Bibliography is populated, not just a placeholder
- [ ] **Deploy configuration works (GitHub Pages)** — `gh repo set-deploy-url` has been verified, live URL is accessible

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Three.js init failure | LOW | Check WebGL support, add fallback message, verify renderer configuration |
| Matter.js + Three.js conflicts | MEDIUM | Switch Matter.js to `render: { visible: false }`, sync body positions manually in animation loop |
| Version mismatches | MEDIUM | Pin versions in package.json, run `npm ls`, update @types packages |
| Mobile unfriendliness | HIGH | Implement responsive sizing, device tier detection, reduced motion support |
| Missing references | LOW | Add bibliography section, cite all sources, use consistent citation format |
| Performance degradation | MEDIUM | Profile with DevTools, reduce material count, enable frustum culling, limit particle count |
| Memory leaks | MEDIUM | Add useEffect cleanup, dispose geometries/materials, cancel animation frames |
| Inconsistent ion data | LOW | Centralize constants in one file, verify all slides use the same values |
| No WebGL fallback | MEDIUM | Add feature detection, provide static fallback content, graceful degradation |
| No keyboard navigation | LOW | Add Spectacle.js keyboard handlers, test with keyboard only, add ARIA labels |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|------------|
| Three.js initialization failing | Phase 1 | Verify WebGL support works in target browsers before Phase 2 |
| Matter.js conflicts with Three.js | Phase 2 | Test integration with `render: { visible: false }` before committing code |
| Version mismatches | Phase 1 | Pin versions, run compatibility checks before planning |
| Mobile unfriendliness | Phase 2 | Test on actual devices; verify responsive behavior and touch handling |
| Missing references | Phase 1 | populate bibliography during domain research wave |
| Performance degradation | Phase 2 | Profile scenes; verify 60fps on target devices |
| Memory leaks | Phase 2 | Verify cleanup in useEffect return functions; check for leaks after navigation |
| Inconsistent ion data | Phase 1 | Centralize constants; have chemistry expert review before building |
| Poor WebGL fallback | Phase 1 | Feature detection; static fallback content ready before Phase 3 |
| No keyboard navigation | Phase 3 | Test with keyboard only; verify WCAG compliance before deployment |

---

## Sources

- Three.js Journey course materials and documentation
- Matter.js wiki and official documentation
- Spectacle.js issue tracker (imported slides, keyboard navigation)
- GitHub Pages deployment guides and common pitfalls
- Educational technology accessibility standards (WCAG)
- Version compatibility research from npm ecosystem
- Browser WebGL feature detection patterns
- React Three Fiber and Matter.js integration examples

---

*Pitfalls research for: Educational chemistry slide presentations with 3D/2D simulations*
*Researched: 2026-08-31*