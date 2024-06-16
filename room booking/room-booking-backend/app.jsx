import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [num, setnum] = useState('')
    const [purp, setpurp] = useState('')
    const [club, setclub] = useState('')
    const [bookings, setBookings] = useState([])
    const [reply, setreply] = useState('')

    

  useEffect(()=>{show()},[])

  const show = () => {
    axios.get('http://localhost:5000/api/bookings')
        .then(response => {
            setBookings(response.data)
        })
        .catch(error => {
            setreply('Error fetching bookings')
        })
}
  const details = () => {
        axios.post('http://localhost:5000/api/room', { num, purp, club })
            .then(response => {
                setreply(response.data.reply)
                setnum('')
                setpurp('')
                setclub('')
                show()
            })
            .catch(error => {
                setreply('Error booking room')
            })
    }

    return (
        <div className="App">
            <h1>Room Booking App</h1>
            <div>
                <input
                    type="text" placeholder="Room Number" value={num} onChange={(e) => setnum(e.target.value)}/>
                <input type="text" placeholder="purp of Booking" value={purp} onChange={(e) => setpurp(e.target.value)}/>
                <input type="text" placeholder="Club Name" value={club} onChange={(e) => setclub(e.target.value)}/>
                <button onClick={details}>Book Room</button>
            </div>
            <p>{reply}</p>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        Room {booking.num} {booking.purp}  {booking.club}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
