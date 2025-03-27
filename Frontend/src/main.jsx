import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Context/AuthContext.jsx'
import { BrowserRouter as Router, } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
 
    <AuthProvider>
      <Router>
      <App />
      </Router>
    </AuthProvider>

)
