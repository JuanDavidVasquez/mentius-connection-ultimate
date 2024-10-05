import { useState } from 'react'
import { Provider, useSelector } from "react-redux";
import './App.css'
import { Navigation } from './routes/Navigation'
import { store } from "./store/store";

function App() {



  return (
    <Provider store={store}>     
      <Navigation /> 
    </Provider>
  )
}

export default App
