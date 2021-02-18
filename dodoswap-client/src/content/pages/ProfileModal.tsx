import React, { FormEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../../App'
import { Button, Form, Header, Icon, Input, Modal, DropdownProps } from 'semantic-ui-react'

//props
interface ModalProps {
    user: Decoded | null
    updateToken: (newToken: string | null) => void
}

const ProfileModal: React.FC<ModalProps> = props => {
    let [message, setMessage] = useState('')
    let [referRedirect, setReferRedirect] = useState(false)
    let [firstname, setFirstname] = useState<String>('')
    let [lastname, setLastname] = useState<String>('')
    let [acName, setAcname] = useState<String>('')
    let [islandName, setIslandName] = useState<String>('')
    let [nativeFruit, setNativeFruit] = useState('')
    let [pic, setPic] = useState<String>('/wilbur_dodo.png')


    //fetch call to submit user profile edits
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        // Fetch call to POST data
        fetch(process.env.REACT_APP_SERVER_URL + 'user', {
            method: 'PUT',
            body: JSON.stringify({
                id: idee,
                firstname: firstname,
                lastname: lastname,
                userName: acName,
                islandName: islandName,
                nativeFruit: nativeFruit,
                pic: pic
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response: Response) => {
                response.json()
                    .then(result => {
                        if (response.ok) {
                            props.updateToken(result.token)
                            console.log("NEW TOKEN HERE---", result.token)
                            setReferRedirect(true)
                        } else {
                            setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                            console.log(message)
                        }
                    })
            })
            .catch((err: Error) => {
                console.log(err)
                setMessage(`${err.toString()}`)
            })
    }
    const handleDropdown = ((e:React.SyntheticEvent, data:any) => {
        setNativeFruit(data.value)
    })

    if (referRedirect) {
        return (
            <Redirect to="/user" />
        )
    }

    if (!props.user) {
        return null
    }

    const options = [
        { key: 'apple', text: 'apple', value: 'apple' },
        { key: 'cherry', text: 'cherry', value: 'cherry' },
        { key: 'orange', text: 'orange', value: 'orange' },
        { key: 'peach', text: 'peach', value: 'peach' },
        { key: 'pear', text: 'pear', value: 'pear' },
    ]
    let idee = props.user._id ? props.user._id : undefined
    return (

        <Modal trigger={<Icon name='edit' size='large'></Icon>} size={"small"} as={Form} onSubmit={(e: React.FormEvent) => handleSubmit(e)} closeIcon>
            <Header icon='user circle' content='Edit your profile' />
            <Modal.Content>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input label="First Name" name="firstname" placeholder={props.user.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)} required />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Last Name" name="lastname" placeholder={props.user.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)} required />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="AC User Name" name="acName" placeholder={props.user.userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcname(e.target.value)} required />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field >
                        <Form.Input label="Island Name" name="islandName" placeholder={props.user.islandName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIslandName(e.target.value)} required />
                    </Form.Field>
                    {/* <Form.Select fluid required label='Native Fruit' options={options} name="nativeFruit" onChange={(e: any) => setNativeFruit(e.target.value)} /> */}
                    <Form.Select fluid required label='Native Fruit' options={options}  name="nativeFruit" onChange={handleDropdown} />
                        <Form.Field>
                            <input type="hidden" value={idee} name="id" />
                        </Form.Field>
                </Form.Group>
                <Form.Field>
                        <label>Profile Pic</label>
                        <Input name="pic" placeholder={props.user.pic} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPic(e.target.value)} />
                    </Form.Field>
            </Modal.Content>
                <Modal.Actions>
                    <Button color='green' type="submit" >Update</Button>
                </Modal.Actions>
        </Modal>
    )



}
export default ProfileModal
