# **Disaster Management Emergency Response App**

### **Overview**  
This app is a revolutionary emergency response platform that bridges the gap in traditional disaster management systems. It provides **real-time, location-based connections** to emergency services during natural or man-made disasters, saving lives by ensuring fast and reliable assistance.  

---

## **Features**  

### **1. Real-Time Location Sharing**  
- Automatically detects and shares the user’s location (latitude and longitude).  
- Ensures precise routing of alerts to the nearest emergency service.  

### **2. Multi-Department Support**  
- Connects to services like:  
  - Police Departments  
  - Fire Brigades  
  - Ambulance Services  
  - Disaster Relief Teams  
  - Rescue Operations (landslides, missing persons).  

### **3. Offline and Online Functionality**  
- Operates seamlessly in offline mode using satellite communication and cached data.  

### **4. One-Click Emergency Alerts**  
- Simplifies the process of reaching emergency departments with a single tap.  

### **5. Advanced Routing**  
- Uses the **Haversine formula** to calculate the nearest department for fast response times.  

---

## **Tech Stack**  

### **Frontend**  
- **React.js**: For building the user interface.  
- **Redux**: For state management.  

### **Backend**  
- **Node.js**: Server-side logic and API development.  
- **Express.js**: Backend routing and middleware.  

### **Database**  
- **MongoDB**: Stores emergency alerts, user data, and department information.  

### **APIs and Tools**  
- **Google Maps API** or **OpenStreetMap**: For geolocation and routing.  
- **Firebase Cloud Messaging**: For emergency push notifications.  
- **Satellite Communication API**: For offline functionality.  

### **Infrastructure**  
- **AWS/GCP**: For hosting and scalability.  

---

## **Installation**  

### **Prerequisites**  
- **Node.js** and **npm** installed.  
- **MongoDB** server running locally or accessible remotely.  

### **Steps**  
1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd <repository-folder>
