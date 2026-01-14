# 🎛️ QAntum Control Center v1.0

> **Functional Web Dashboard for QAntum Empire**  
> Created: January 2, 2026  
> Status: ✅ OPERATIONAL

---

## 📍 Quick Start

```bash
# 1. Start the server
cd C:\MisteMind\scripts
node command-center-server.js

# 2. Open in browser
http://localhost:3400/qantum-control.html
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (Frontend)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Stats Panel │  │  Terminal   │  │   Quick Actions     │ │
│  │ (Live Data) │  │ (Commands)  │  │   (Buttons)         │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                     │            │
│         └────────────────┼─────────────────────┘            │
│                          │                                   │
│                    HTTP/WebSocket                            │
└──────────────────────────┼───────────────────────────────────┘
                           │
┌──────────────────────────┼───────────────────────────────────┐
│              command-center-server.js                        │
│  ┌───────────────────────┼───────────────────────────────┐  │
│  │         API ENDPOINTS (Port 3400)                      │  │
│  │  /api/status  - Server health                          │  │
│  │  /api/stats   - Project statistics (files, LOC, etc)   │  │
│  │  /api/scripts - List available scripts                 │  │
│  │  /api/execute - Execute shell commands                 │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │         WebSocket (Port 3401)                          │  │
│  │  Real-time command output streaming                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Features

### 1. Live Statistics Panel
| Metric | Description | Auto-Refresh |
|--------|-------------|--------------|
| Files | Total project files | 30 seconds |
| Modules | Directory count | 30 seconds |
| Lines of Code | Total LOC | 30 seconds |
| Vectors | Pinecone vectors | 30 seconds |

### 2. Interactive Terminal
- **Real command execution** on server
- **Command history** (Arrow Up/Down)
- **Built-in commands**: `help`, `clear`, `status`, `stats`
- **Any shell command**: `dir`, `git status`, `npm run build`, etc.

### 3. Quick Actions
| Button | Command |
|--------|---------|
| Run Guardian | `npm run guardian` |
| Hunt Leads | `npm run hunt` |
| Self Heal | `npm run heal` |
| Build | `npm run build` |
| Git Status | `git status` |
| List Files | `dir /b` |

### 4. Scripts Panel
- Auto-loads scripts from `scripts/` directory
- One-click execution
- Supports `.js` and `.ts` files

### 5. Activity Log
- Timestamps all actions
- Color-coded by type (success/error/warning/info)
- Last 50 entries kept

---

## 🔌 API Reference

### GET /api/status
```json
{
  "status": "online",
  "uptime": 123.45,
  "memory": { "heapUsed": 7007584 },
  "connections": 0
}
```

### GET /api/stats
```json
{
  "files": 1674,
  "folders": 550,
  "lines": 1174058,
  "departments": 8,
  "vectors": 52573,
  "lastUpdated": "2026-01-02T21:30:00.000Z"
}
```

### GET /api/scripts
```json
[
  { "name": "guardian.ts", "path": "scripts/guardian.ts" },
  { "name": "hunt.js", "path": "scripts/hunt.js" }
]
```

### POST /api/execute
```json
// Request
{ "command": "dir /b" }

// Response
{
  "success": true,
  "exitCode": 0,
  "output": "file1.txt\nfile2.js\n..."
}
```

---

## 📁 Files

| File | Size | Purpose |
|------|------|---------|
| `dashboard/qantum-control.html` | ~25KB | Main dashboard (single file) |
| `scripts/command-center-server.js` | ~15KB | Backend server |

---

## 🎨 UI Components

```
┌─────────────────────────────────────────────────────────────┐
│ 🔷 QAntum Control Center              [● Connected]         │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │  1,674   │ │   550    │ │  1.17M   │ │  52,573  │        │
│ │  Files   │ │ Modules  │ │   LOC    │ │ Vectors  │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────┬───────────────────────┤
│ ┌─ Terminal ───────────────────────┐│ ┌─ Quick Actions ────┐│
│ │ ══ QAntum Terminal v34.1 ══      ││ │ [Guardian] [Hunt]  ││
│ │ $ dir                            ││ │ [Heal]    [Build]  ││
│ │ dashboard                        ││ │ [Git]     [Files]  ││
│ │ scripts                          ││ └────────────────────┘│
│ │ src                              ││ ┌─ Scripts ──────────┐│
│ │ ✓ Exit code: 0                   ││ │ guardian.ts  [Run] ││
│ │                                  ││ │ hunt.js      [Run] ││
│ │ quantum@nexus:~$ _               ││ └────────────────────┘│
│ └──────────────────────────────────┘│ ┌─ Activity Log ─────┐│
│                                     │ │ 21:30 Connected    ││
│                                     │ │ 21:31 Cmd: dir     ││
│                                     │ └────────────────────┘│
└─────────────────────────────────────┴───────────────────────┘
```

---

## 🔧 Troubleshooting

### Server not starting
```powershell
# Kill existing node processes
Get-Process -Name "node" | Stop-Process -Force

# Restart server
cd C:\MisteMind\scripts
node command-center-server.js
```

### Port already in use
```powershell
# Find process using port 3400
netstat -ano | findstr :3400

# Kill by PID
taskkill /PID <PID> /F
```

### Dashboard shows "Offline"
1. Check server is running
2. Hard refresh: `Ctrl+Shift+R`
3. Check Console (F12) for errors

---

## 📈 Current Stats (Live)

| Metric | Value |
|--------|-------|
| **Files** | 1,674 |
| **Modules** | 550 |
| **Lines of Code** | 1,174,058 |
| **Vectors** | 52,573 |
| **Departments** | 8 |

---

## 🚀 Future Improvements

- [ ] Dark/Light theme toggle
- [ ] Command autocomplete
- [ ] File editor integration
- [ ] Deployment controls
- [ ] Real-time logs streaming
- [ ] Multi-tab terminal

---

**QAntum Empire** | *The Code That Thinks*
