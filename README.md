## deployment link: https://file-uploader-61qv.onrender.com/

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Queue**: RabbitMQ (local or hosted)
- **Worker**: Scans files for malicious keywords (simulated)
- **Styling**: Basic CSS
---

## ✅ Features

- Upload PDF, DOCX, JPG, PNG files 
- Background scanning using a queue
- Dashboard with live updates
- Status: `pending`, `scanned`
- Result: `clean`, `infected`
- Color indicators for file status

---

## 📦 Setup Instructions

### 1. 🖥 Backend

terminal powercell
cd backend
npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/cyberxplore
RABBITMQ_URL=amqp://localhost

// server start
nodemon server.js
or 
npm run dev

//Start RabbitMQ Worker
node worker/scanner.js
## 📦 Setup Instructions

### 1. 🖥 frontend
cd frontend
npm install
npm start
"proxy": http://localhost:5000"

### create .env file inside the backend folder
 PORT=""
 DB_URL=""
RABBITMQ_URL=""
// crate .env file inside the frontend folder 
REACT_APP_API_URL=
