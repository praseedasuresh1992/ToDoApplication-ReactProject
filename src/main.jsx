import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.jsx'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
       <App />
    </ThemeProvider>
   
  </Provider>,
)
