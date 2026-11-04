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

## What it does now (Phase 1)

- Fixed reception stage: platform, drapes, fairy lights, aisle runner
- Decor library: loveseat, chiavari chair, arch backdrop, pillar,
  flower ball stand, floral urn, candle trio, round guest table
- Tap an item to add it, drag to move it (it steps up onto the stage by itself)
- Edit the selected item: colour, size, rotate, duplicate, remove
- Upload a decor photo: plain backgrounds are removed and it stands in the scene
- Themes (Blush, Ivory, Marigold) and lighting (Evening, Day)
- "Present to client" hides the tools and slowly turns the stage
- The design saves automatically in this browser

## Where things are

| Folder | What is inside |
| --- | --- |
| `src/App.jsx` | The main screen and all the actions (add, move, delete…) |
| `src/components/` | The 3D scene, the stage, and the side panels |
| `src/models/` | One file per decor item. Copy one to make a new item |
| `src/data/library.js` | The list of items in the decor library |
| `src/data/palettes.js` | Theme colours |
| `src/utils/` | Saving, photo background removal, helpers |

## Add your own decor item

1. Copy `src/models/Pillar.jsx` to a new file, for example `Lantern.jsx`, and change the shapes.
2. Add it to `src/models/index.js`.
3. Add a line for it in `src/data/library.js`.

## Next phases

2. Real 3D models (GLB files) for more realistic items
3. AI photo-to-3D for uploaded decor (free models first)
4. Client share link (Supabase + Vercel)
5. Pricing and PDF proposals
