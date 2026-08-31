# Feature Research

**Domain:** Educational chemistry slide presentations (interactive web)
**Researched:** 2026-08-31
**Confidence:** MEDIUM

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Slide title with theme name | Students need to identify the topic immediately | LOW | Must include "Detectores de Fumaça e a Descoberta do Núcleo Atômico" |
| Chemical identification of He²⁺ (Z=2, charge +2, Cation) | Core content requirement — students must recognize the ion | LOW | Symbol, atomic number, charge state, terminology |
| Subatomic explanation: protons, electrons | Fundamental chemistry concept for target audience | LOW | Protons in nucleus, electrons lost/gained to form ion |
| Representative image of the ion | Visual reference helps comprehension | MEDIUM | Should show He²⁺ atomic structure diagram |
| Authorship section (name + turma) | Educational context — identifies student/school | LOW | Standard academic presentation element |
| References bibliography section | Academic integrity, source attribution | LOW | Proper citation format for chemistry content |
| Deploy to GitHub Pages | Project delivery mechanism, expected for web projects | MEDIUM | Must work with Spectacle.js build output |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| 3D simulation (Three.js) of atomic structure | Visualizes the 3D nature of atomic orbitals and nucleus; makes abstract concepts concrete | HIGH | Core differentiator; requires Three.js setup, scene, camera, renderer; He²⁺ orbital visualization |
| 2D simulation (Matter.js) of interactions | Demonstrates particle interactions and basic physics principles | MEDIUM | Matter.js for 2D particle dynamics; simpler than full 3D physics |
| Interactivity (user can explore) | Students learn by doing — exploring structure at their own pace | MEDIUM | Camera controls (Three.js), particle dragging (Matter.js), toggle views |
| Modern web tech (React + Spectacle.js) | Familiar development stack; responsive slideshow with embedded simulations | LOW | React component architecture; Spectacle.js slide navigation; iframe integration of canvas simulations |

### Anti-Features (Avoid)

Features that seem good but create problems for this project.

| Feature | Why Avoided | What to Do Instead |
|---------|-------------|-------------------|
| Mobile app | Web-first project; mobile app would double scope; students can access via browser; defer to v2+ | Responsive web design; ensure slides work on tablet browsers |
| Authentication system | No user accounts needed; academic project; adds unnecessary complexity and backend requirements | Public access; no login required; anonymous viewing |
| Database/notes system | Not part of scope — project is presentation-only; would require backend, API, data modeling | Save notes locally via browser; defer to v2+ |
| Real-time chat | No collaborative feature needed; distracts from learning objectives; infrastructure overhead | Asynchronous discussion outside scope; separate comms channel |

### Feature Dependencies

```
Slide Title → Chemical Identification → Subatomic Explanation → Ion Image → Authorship → References → Deploy
     ↓
3D Simulation (enhances Subatomic Explanation)
     ↓
2D Simulation (enhances Interactivity)
     ↓
Interactivity (requires both 3D and 2D simulations)
```

### Dependency Notes

- **[Slide Title] requires [Chemical Identification]:** Title must load before ion content can be presented
- **[Chemical Identification] requires [Subatomic Explanation]:** Students need proton/electron context before ion recognition
- **[Subatomic Explanation] requires [Ion Image]:** Visual reinforcement after conceptual explanation
- **[Ion Image] enhances [3D Simulation]:** Image provides reference for 3D model accuracy
- **[3D Simulation] and [2D Simulation] both enable [Interactivity]:** User controls depend on both simulations being built
- **[Authorship] and [References] are independent** — can be completed in parallel
- **[Deploy] requires all prior features:** GitHub Pages deployment needs stable build output

### MVP Definition

#### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] Slide title with theme name — presentation starts with clear topic identification
- [ ] Chemical identification of He²⁺ — core content is visible and accurate
- [ ] Subatomic explanation — students understand protons/electrons forming the ion
- [ ] Representative image of the ion — visual reference present
- [ ] Authorship section (name + turma) — academic context established
- [ ] References section — sources acknowledged
- [ ] Deploy to GitHub Pages — product is live and shareable

Add After Validation (v1.x)

- [ ] 3D simulation (Three.js) of atomic structure — enhances conceptual understanding
- [ ] 2D simulation (Matter.js) of interactions — adds exploratory dimension
- [ ] Interactivity features — camera controls, view toggles

### Future Consideration (v2+)

Features to defer until product-market fit is established or academic term ends.

- [ ] Mobile app — web-first; responsive design sufficient for v1
- [ ] Bilingual support (PT/EN) — expand audience later
- [ ] Quiz or interaction extra — gamification after core validated
- [ ] Export to PDF — alternative format after web validated
- [ ] Authentication system — if future versions need user accounts
- [ ] Database/notes system — if saving student work becomes requirement

### Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Slide title with theme name | HIGH | LOW | P1 |
| Chemical identification of He²⁺ | HIGH | LOW | P1 |
| Subatomic explanation | HIGH | LOW | P1 |
| Representative image of the ion | MEDIUM | MEDIUM | P1 |
| Authorship section | LOW | LOW | P1 |
| References section | MEDIUM | LOW | P1 |
| Deploy to GitHub Pages | HIGH | MEDIUM | P1 |
| 3D simulation (Three.js) | HIGH | HIGH | P2 |
| 2D simulation (Matter.js) | MEDIUM | MEDIUM | P2 |
| Interactivity (user exploration) | MEDIUM | MEDIUM | P2 |

**Priority key:**
- P1: Must have for launch (v1)
- P2: Should have, add when possible (v1.x)
- P3: Nice to have, future consideration (v2+)

### Competitor Feature Analysis

| Feature | Competitor A (Traditional PPT) | Competitor B (Interactive HTML) | Our Approach |
|---------|-------------------------------|----------------------------------|--------------|
| Static slides with text/image | ✅ | ✅ | ✅ (Spectacle.js base) |
| Chemical element identification | ✅ | ⚠️ manual images | ✅ (structured data + diagram) |
| Subatomic structure explanation | ✅ | ⚠️ static text | ✅ (animated + interactive) |
| 3D atomic structure visualization | ❌ | ❌ | ✅ (Three.js differentiator) |
| 2D particle interaction simulation | ❌ | ❌ | ✅ (Matter.js differentiator) |
| User exploratory interactivity | ❌ | ⚠️ limited | ✅ (full controls) |
| GitHub Pages deploy | ⚠️ possible with effort | ⚠️ possible | ✅ (first-class citizen) |
| Authorship/references section | ✅ | ⚠️ limited | ✅ (academic standard) |

### Sources

- Project context: .planning/PROJECT.md, .planning/REQUIREMENTS.md, .planning/ROADMAP.md
- Reference document: Detectores de Fumaça.md
- Technology: Spectacle.js docs, Three.js docs, Matter.js docs
- Educational standards: Brazilian chemistry curriculum for high school

---

*Feature research for: Educational chemistry slide presentations (smoke detectors + atomic nucleus)*
*Researched: 2026-08-31*