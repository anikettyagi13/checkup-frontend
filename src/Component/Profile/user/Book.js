import { useState } from 'react'
import { useEffect } from 'react'
import BuildDailog from '../../../utils/BuildDailog'
import Schedular from '../../../utils/Schedular'
import { apiRequest } from '../../../utils/utils'

export default function Book({ openBooking, setOpenBooking, doc, user }) {
  const [value, changes] = useState()
  console.log(doc)
  console.log(user)
  const [bookings, setBookings] = useState()
  useEffect(() => {
    if (value && value.data) {
      if (value.data.bookings.length) {
        for (let i of value.data.bookings) {
          i.IsReadonly = true
          i.Description = i.description
          i.StartTime = i.starttime
          i.EndTime = i.endtime
          i.Subject = i.subject
          i.read = true
          i.Id = i.id
        }
        console.log(value.data.bookings)
      }
      setBookings(value.data.bookings.length > 0 ? value.data.bookings : [])
    }
  }, [value])

  async function getAppointment() {
    const book = {
      timestamp: new Date().getTime(),
      session_id: localStorage.getItem('session_id'),
      doc_id: doc.user.id,
    }
    await apiRequest('post', '/api/get_appointment', changes, book)
  }
  useEffect(() => {
    getAppointment()
  }, [doc])
  return (
    <BuildDailog open={openBooking} setOpen={setOpenBooking}>
      <Schedular
        setOpen={setOpenBooking}
        bookings={bookings}
        doc_id={doc && doc.user && doc.user.id ? doc.user.id : '0'}
        user_id={user && user.user && user.user.id ? user.user.id : '0'}
      />
    </BuildDailog>
  )
}
