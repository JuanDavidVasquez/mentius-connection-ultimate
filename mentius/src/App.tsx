import { useState } from 'react'
import { Provider } from "react-redux";
import './App.css'
import { Navigation } from './routes/Navigation'
import { store } from "./store/store";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <Navigation /> 
    </Provider>
  )
}

export default App
