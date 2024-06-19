import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [num, setNum] = useState("");
  const [purp, setPurp] = useState("");
  const [club, setClub] = useState("");
  const [bookings, setBookings] = useState([]);
  const [reply, setReply] = useState("");

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        setReply("Error fetching bookings");
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const bookRoom = () => {
    const bookingDetails = { num, purp, club };
    axios
      .post("http://localhost:5000/api/room", bookingDetails)
      .then((response) => {
        setReply(response.data.message);
        setNum("");
        setPurp("");
        setClub("");
        fetchBookings();
      })
      .catch((error) => {
        setReply("Error booking room");
      });
  };
  const delroom=(id)=>{
    axios
      .delete(`http://localhost:5000/api/room/${id}`)
      .then((reponse)=>{
        setReply(reponse.data.message)
        fetchBookings()
        
        fetchBookings()
      })
      .catch((error)=>{
        setReply("Error in deleting")
      })
  }

  return (
    <div className="App">
      <h1>Room Booking App</h1>
      <div>
        <input
          type="text"
          placeholder="Room Number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <input
          type="text"
          placeholder="Purpose of Booking"
          value={purp}
          onChange={(e) => setPurp(e.target.value)}
        />
        <input
          type="text"
          placeholder="Club Name"
          value={club}
          onChange={(e) => setClub(e.target.value)}
        />
        <button onClick={bookRoom}>Book Room</button>
      </div>
      <p>{reply}</p>
      <a href="">Click me!!</a>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Room : {booking.num} - {booking.purp} - {booking.club} <button onClick={()=>delroom(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
