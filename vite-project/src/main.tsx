import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Controls} from "react-three-gui";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Controls.Provider>
          <App/>
          <Controls/>
      </Controls.Provider>
  </React.StrictMode>
)
