# AI Cloud Employee

A **full‑stack, AI‑powered automation agent** that acts like your personal cloud engineer.  It opens a real Chrome session, logs into Google Cloud Platform once, and then executes natural‑language tasks inside the console while streaming a live view and chat interface to the browser.

---

## ✨ Key Features

| Area | Highlights |
|------|------------|
| **Browser‑Agent** | • One‑time manual login → persistent session  
• Uses [`browser‑use`](https://github.com/browser-use/browser-use) to drive Playwright under the hood  
• Two OpenAI models (planner + executor) collaborate on every step  
• Automatic screenshots, JSON action log, and error traces for debugging |
| **Frontend (CloudCopilot)** | • Next.js 14 / React server‑components  
• Tailwind CSS, shadcn/ui, Lucide icons  
• Multi‑tab iframe viewer plus real‑time chat  
• Mobile‑responsive & dark‑mode aware |
| **Backend (Python)** | • `gcp_manual_login_persistent_new3.py` orchestrates the agent  
• Asyncio event‑loop with graceful cleanup  
• `.env` support for secrets  
• Extensible—wrap it with FastAPI/Flask for REST or WebSocket control |

---

## 🗂️ Repository Layout

```
.
├── backend/
│   └── gcp_manual_login_persistent_new3.py   # main automation script
├── cloudcopilot/                            # Next.js frontend
│   ├── app/ …                               # pages & layout
│   ├── components/ …                        # UI & hooks
│   └── tailwind.config.ts
└── README.md                                # you are here
```

> **Note**: The directory names shown above assume you place the Python script in `backend/`. Feel free to adjust paths to suit your project structure.

---

## ⚙️ Prerequisites

| Tool | Version (tested) | Windows install hint |
|------|------------------|----------------------|
| **Node.js** | ≥ 20 LTS | <https://nodejs.org> installer (tick *Add to PATH*) |
| **pnpm** | ≥ 8 | `npm i -g pnpm` |
| **Python** | 3.10 / 3.11 | <https://www.python.org/downloads> (enable *Add python.exe to PATH*) |
| **Chrome** | latest | Included in Playwright download |
| **Git** | any | <https://gitforwindows.org> |

---

## 🔑 Environment Variables

Create a **`.env`** file at the repo root:

```env
# OpenAI secret key
OPENAI_API_KEY="sk‑..."

# (Optional) proxy / other secrets
HTTP_PROXY=
HTTPS_PROXY=
```

---

## 🚀 Local Setup (Windows PowerShell)

### 1. Clone & enter the project
```ps1
> git clone https://github.com/your‑org/ai‑cloud‑employee.git
> cd ai‑cloud‑employee
```

### 2. Install and run the **frontend**
```ps1
> cd cloudcopilot
> pnpm install            # ⏱ installs React, Tailwind, shadcn/ui …
> pnpm dev                # http://localhost:3000
```

### 3. Install and run the **backend**
```ps1
> cd ..\backend
> python -m venv .venv
> .venv\Scripts\Activate.ps1
(venv) > pip install -r requirements.txt  # see below
(venv) > python gcp_manual_login_persistent_new3.py
```
The script will:
1. Open a Chrome window on *Google Cloud Console*.
2. Prompt **“Log in manually, then press Enter …”** – log in once and press **Enter**.
3. Keep the browser context alive for subsequent natural‑language commands.

### 4. (optional) Wrap the backend with FastAPI
If you want a REST/WebSocket bridge instead of stdin, you can mount the agent inside an ASGI server:
```py
# backend/server.py
import asyncio, uvicorn
from fastapi import FastAPI, WebSocket
from gcp_manual_login_persistent_new3 import main as run_agent

app = FastAPI()

@app.on_event("startup")
async def startup():
    asyncio.create_task(run_agent())

# add endpoints / ws relays as needed

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```
Then start with:
```ps1
(venv) > uvicorn backend.server:app --reload
```

---

## 📦 Python Dependencies
A minimal **`requirements.txt`** (freeze after your first install):
```txt
browser_use>=0.1.11
langchain-openai>=0.1.0
python-dotenv>=1.0
mss>=9.0
Pillow>=10.0
fastapi>=0.110   # optional
uvicorn[standard]>=0.29
```
Feel free to pin exact versions.

---

## 🛠️ Common Tasks

| Task | Command |
|------|---------|
| Run unit tests | `pytest` |
| Lint & format  | `ruff check .` & `ruff format .` |
| Build frontend | `pnpm build && pnpm start` |
| Build Docker image | `docker build -t ai-cloud-employee .` |

---

## 🖥️ Screenshots
Screenshots are automatically stored in **`/screenshots`** every time the agent navigates, clicks, or detects a new goal.  A companion **`/screenshots/log.json`** keeps a structured list of steps → file names.

---

## 🤝 Contributing
Pull requests are welcome!  Please open an issue first to discuss major changes.

1. Fork the repo & create your branch  
2. Commit your changes (`git commit -m "feat: …"`)  
3. Push and open a PR

---

## 📝 License
MIT © 2025 Your Name / Your Org

