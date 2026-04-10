# 🚀 SalesSaarthi – AI WhatsApp Sales Assistant

SalesSaarthi is an AI-powered WhatsApp bot designed to help small businesses automate customer interactions, manage product queries, and take orders directly through WhatsApp.

---

## 📌 Problem Statement

Small businesses often face challenges like:
- Managing multiple customer queries manually
- Delayed responses leading to lost sales
- No proper system to track orders from WhatsApp

---

## 💡 Solution

SalesSaarthi solves this by providing:
- 🤖 AI-based automated replies
- 📦 Product recommendation system
- 🧾 Order collection via chat
- 📊 Dashboard for managing data

---

## 🧠 Features

- AI-powered WhatsApp chatbot  
- Real-time customer interaction  
- Order placement via WhatsApp  
- Firebase database integration  
- Admin dashboard (React-based)  
- Fast and scalable backend  

---

## 🛠 Tech Stack

- **Frontend:** React.js (Vercel)
- **Backend:** Node.js + Express (Render / Railway)
- **Database:** Firebase Firestore
- **AI:** OpenAI API
- **WhatsApp Integration:** Twilio WhatsApp API

---

## 🔗 Project Links

- 🌐 **Frontend:** [SalesSaarthi Web App](https://sales-saarthi.vercel.app/)
- ⚙️ **Backend:** [SalesSaarthi API](https://salessaarthi-ai-production.up.railway.app)

---

## 📂 Folder Structure
SalesSaarthi/
│── frontend/ # React dashboard
│── backend/ # Node.js API & bot logic
│── README.md


---

##  Setup Instructions

### 1 Clone Repository

```bash
git clone https://github.com/your-username/salessaarthi.git
cd salessaarthi
```

### 2 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
FIREBASE_CONFIG=your_firebase_config
```

Run the backend:

```bash
npm start
```

### 3 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  WhatsApp Integration  

###  Step 1: Open Twilio Sandbox

Go to: https://console.twilio.com/

Navigate to:
Messaging  Try it out  WhatsApp Sandbox

###  Step 2: Join Sandbox

Send this message from your WhatsApp:

```
join <your-sandbox-code>
```

Example:

```
join silver-bird
```

Send it to:

```
+1 415 523 8886
```

###  Step 3: Configure Webhook

In Twilio Sandbox settings:

Set **WHEN A MESSAGE COMES IN** to:

```
https://your-backend-link.onrender.com/webhook
```

###  Step 4: Backend Webhook Example

```javascript
app.post('/webhook', async (req, res) => {
  const message = req.body.Body;
  const sender = req.body.From;

  // Process with AI
  // Send response using Twilio
});
```

---

##  How It Works

1. User sends a message on WhatsApp
2. Twilio forwards the message to the backend webhook
3. Backend processes the message using AI
4. Response is sent back via Twilio
5. Data is stored in Firebase

---

##  Example Flow

```
User: Show me phones under 20000
Bot: Here are some options...
User: I want to order this
Bot: Please share your name, address, and phone number
```

---

##  Deployment

### Backend
- Render
- Railway
- AWS

### Frontend
- Vercel

---

##  Environment Variables

- OpenAI API Key
- Twilio Account SID & Auth Token
- Firebase Configuration

---

##  Testing

1. Join Twilio sandbox
2. Send a message on WhatsApp
3. Check backend logs

---

##  Team Dhara
- Madhav
- Shivang
- Moksh
- Nishant

---

##  Future Scope

- Payment integration
- Multi-language support
- CRM integration
- Voice-based AI assistant



