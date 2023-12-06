import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MessageProvider } from './context/message.context.jsx'
ReactDOM.createRoot(document.getElementById('chatbot_root')).render(
  <React.StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </React.StrictMode>,
)
