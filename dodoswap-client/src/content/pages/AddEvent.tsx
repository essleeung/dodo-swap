//packages
import React, { FormEvent, useState } from 'react'
import { Button, Container, Form, Grid, Image, Segment, DropdownProps } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
//custom components
import { Decoded } from '../../App'
import { Redirect } from 'react-router-dom';

interface NewEventProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void

}

const AddEvent: React.FC<NewEventProps> = props => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [maxVisitor, setMaxVisitor] = useState(1)
    const [hostDescription, sethostDescription] = useState('')
    const [redirect, setRedirect] = useState(false)


    const handleChangeDate = (e: FormEvent, { goat, value }: any) => {
        //convert input date to satisfy the requirements of full-calendar-react
        //split string by "-"
        let result = value.split('-')
        //reorder and added "-"
        let result2 = ([result[2], result[0], result[1]]).join('-')
        //set date
        setDate(result2)

    }
    const handleChangeTime = (e: any, { name, value }: any) => {
        setTime(value)
    }

    const handleSubmit = ((e: FormEvent) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'event', {
            method: 'POST',
            body: JSON.stringify({
                date: date,
                time: time,
                maxVisitor: maxVisitor,
                description: hostDescription,
                hostId: idee

            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
        setRedirect(true)

    })

    const handleDropdown = ((e:React.SyntheticEvent, data:any) => {
        setMaxVisitor(data.value)
    })
    
    if (!props.user) {
        return (
            <Redirect to="/" />
        )
    }
    const options = [
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 },
        { key: '5', text: '5', value: 5 },
        { key: '6', text: '6', value: 6 },
        { key: '7', text: '7', value: 7 }

    ]
    let idee = props.user._id ? props.user._id : undefined

    return (
        <Container>
            <h1>Add Event</h1>
            <Grid stackable columns={2} container verticalAlign='middle'>
                <Grid.Row></Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Image src="/Timmy_and_Tommy_NH.png" size="large" />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group>
                                    <Form.Field>
                                        <label>Date:</label>
                                        <DateInput value={date} onChange={handleChangeDate} goat="date" />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Time:</label>
                                        <TimeInput value={time} onChange={handleChangeTime} name="time" />
                                    </Form.Field>
                                    <Form.Select selection fluid label='Visitors' options={options}  onChange={handleDropdown} name="maxVisitor"/>
                                </Form.Group>
                                <Form.Field onChange={(e: any) => sethostDescription(e.target.value)} value={hostDescription} label='Description' control='textarea' rows='3' name="comments" />
                                <input type="hidden" value={idee} name="hostId" />
                                <Button type="submit" color="blue" >Create Event</Button>
                            </Form>
                            {redirect && <Redirect to="/event" />}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default AddEvent
