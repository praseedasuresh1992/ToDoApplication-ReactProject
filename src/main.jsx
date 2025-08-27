import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
