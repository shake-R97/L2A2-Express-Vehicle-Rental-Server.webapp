🚗 Vehicle Rental App - Backend Server -> 

A secure and scalable backend API for managing vehicle rentals, user authentication, and booking operations.

Built using modern backend technologies with TypeScript for strong type safety and PostgreSQL for reliable data management.

🌍 Live Deployment: https://l2-a2-express-vehicle-rental-server.vercel.app/

🔗 GitHub Repository: https://github.com/shake-R97/L2A2-Express-Vehicle-Rental-Server.webapp/tree/main



🚀 Features :

🔐 JWT-based Authentication

🔑 Secure Password Hashing using bcrypt

👥 Role-Based Authorization (Admin / Customer)

🚘 Vehicle Management System

📅 Booking & Rental Management

🛡 Protected Private Routes

❌ Global Error Handling

🌱 Environment Variable Configuration

📦 RESTful API Architecture



🛠 Technology Stack :

Runtime: Node.js

Framework: Express.js

Language: TypeScript

Database: PostgreSQL

Authentication: JSON Web Token (JWT)

Security: bcrypt

Deployment: Vercel



📂 Project Structure :

src/
 ├── config/
 │     ├── db.ts
 │     └── index.ts
 │
 ├── middlewares/
 │     └── auth.ts
 │
 ├── modules/
 │     ├── authenticate/
 │     ├── booking/
 │     ├── user/
 │     └── vehicle/
 │
 ├── Type/
 │
 ├── app.ts
 └── server.ts

.env
.gitignore
package.json
tsconfig.json
README.md



📌 Architecture Explanation :

config/ → Database configuration & environment setup

middlewares/ → Authentication & custom middleware logic

modules/ → Feature-based modular structure (auth, user, booking, vehicle)

Type/ → Custom TypeScript types & interfaces

app.ts → Express app configuration

server.ts → Server bootstrap & port listener


⚙️ Installation & Setup:
1️⃣ Clone Repository ->

git clone https://github.com/your-username/vehicle-rental-app.git
cd vehicle-rental-app

2️⃣ Install Dependencies
npm install


3️⃣ Setup Environment Variables

4️⃣ Run Development Server
npm run dev


5️⃣ Build for Production
npm run build


🔐 API Overview ->
🔑 Auth Routes :

POST /api/v1/auth/signup

POST /api/v1/auth/signin

👤 User Routes:

GET /api/v1/users (admin only)

PUT /api/v1/users/:userId (admin or own)

DELETE /api/v1/users/:userId (admin only)

🚘 Vehicle Routes:

POST /api/v1/vehicles (Admin)

GET /api/v1/vehicles (public)

GET /api/v1/vehicles/:vehicleId (public)

PUT /api/v1/vehicles/:vehicleId (Admin)

DELETE /api/v1/vehicles/:vehicleId (Admin)


📅 Booking Routes :

⚠️ Important Note (Date Format Requirement) :

When creating or updating a vehicle booking, the rent_start_date and rent_end_date fields must follow this format strictly:

yyyy/mm/dd
📌 Example
2026/02/25

❌ Incorrect Examples:

25-02-2026
02/25/2026
2026-02-25 

If the format is incorrect, the API may reject the request or cause validation errors.

Please ensure the date format is correctly formatted before sending the request.

----------------------------------------------

POST /api/v1/bookings (public)

GET /api/v1/bookings (Role-based)

PUT /api/v1/bookings/:bookingId (Role-based)


📤 Submission ->

GitHub Repo: https://github.com/shake-R97/L2A2-Express-Vehicle-Rental-Server.webapp/tree/main


Live Deployment: https://l2-a2-express-vehicle-rental-server.vercel.app/

👨‍💻 Author ->

Abdullah Shake
Diploma in Computer Science & Engineering
Future Software Engineer | Focused on Clean Architecture & Security