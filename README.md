# Snappr

Snappr is a full-stack photo-booth web app: it captures photos from your webcam in the browser, lets you save them, and shares them in a public gallery.

It is split into two apps:

| Directory | App | Stack | Default port |
|---|---|---|---|
| `snappr-react/` | Frontend (SPA) | React 18 + TypeScript + Vite, React Router 5, Axios | 5173 (`npm run dev`) |
| `snappr-rails/` | Backend (JSON API) | Rails 5.1, PostgreSQL, Devise Token Auth | 3001 |

The frontend talks to the backend via hardcoded `http://localhost:3001` URLs.

## How the system works

### 1. Webcam capture (`snappr-react/src/components/Create.tsx`, route `/snap`)

- On mount, `Create` requests a camera stream with the legacy `navigator.webkitGetUserMedia` API using the constraints in component state (`video: 640x480`, no audio), and pipes the resulting `MediaStream` into the page's `<video>` element via `webkitURL.createObjectURL(stream)` so the user sees a live preview.
  - Note: `createObjectURL(MediaStream)` was removed from Chrome in 2018, so the live preview does not work in modern browsers. The modern equivalent would be `navigator.mediaDevices.getUserMedia()` + `video.srcObject = stream`.
- Clicking **SNAP** (`twoMethodsCall` → `handleStartClick` → `snapPicture`) freezes a frame: the current `<video>` frame is drawn onto a hidden `<canvas>` with `context.drawImage(video, 0, 0, width, height)`.
- The canvas is then serialized to a **Base64 PNG data URL** with `canvas.toDataURL('image/png')` (a string like `data:image/png;base64,iVBOR...`) and shown as a static preview in the `<img id="photo">` element. The user can **Retake** (back to live camera) or **Save Photo**.
- `Create` also injects `public/stickerbomb.min.js`, a standalone canvas engine intended for overlaying stickers/backdrops on the captured image (currently mostly commented out).

### 2. Saving a photo

Clicking **Save Photo** (`handleSaveClick`) sends the canvas contents to the backend:

```
POST http://localhost:3001/pics
body:    { user_id: <current user id>, canvas_img: "data:image/png;base64,..." }
headers: access-token, client, token-type, uid, expiry   (read from cookies)
```

There is no file upload — the entire image travels as the Base64 data-URL string in `canvas_img`. After the request, `fireRedirect` flips to `true` and the app redirects to `/snap/:id`, the pic's show page.

### 3. Where it gets saved

`PicsController#create` (in `snappr-rails/app/controllers/pics_controller.rb`) builds a `Pic` record and saves it to PostgreSQL. The `pics` table (see `snappr-rails/db/schema.rb`) is:

| column | type | contents |
|---|---|---|
| `canvas_img` | string | the full Base64 PNG data URL |
| `user_id` | integer | owner of the pic |
| `created_at` / `updated_at` | datetime | timestamps |

So images live **in the database itself**, not on disk or object storage. When the frontend renders a pic (gallery tiles, show page), it just sets `<img src={pic.canvas_img}>` and the browser decodes the data URL directly. The backend also exposes `GET /images/:id` (`PicsController#view`), which strips the `data:image/png;base64,` prefix, `Base64.decode64`s the rest, and streams it as a real `image/png` — useful for consuming pics outside the SPA.

### 4. How a pic is associated with a user

Authentication uses **Devise Token Auth** (token-based, no server session):

- **Register/Login** (`/auth/register`, `/auth/login`) POST to `http://localhost:3001/auth/` and `/auth/sign_in`. The response *headers* carry five tokens: `access-token`, `client`, `token-type`, `uid`, `expiry`. The frontend stores each in a cookie via `cookies-js` and puts the user object in `App` state (`currentUser`), flipping the nav to the logged-in variant.
- **Authenticated requests** (save pic, delete pic, logout) read those five cookies and send them back as request headers. `PicsController` runs `before_action :authenticate_user!` on `create`, which validates the headers and sets `current_user`.
- **Ownership** is stamped server-side: `create` does `@pic.user_id = current_user.id` before saving, so the association comes from the validated token, not from anything the client claims. (The `user_id` in the POST body is permitted but overwritten.)
- **Ownership check on view**: the pic show page (`ShowDestroy.tsx`, route `/snap/:id`) fetches the pic and only reveals the **Delete** button when `props.user.id === pic.user_id`, i.e. the logged-in user owns it. Delete sends `DELETE /pics/:id` with the auth headers and redirects to `/gallery`.

Note: the logged-in user lives only in `App` component state, so a full page reload logs the UI out (the cookies survive, but the user object isn't rehydrated).

### 5. Routes

| Frontend route | Component | Purpose |
|---|---|---|
| `/` | `Landing` | Hero/landing page |
| `/snap` | `Create` | Webcam capture + save |
| `/snap/:id` | `ShowDestroy` | View a pic; delete if owner |
| `/gallery` | `Gallery` | Grid of all pics (`GET /pics`) |
| `/auth/login`, `/auth/register` | `Login`, `Register` | Devise Token Auth flows |

## Running locally

Frontend:

```bash
cd snappr-react
npm install
npm run dev        # Vite dev server on http://localhost:5173
npm run build      # tsc type-check + production build
npx vitest run     # tests
```

Backend: a Rails 5.1 / Ruby 2.4 API served on port 3001 (`rails s -p 3001`). See `.agents/skills/testing-snappr/SKILL.md` for a verified Docker recipe for standing it up on a modern machine.
