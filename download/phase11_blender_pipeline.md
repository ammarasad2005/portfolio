# Phase 11 — Blender Asset Pipeline

> Which assets need custom modeling, recommended workflow, naming conventions, materials, baking.

---

## 1. Custom Modeling Strategy

**Core principle: model as little as possible.** Most of the observatory scene is procedural (spheres, particles, gradients). Custom Blender models are reserved for elements that cannot be expressed as primitives and that materially affect the storytelling.

### 1.1 Assets that NEED custom Blender modeling

| Asset | Why custom | Complexity |
|---|---|---|
| **Observatory dome** (8 panels, opens/closes) | Mechanical articulation, you can't get this from a primitive. | Medium — 8 wedge panels + hinge rig |
| **Telescope** (barrel + eyepiece + mount) | The visitor sees it up close. Must look like a real telescope, not a cylinder. | Medium — 5 parts (barrel, eyepiece, lens, mount, tripod) |
| **Observer's chair + desk** (Beat 2 + 6) | Interior prop, seen at medium distance. Adds humanity. | Low — simple geometry, mostly primitives assembled in Blender |
| **Notebook** (open/closed states) | Needs to "open" with a page-turn animation. | Low — 2 planes hinged |
| **Headphones** (Beat 6) | Small prop on desk, signals "music". | Low — 2 ear cups + band |

### 1.2 Assets that DON'T need custom modeling (procedural is better)

| Asset | Why procedural |
|---|---|
| Starfield | `THREE.Points` with custom shader. Pure procedural. |
| Nebula background | ShaderMaterial on a sphere. Pure procedural. |
| Project planet surfaces | ShaderMaterial with simplex noise on a sphere. Procedural. |
| Hamara-rozgar nebula (particles) | `THREE.Points` with gaussian distribution. Procedural. |
| Glucoguard-plus star pulse | Sprite + shader. Procedural. |
| Stack map stars | `THREE.Points`. Procedural. |
| Comet trail | `THREE.Points` with fade. Procedural. |
| Dust motes | `THREE.Points`. Procedural. |

### 1.3 Total custom modeling load
- **5 custom models** (observatory dome, telescope, chair+desk, notebook, headphones).
- Estimated modeling time: 8–12 hours total.
- All are simple geometry — no characters, no creatures, no vehicles.

---

## 2. Blender Workflow

### 2.1 File organization
```
blender/
├── 01_observatory_dome.blend       # dome + rig
├── 02_telescope.blend              # telescope assembly
├── 03_chair_desk.blend             # interior props
├── 04_notebook.blend               # notebook (open + closed)
├── 05_headphones.blend             # headphones
├── materials/
│   ├── observatory_metal.blend     # shared materials
│   ├── telescope_brass.blend
│   ├── wood_warm.blend
│   └── paper.blend
├── exports/
│   ├── observatory_dome.glb        # final exports (Draco compressed)
│   ├── telescope.glb
│   ├── chair_desk.glb
│   ├── notebook.glb
│   └── headphones.glb
└── references/                     # mood images
```

### 2.2 Per-asset workflow
1. **Model in Blender** — low-poly first, validate silhouette.
2. **UV unwrap** — only where needed (notebook paper, dome interior).
3. **Apply materials** — see §4 below.
4. **Bake textures** where appropriate (dome interior ambient occlusion, notebook paper texture).
5. **Export as GLB** with Draco compression + KTX2 textures.
6. **Verify in Three.js** — load, check normals, check materials, check animation rigs.

### 2.3 Animation rigs
- **Dome:** 8 panels parented to a central empty. Each panel rotates on its base edge ( hinge). Animate via armature or via per-panel rotation keyframes.
- **Notebook:** 2 planes hinged along one edge. Animate rotation of the "cover" plane.
- **Telescope:** Grouped hierarchy (barrel → eyepiece → lens, mount → barrel). Animate barrel rotation via the mount's Z rotation.

---

## 3. Naming Conventions

### 3.1 Object naming (Blender)
- `_[asset]_[part]_[descriptor]` — lowercase, underscore-separated.
- Examples:
  - `_dome_panel_01` through `_dome_panel_08`
  - `_telescope_barrel_main`
  - `_telescope_eyepiece`
  - `_telescope_mount_base`
  - `_chair_seat`
  - `_notebook_cover_front`

### 3.2 Material naming
- `mat_[asset]_[material]_[variant]` — lowercase.
- Examples:
  - `mat_dome_metal_brushed`
  - `mat_telescope_brass_polished`
  - `mat_telescope_glass_lens`
  - `mat_desk_wood_warm`
  - `mat_notebook_paper_aged`

### 3.3 Texture naming
- `tex_[asset]_[material]_[map]_[resolution].ktx2`
- Map codes: `_basecolor`, `_normal`, `_orm` (ORM packed: Occlusion/Roughness/Metallic), `_emissive`.
- Examples:
  - `tex_dome_metal_basecolor_2k.ktx2`
  - `tex_notebook_paper_basecolor_1k.ktx2`
  - `tex_telescope_brass_orm_2k.ktx2`

### 3.4 Export file naming
- `[asset_name].glb` — single file per asset, lowercase.
- Examples: `observatory_dome.glb`, `telescope.glb`, `chair_desk.glb`.

