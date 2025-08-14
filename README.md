# 🐞 LazyBug – Project Management Made Simple
[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-green?style=for-the-badge)](https://lazybug.vercel.app)


LazyBug is a modern **project management tool** built with **React, Zustand, and Tailwind CSS**, designed to make tracking tasks, milestones, and visuals simple and efficient — without the clutter of enterprise tools.

---

## 🚀 Features
- **Dashboard Overview** – Quick access to all projects and their statuses.
- **Collapsible Sidebar** – Easy navigation with active-page highlighting.
- **Project Management** – Add, edit, and delete projects.
- **Visuals Tab** – Upload and delete images using Pinata (IPFS) without a backend.
- **Milestone Tracking** – Create milestones with deadlines and statuses.
- **Global State with Zustand** – Lightweight and scalable state management.
- **Responsive UI** – Optimized for both desktop and mobile.

---

## 🛠 Tech Stack
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
 ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
 ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
 ![Zustand](https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=zustand&logoColor=white)
 ![IPFS](https://img.shields.io/badge/IPFS-65C2CB?style=for-the-badge&logo=ipfs&logoColor=white)


---

## 📂 Project Structure
```plaintext
LazyBug/
│── src/
│   ├── components/     # UI components
│   ├── pages/          # Main pages (Dashboard, Project, etc.)
│   ├── Store/          # Zustand global state
│   ├── assets/         # Images, icons
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
│── public/             # Static assets
│── package.json
│── vite.config.ts
└── README.md

```

## ⚙️ Installation & Setup

1️⃣ Clone the repository
```
git clone https://github.com/yourusername/lazybug.git
cd lazybug
```

2️⃣ Install dependencies
```
npm install
``` 

3️⃣ Set up environment variables

Create a .env file in the root and add:
```
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_API_KEY=your_pinata_secret
```
4️⃣ Run the development server
```
npm run dev
```
5️⃣ Build for production
```
npm run build
```



## 🧑‍💻 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.





📜 License
This project is licensed under the MIT License.


🌐 [Portfolio](https://portfolio-zoherkhan26s-projects.vercel.app/) | 💼 [LinkedIn](https://linkedin.com/in/your-profile)
