import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'

export default function StateDetails (props) {
    const [state, setState] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    let {name} = useParams()

    useEffect(() => {
        const getState = props.states.find(state => state.name === name)
        setState(getState)
    }, [name])

    useEffect(() => {
        if (state) {
            const incorpDate = new Date(state.incorporation_date)
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
        const newDate = incorpDate.toLocaleString('en-GB', options)
        setDate(newDate)
        }
    }, [state])

    useEffect(() => {
        if (state) {
            let timeZone
        switch (state.timezone) {
            case 'Alaska Time Zone' :
                timeZone = 'America/Juneau'
                break
            case 'Central Time Zone' :
                timeZone = 'America/Chicago'
                break
            case 'Eastern Time Zone' :
                timeZone = 'America/New_York'
                break
            case 'Hawaii-Aleutian Time Zone' :
                timeZone = 'Pacific/Honolulu'
                break
            case 'Mountain Time Zone' :
                timeZone = 'America/Denver'
                break
            case 'Pacific Time Zone' :
                timeZone = 'America/Los_Angeles'
                break
        }
        const getTimeZone = async () => {
            const response = await axios.get(`https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`)
            const newTime = new Date (response.data.dateTime)
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
        
            const timeOptions = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
        
            const dateFormatter = new Intl.DateTimeFormat('en-GB', dateOptions)
            const timeFormatter = new Intl.DateTimeFormat('en-GB', timeOptions)
        
            const dateString = dateFormatter.format(newTime)
            const timeString = timeFormatter.format(newTime)
        
            const formattedTimeString = `${dateString}, ${timeString}`
            setTime(formattedTimeString)
        }
        getTimeZone()
        }
    }, [state])

    return ( state ? 
        <div className="detail">
            <div className="detail-header">
                <h1>{state.name} ({state.abbreviation})</h1>
                <img className="details-image" src={`https://flagcdn.com/us-${state.abbreviation.toLowerCase()}.svg`} alt={state.abbreviation}/>
            </div>
            <div className="info-wrapper">
                <dl>
                    <dt>Capital</dt>
                    <dd>{state.capital}</dd>

                    <dt>Date of incorporation</dt>
                    <dd>{date}</dd>

                    <dt>Timezone</dt>
                    <dd>{state.timezone}</dd>
                    <dd>{time}</dd>

                    <dt>Quality of pizza</dt>
                    <dd>0 <meter value={state.quality_of_pizza} min="0" max="5"></meter> 5</dd>

                    <dt>State borders</dt>
                    { state.borders.length === 0 ? <dd>No bordering states</dd> :
                        state.borders.map((border, index) => (
                            <dd key={index}><Link to={`/${border}`}>{border}</Link></dd>
                        ))
                    }
                </dl>
            </div>
        </div> :
        <div>
            <h1>State not found</h1>
        </div>
    )
}