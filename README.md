🎓 RankMe – Gamified School Ranking & Engagement Platform
📌 Overview

RankMe is a gamified school management web app that motivates students through leaderboards, points, and rewards, while giving teachers and principals easy tools to manage assignments, notes, announcements, and performance tracking.

The platform is built with React + Vite for speed, modern UI, and scalability.

🚀 Features
👨‍🏫 Principals

Manage teachers & students within their school.

View school leaderboard (points, ranks).

Compare school performance with other schools.

Add/remove users with auto-generated credentials.

👩‍🏫 Teachers

Post assignments (Google Form / Edulastic links).

Upload notes & announcements.

Manage student points (add/remove with reasons).

View school leaderboard (read-only).

👨‍🎓 Students

See their school’s leaderboard.

Access assignments, announcements, and notes.

Track their personal points history (reasons, timestamps, teacher who awarded/removed).

📊 Leaderboard System

Each school has its own independent leaderboard.

Rankings based on points (descending).

Search & sort functionality (by name, points, rank).

Principals can compare school averages vs other schools.

🌍 Multi-School System

Each school gets a custom subdomain (e.g., brainpoint.rankme.edu).

Students & teachers only log in through their school portal.

Principals sign up via the main site (rankme.edu).

🖥️ Tech Stack

Frontend: React + Vite

UI/UX: Modern, responsive design (rounded cards, glowing buttons, smooth shadows, animations).

State Management: (your choice: Context API, Redux, or Zustand)

Routing: React Router

Authentication: Role-based (Principal, Teacher, Student)

Data: Currently seeded with dummy data for testing.



⚡ Getting Started

Clone the repo:

git clone https://github.com/yourusername/brainpoint-spark.git
cd rankme


Install dependencies:

npm install


Run the dev server:

npm run dev


Open in browser:

http://localhost:5173

📌 Roadmap

 Add real-time database integration (Firebase / Supabase).

 Student badges & gamified rewards.

 Analytics dashboard for principals.

 Payment system for schools (plans: Starter, Growth, Premium).

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
