import React, { useState, useEffect } from 'react'
import { Decoded } from '../../App'
import { Grid, Header, Image, Table } from 'semantic-ui-react'

import ProfileModal from './ProfileModal'


//props
interface ProfileBoxProps {
    user: Decoded | null,
    updateToken: (newToken: string | null) => void
}

const ProfileBox: React.FC<ProfileBoxProps> = props => {
    let [secretMessage, setSecretMessage] = useState('')

    useEffect(() => {
        //Grab token from local storage
        let token = localStorage.getItem('boilerToken')

        //Make a call to a protected route
        fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    setSecretMessage('Nice try')
                    console.log(secretMessage)
                    return
                }
                //we did get a good response
                response.json()
                    .then(result => {
                        console.log(result)
                        setSecretMessage('HELLLO! WELCOME')
                        console.log(secretMessage)
                    })
            })
            .catch(err => {
                console.log(err)
                setSecretMessage('No message for you')
            })
    }, [])


    if (!props.user) {
        return null
    }

  var picDisplay = (
    <Image src="/wilbur_dodo.png"  alt="wilbur-dodo" size="small" />
  )
  if (props.user.pic) {
    picDisplay = (
      <Image src={props.user.pic} alt={props.user.firstname} size="small" />
    )
  }

    return (
        <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={4}>
                {picDisplay}
            </Grid.Column>
            <Grid.Column width={9}>
                <Table>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src="/villager.png" rounded size='mini' />
                                <Header.Content>
                                    Name
                                <Header.Subheader>{props.user.firstname} {props.user.lastname}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src='/leaf.png' rounded size='mini' />
                                <Header.Content>
                                    AC User Name
                                <Header.Subheader>{props.user.userName}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src='/island.jpg' rounded size='mini' />
                                <Header.Content>
                                    Island Name
                                <Header.Subheader>{props.user.islandName}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src='/tree.png' rounded size='mini' />
                                <Header.Content>
                                    Native Fruit
                                <Header.Subheader>{props.user.nativeFruit}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src='/letter.png' rounded size='mini' />
                                <Header.Content>
                                    Email
                                <Header.Subheader>{props.user.email}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            <Header>
                                <Header.Content>
                                    <Header.Subheader >
                                        <ProfileModal user={props.user} updateToken={props.updateToken} />
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                </Table>
            </Grid.Column>
        </Grid>
    )
}


export default ProfileBox