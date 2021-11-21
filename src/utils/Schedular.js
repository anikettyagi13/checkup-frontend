import {
  ScheduleComponent,
  Day,
  Inject,
  ViewsDirective,
  ViewDirective,
} from '@syncfusion/ej2-react-schedule'
import { Grid, Typography } from '@mui/material'
import { apiRequest, uuidv4 } from './utils'

export default function Schedular({
  setOpen,
  bookings,
  user_id,
  doc_id,
  readOnly,
}) {
  let data = [...bookings]
  console.log(data)
  function find(r) {
    console.log(data, r)
    let k = 1
    data.map((book) => {
      console.log(book.Id == r.Id)
      if (book.Id == r.Id) {
        k = 0
      }
    })
    return k
  }
  function onDataBinding(e) {
    let k = 1
    if (e.result) {
      e.result.map(async (r) => {
        k = find(r)
        if (k === 1) {
          const body = {
            ...r,
            timestamp: new Date(r.EndTime).getTime(),
            Id: uuidv4(),
            user_id,
            doc_id,
            session_id: localStorage.getItem('session_id'),
          }
          await apiRequest('post', '/api/create_appointment', fake, body)
          await apiRequest('post', '/api/add_availability', () => {}, {
            session_id: localStorage.getItem('session_id'),
            doc_id: doc_id,
          })
        }
      })
    }
  }
  function fake(yo) {
    const k = [...data]
    k.push({ ...yo.data, read: true })
    data = k
    setOpen(false)
    console.log(data)
  }
  function editorTemplate(props) {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: '100%', cellpadding: '5' }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td colSpan={4}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              {/* <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                className="e-field"
              ></DateTimePickerComponent> */}

              <input
                value={new Date(props.startTime || props.StartTime)}
                disabled
                id="StartTime"
                style={{ width: '100%', height: '40px' }}
                data-name="StartTime"
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td colSpan={4}>
              {/* <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
              ></DateTimePickerComponent> */}
              <input
                value={new Date(props.endTime || props.EndTime)}
                disabled
                style={{ width: '100%', height: '40px' }}
                id="EndTime"
                data-name="EndTime"
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Reason</td>
            <td colSpan={4}>
              <textarea
                id="Description"
                className="e-field e-input"
                name="Description"
                rows={3}
                cols={50}
                style={{
                  width: '100%',
                  height: '60px !important',
                  resize: 'vertical',
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    )
  }
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        style={{
          width: '100%',
          height: '40px',
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: '2',
          backgroundColor: 'white',
        }}
      >
        <Grid item>
          <Typography style={{ padding: '30px' }} variant="h3">
            BOOKINGS
          </Typography>
        </Grid>
        <Grid
          style={{ margin: '30px' }}
          onClick={() => {
            setOpen(false)
          }}
        >
          <img
            src="https://img.icons8.com/windows/32/000000/macos-close.png"
            alt="close"
            style={{ right: '0px' }}
          />
        </Grid>
      </Grid>
      <ScheduleComponent
        readonly={readOnly !== undefined ? (readOnly ? true : false) : false}
        width="100%"
        height="550px"
        style={{ top: '-73px' }}
        currentView="Month"
        selectedDate={new Date()}
        eventSettings={{
          dataSource: bookings,
        }}
        startHour="10:00"
        endHour="24:00"
        editorTemplate={editorTemplate}
        dataBinding={onDataBinding}
      >
        <ViewsDirective>
          <ViewDirective option="Day" interval={3} />
        </ViewsDirective>
        <Inject services={[Day]} />
      </ScheduleComponent>
    </>
  )
}
