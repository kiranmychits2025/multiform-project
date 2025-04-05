 # MERN Full Stack Project

![Project Logo](https://github.com/kiranmychits2025/multiform-project/blob/main/backend/uploads/project%20image.png)


## 📌 Project Overview
A multi-stage form built using React (Frontend) and Express + MongoDB (Backend) that allows users to add, edit, delete, and search form entries.

## 🚀 Features
- ✅ Multi-Step Form – User-friendly form with multiple steps for structured input.
- ✅ CRUD Operations – Create, Read, Update, and Delete form entries.
- ✅ Search Functionality – Filter results by name or email.
- ✅ File Upload – Upload Aadhar & PAN images.
- ✅ Responsive UI – Built with Tailwind CSS for a modern look.
- ✅ REST API Integration – Uses Express & MongoDB as backend.
- ✅ Modal Popup – Displays the form in a centered modal.

## 🛠️ Technologies Used
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Handling:** Multer

## 📸 Screenshots


### Upload image

![Upload Page](https://github.com/kiranmychits2025/multiform-project/blob/main/backend/uploads/upload%20files.png)

### Pop-up image
![Multistage Pop up](https://github.com/kiranmychits2025/multiform-project/blob/main/backend/uploads/multistage%20popup.png)

### Search image
![Search Page](https://github.com/kiranmychits2025/multiform-project/blob/main/backend/uploads/search%20by%20name.png)

## 🔧 Installation & Setup


### 1️⃣ Clone the repository
```sh
git clone -b main https://github.com/kiranmychits2025/multiform-project.git
cd multiform-project
```

### 2️⃣ Install dependencies
```sh
# Install backend dependencies
cd backend
npm i
npm install cors express mongoose multer

```

# Install frontend dependencies
cd ../frontend
npm i
npm install tailwindcss@latest
```



### 4️⃣ Run the application
```sh
# Start the backend
cd backend
npm start

# Start the frontend
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173/`.

## 📌 API Endpoints
| Method |     Endpoint    |      Description      |
|--------|-----------------|-----------------------|
| POST   | /api/form       | Upload a file         |
| GET    | /api/form       | Fetch processed data  |
| DELETE |	/api/forms/:id  | Delete an entry       |
| PUT	   | /api/forms/:id  | Update an entry       |





---



