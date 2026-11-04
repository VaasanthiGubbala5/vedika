# Vedika

Wedding stage design in 3D for event designers. Build the stage, change the
theme and lighting, then present it to the client.

Built with React, Vite, React Three Fiber (Three.js) and drei.

## Run it on your laptop

1. Open this folder in VS Code.
2. Open the terminal (Terminal → New Terminal) and run:

   ```
   npm install
   npm run dev
   ```

3. Open the address it prints (usually http://localhost:5173).

To try it on your phone, connect the phone to the same Wi-Fi and run
`npm run dev -- --host`, then open the "Network" address it prints on your phone.

## Progress

- [x] **Stage 1:** 3D stage, decor library, drag to place, edit colour/size/rotation, themes, lighting, present mode, autosave
- [x] **Stage 2:** realistic 3D
  - Real 3D model files: glam velvet sofa, royal damask chair, velvet lounge chair, glass hurricane candles, glass vase centrepiece
  - Rose-shaped flowers instead of simple balls
  - **Replace backdrop with a photo:** upload a backdrop picture (for example from Pinterest) and it replaces the current backdrop as a curved 3D panel with depth
  - Add a decor photo as a standing cut-out (plain backgrounds are removed)
- [x] **Stage 3:** big decor library + AI photo-to-3D
  - 4 mandaps: floral canopy, South Indian temple, modern minimal, dome pavilion (each with havan kund and seats)
  - Fabric decor: ceiling drape, fabric swag arch, sheer entrance curtains, pleated fabric backdrop
  - Florals: roses, marigolds, hydrangeas, jasmine, baby's breath, pampas grass; marigold and jasmine string curtains, rose flower wall, floral hoop, hydrangea box, pampas vase, aisle flowers
  - Trending props: neon sign on greenery (editable text), welcome board (editable text), brass urli, kuthu vilakku, crystal chandelier, Moroccan lanterns, marigold jhoola, decorative umbrellas
  - Library search
  - **Photo to real 3D object (AI):** uses the free Hunyuan3D-2.1 model on Hugging Face (needs a free Hugging Face access token, saved only on your device)
- [ ] **Stage 4:** designer accounts and saving designs online
- [ ] **Stage 5:** client share link
- [ ] **Stage 6:** pricing and PDF proposals
- [ ] **Stage 7:** more venue types (mandap, haldi, sangeet)
- [ ] **Stage 8:** go live (Vercel)

### Using photo to real 3D (AI)

1. Create a free account at huggingface.co.
2. Settings → Access Tokens → Create new token → type **Read** → copy it (starts with `hf_`).
3. In Vedika: Decor library → "Set up: photo to real 3D" → paste the token → Save.
4. Tap "Photo to real 3D object (AI)" and choose a photo of ONE object. It takes 1 to 3 minutes.

The free allowance is a few models per day. The AI-made models are saved in this browser only.

### Tips for good photo backdrops

- Use a straight, front-facing photo of the backdrop (not taken from the side).
- Crop out people, the floor and the sofa before uploading, so only the backdrop is left.

## Where things are

| Folder | What is inside |
| --- | --- |
| `src/App.jsx` | The main screen and all the actions (add, move, delete…) |
| `src/components/` | The 3D scene, the stage, and the side panels |
| `src/models/` | One file per decor item. Copy one to make a new item |
| `public/models/` | Real 3D model files (.glb) and their credits |
| `src/data/library.js` | The list of items in the decor library |
| `src/data/palettes.js` | Theme colours |
| `src/utils/` | Saving, photo background removal, helpers |

## Add your own decor item

1. Copy `src/models/Pillar.jsx` to a new file, for example `Lantern.jsx`, and change the shapes.
2. Add it to `src/models/index.js`.
3. Add a line for it in `src/data/library.js`.

## Credits

3D model files in `public/models/` are from the Khronos glTF Sample Assets. Some are CC BY 4.0 by Wayfair; see `public/models/CREDITS.md`.
