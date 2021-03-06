//packages
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Grid, Icon, Image } from 'semantic-ui-react'



//custom components
import { Decoded } from '../../App'

interface CatalogueProps {
    user: Decoded | null
}

const Catalogue: React.FC<CatalogueProps> = props => {
    let [catItems, setCatItems] = useState([])
    let [fetchUser, setFetchUser] = React.useState<String | null>('')


    const handleWishList = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        console.log('added to faves')
        if (props.user) {
            setFetchUser(props.user._id)
            fetchUser = props.user._id
        }
        let data = {
            wishList: e.currentTarget.value,
            chicken: fetchUser
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'user/wishlist', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('item# from button after fetchcall:', e.currentTarget.value)
    })

    const handleInventory = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        if (props.user) {
            setFetchUser(props.user._id)
            fetchUser = props.user._id
        }
        let data = {
            inventory: e.currentTarget.value,
            chicken: fetchUser
        }
        fetch(process.env.REACT_APP_SERVER_URL + 'user/inventory', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    })


    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'catalogue/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                response.json()
                    .then(data => {
                        console.log('data: ', data)
                        if (data) {
                            setCatItems(data.items)
                        }
                    })
                    .catch(innErr => {
                        console.log('inner catch: ', innErr)
                    })
            })
            .catch(err => {
                console.log('error with fetch call: ', err)
            })
    }, [])

    if (props.user) {
        let display = catItems.map((c: any) => {
            return (
                <Grid.Column key={c._id}>
                    <Grid.Row>
                        <Image src={`${c.image}`} alt={`{${c.name}}`} id="catPic" />
                    </Grid.Row>
                    <Grid.Row>
                        <Link className="catLink" to={`/catalogue/${c._id}`}>{c.name}</Link>
                    </Grid.Row>
                    <Grid.Row>
                        <Button.Group className="catButtons">
                            <Button icon onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleWishList(e)} value={c._id}>
                                <Icon name='heart' />
                            </Button>
                            <Button icon onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleInventory(e)} value={c._id}>
                                <Icon name='plus square outline' />
                            </Button>
                        </Button.Group>
                    </Grid.Row>
                </Grid.Column>


            )
        })
        return (
            <Container>
                <h1>Catalogue of Items</h1>
                <Grid stackable relaxed columns={5} className="catGrid">
                    <Grid.Row >
                        {display}
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }

    return (
        // redirect home if not logged in
        <Redirect to="/" />
    )
}

export default Catalogue

