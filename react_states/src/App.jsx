import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import statesArray from '../data/states'
import { useState } from 'react'

function App() {

  const [states, setStates] = useState(statesArray.states)

  return (
    <div>
      <Header states={states}/>
      <Main className="body" states={states}/>
    </div>
  )
}

export default App
