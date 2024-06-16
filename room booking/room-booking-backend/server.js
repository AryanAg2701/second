const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(bodyParser.json())
app.use(cors())

let bookings = []

app.post('/api/room', (req, res) => {
    const { num, purp, club } = req.body
    const newBooking = { id: uuidv4(), num, purp, club }
    bookings.push(newBooking)
    res.status(201).json({ message: 'Room booked successfully', booking: newBooking })
})

app.get('/api/bookings', (req, res) => {
    res.status(200).json(bookings)
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
