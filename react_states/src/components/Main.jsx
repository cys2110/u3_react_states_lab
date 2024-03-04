import {Routes, Route} from 'react-router-dom'
import StateList from './StateList'
import StateDetails from './StateDetails'

export default function Main (props) {
    return (
        <Routes>
            <Route path="/" element={<StateList states={props.states} />} />
            <Route path="/:name" element={<StateDetails states={props.states}/>} />
        </Routes>
    )
}