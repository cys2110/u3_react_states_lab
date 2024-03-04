import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function StateList (props) {

    let navigate = useNavigate()

    const showState = (state) => {
        navigate(`${state.name}`)
    }

    return (
        <div className="state-grid">
            {
                props.states.map((state) => (
                    <div className="state-card" key={state.abbreviation}>
                        <figure>
                            <img className='states-flags' src={`https://flagcdn.com/us-${state.abbreviation.toLowerCase()}.svg`} alt={state.abbreviation} onClick={() => showState(state)}/>
                            <figcaption onClick={() => showState(state)}>{state.name}</figcaption>
                        </figure>
                    </div>
                ))
            }
        </div>
    )
}