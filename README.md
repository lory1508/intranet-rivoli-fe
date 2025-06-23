# 🏛️ Intranet Città di Rivoli

A modern intranet platform for **Città di Rivoli**, built with [Nuxt 3](https://nuxt.com/) and [Vue 3](https://vuejs.org/).  
This internal tool provides employees and staff with streamlined access to institutional news, internal communications, contact directories, and other essential resources.

## 🛠️ Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Yarn](https://yarnpkg.com/)
- Backend: Headless WordPress (API-based)

## ⚙️ Project Features

- 📢 News and announcements
- 📇 Internal contact directory
- 🧩 Modular component-based architecture
- 🔄 Dynamic content powered by Headless WordPress
- 🧠 State management using the Nuxt store
- 🔌 API integration via `/api` endpoints and store actions

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Yarn

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Deploy

```bash
yarn build
pm2 list
pm2 restart PROCESS_ID
```

# 📁 Project Structure Highlights

- pages/ – Route-based pages
- components/ – UI components
- store/ – Nuxt store with actions calling backend APIs
- api/ – Custom API endpoints for SSR and server-side logic
- utils/constants.js – Project constants, including the WordPress API base URL

# 🧪 Testing

No automated tests are set up yet — manual testing is recommended before each deployment.

# 📌 Notes

**This intranet is intended for internal use only.**

Content and data are served via REST APIs from a private Headless WordPress instance.
