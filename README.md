# 📱 **Gadget Store - E-commerce Application**

**Gadget Store** is a comprehensive e-commerce platform with a customer-facing frontend, a delivery portal, and an admin dashboard. Built with modern tools like **Vite**, **React**, and **Nest.js**, this app ensures a smooth, secure, and feature-rich shopping experience.

---

## 📑 **Table of Contents**  

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Available Scripts](#available-scripts)  
- [Folder Structure](#folder-structure)  
- [Live Demo](#live-demo)  

---

## 🚀 **Features**  

### **Client Portal:**  
- 🛒 **Product Browsing & Purchase:** Explore and buy gadgets.  
- 🔐 **Google OAuth:** Sign in securely with Google.  
- 💳 **eSewa Payment Integration:** Pay securely online.  
- 🌍 **Location Services:** Pinpoint locations with **OpenStreetMap** for accurate delivery.  

### **Delivery Portal:**  
- 📦 **Order Management:** View and manage deliveries.  
- 🧭 **Real-time Navigation:** Route optimization from store to customer using OpenStreetMap.  

### **Admin Dashboard:**  
- 📦 **Product Management:** Add, edit, and delete products.  
- 📋 **Order Tracking:** View and update order statuses.  
- 👥 **Customer Management:** Manage customer data and accounts.  

---

## 🛠️ **Tech Stack**  

### **Frontend:**  
- [React](https://reactjs.org/) - User interface library  
- [Vite](https://vitejs.dev/) - Build tool for fast development  
- [Mantine UI](https://mantine.dev/) - Modern component library  
- [Zustand](https://github.com/pmndrs/zustand) - State management  
- [React Router DOM](https://reactrouter.com/) - Client-side routing  
- [OpenStreetMap](https://www.openstreetmap.org/) - Location and navigation services  

### **Backend:**  
- [Node.js](https://nodejs.org/) - JavaScript runtime  
- [Nest.js](https://nestjs.com/) - Backend framework  
- [PostgreSQL](https://www.postgresql.org/) - Database  
- [Swagger](https://swagger.io/) - API documentation  

### **Payment Gateway:**
- [eSewa](https://esewa.com.np/) - Online payment processing

To proceed with payments using eSewa, please use the following test credentials:

**eSewa Test Credentials:**
- **eSewa ID:** `9806800001` (or `9806800002`, `9806800003`, `9806800004`, `9806800005`)
- **Password:** `Nepal@123`
- **Token:** `123456`

---

## ⚙️ **Getting Started**  

### **Prerequisites:**  
- [Node.js](https://nodejs.org/) (>= 18.x)  
- [npm](https://www.npmjs.com/) (>= 9.x)  
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

### **Run the Application:**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Niroj925/Gadget-Store.git](https://github.com/Niroj925/Gadget-Store.git)
    cd Gadget-Store
    ```

2.  **Configure Environment Variables (.env files):**
    Before starting Docker Compose, you need to create `.env` files for each part of the application (backend, client, and admin).

    * In the root directory, create a `.env` file for the **server/backend**. Refer to `server/.env.example` for required variables, including your Google API credentials for OAuth.

    Ensure all necessary credentials and configurations are correctly set in these `.env` files.

3.  **Start Docker Compose:**
    Once your `.env` files are configured, launch all services using Docker Compose:

    ```bash
    docker-compose up
    ```

## **Access the Applications**

- **Backend API**: [http://localhost:4000/api](http://localhost:4000/api)
- **Client**: [http://localhost:5173](http://localhost:5173)
- **Admin**: [http://localhost:5174](http://localhost:5174)

- **Video Demo**: [Click here](https://drive.google.com/file/d/17NltZcBh0w1hG6DagEUcbzTiEKYzd1fe/view?usp=drive_link)