---

## 4. Material Workflow

### 4.1 Material library (5 materials cover everything)

| Material | Used by | Workflow |
|---|---|---|
| **Brushed metal** (dark navy) | Dome exterior, telescope mount | Procedural PBR in Blender. Roughness 0.6, Metallic 1.0, Color #1A2547. No texture maps needed. |
| **Polished brass** | Telescope barrel, eyepiece ring | Procedural PBR. Roughness 0.2, Metallic 1.0, Color #B8860B. Subtle anisotropic highlight. |
| **Glass** | Telescope lens | Procedural. Transmission 1.0, Roughness 0.05, IOR 1.5. Thin-walled. |
| **Warm wood** | Desk, chair | Bake from a wood texture (CC0 from ambientCG or similar). Basecolor + Normal + ORM. |
| **Aged paper** | Notebook | Bake from a paper texture. Basecolor only (no normal/ORM needed). |

### 4.2 Baking workflow (where needed)
- Wood and paper materials use baked textures.
- Bake at 2K resolution for desk/chair, 1K for notebook (smaller surface).
- Bake in Cycles, 32 samples, denoised.
- Export as KTX2 with ETC1S compression (lossy but small) for basecolor, UASTC for normal (lossless).

### 4.3 Procedural materials (no baking)
- Metal, brass, glass are fully procedural in Blender.
- Export as GLB with material settings intact.
- In Three.js, use `MeshStandardMaterial` with the same PBR parameters.

---

## 5. HDRI Usage

### 5.1 No HDRI for the observatory interior
- The scene is in deep space. No environment HDRI.
- Lighting comes from the explicit lights in Phase 10 §3.
- This is more controllable and faster than HDRI.

### 5.2 Optional HDRI for reflections only
- If the telescope brass looks too flat without env reflections, add a tiny HDRI (256x128) of a starfield.
- Used ONLY for reflection probing, not for lighting.
- Generated procedurally in Three.js (render the starfield to a cube map once on load).

---

## 6. Reusable / Modular Assets

### 6.1 Modular dome panels
- 1 panel modeled, duplicated 8 times with rotation.
- Each panel has the same hinge animation rig.
- Saves modeling time + ensures consistency.

### 6.2 Stack chip prefab
- Not a Blender asset — built as a React component in Three.js.
- One prefab, instanced 14 times with different text + brightness.

### 6.3 Star prefab
- One star geometry (small sphere or sprite).
- Instanced 300 times with random position, size, color, twinkle phase.

---

## 7. Asset Quality Checklist

Per asset, before export:
- [ ] Poly count < 5000 (per asset, except dome which can go to 15000 because it's seen up close)
- [ ] UV unwrapped (where textured)
- [ ] Materials applied and tested in Blender render
- [ ] Normals correct (blue = out)
- [ ] Pivot point at logical rotation center (e.g., dome panel pivot at hinge edge)
- [ ] Named per convention (§3)
- [ ] Animation rig tested (does it open/close correctly?)
- [ ] Exported as GLB with Draco compression
- [ ] Loaded in Three.js, verified visually

---

## 8. Total Asset Budget

| Asset | Polys | Textures | GLB size (estimated) |
|---|---|---|---|
| Observatory dome (8 panels) | ~12,000 | None (procedural) | ~150KB |
| Telescope | ~3,000 | None (procedural) | ~50KB |
| Chair + desk | ~1,500 | Wood (2K baked) | ~250KB (textures dominate) |
| Notebook | ~100 (2 planes) | Paper (1K baked) | ~120KB |
| Headphones | ~800 | None (procedural) | ~25KB |
| **Total custom 3D** | **~17,400** | — | **~600KB** |

Plus starfield, particles, shaders — all procedural, ~0KB additional.

**Total 3D asset payload: ~600KB** (well under budget).

---

## 9. If Custom Asset is Unnecessary (Justification)

For the 7 procedural elements listed in §1.2, custom Blender modeling would be:
- Slower to iterate (shader tweaks vs. re-bake).
- Larger file size (texture maps vs. math).
- Less flexible (can't easily change color/shape at runtime).
- Less performant (more draw calls, more memory).

**Procedural wins on every axis for these elements.** This is the correct trade-off.

---

## 10. v1 Pragmatic Decision

For the v1 portfolio build (the actual implementation), I will:
- Use **simple Three.js primitives** for the observatory dome (8 wedge geometries rotated) instead of custom Blender modeling.
- Use a **cylinder + cone + sphere** combination for the telescope.
- Use **simple boxes** for the desk and chair.
- Use a **plane with a handwritten-font texture** for the notebook (no Blender).
- Use a **simple torus + 2 spheres** for the headphones.

This reduces the asset payload to **~0KB of custom 3D models** and lets us ship the v1 portfolio without a Blender dependency. The visual quality will be 70% as good as custom-modeled; the engineering quality and storytelling will be 100%.

**v2 (future iteration):** Replace primitives with custom Blender models for the dome, telescope, and notebook. Other elements stay procedural.

This decision keeps the v1 build focused on code + storytelling (where you shine), not 3D modeling (which is not your core skill per Phase 4).
