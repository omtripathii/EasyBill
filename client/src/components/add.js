import axios from 'axios'
import React, {useState} from 'react'

import './add.css'
function Add(props) {

    const [data, setData] = useState({
        name: '',
        address: '',
        email: '',
        phone: 0,
        product: 0,
        service: 0,
        labour: 0
    })

    const cancelHandler = () => {
        props.history.push('/')
    }

    const changeHandler = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        setData({...data, [name]: value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: '/invoice',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then((response) => {
            props.history.push('/')
            console.log(response);
        }).catch((err) => {
            alert(err)
        })
    }
    return (
        <div className="form">
            <form onSubmit={submitHandler} >
                <label>Name</label>
                <input type="text" onChange={changeHandler} name="name" placeholder="Enter full name" required />
                <label>Address</label>
                <input type="text" onChange={changeHandler} name="address" placeholder="Billing address" required />
                <label>Email</label>
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" required />
                <label>Contact no.</label>
                <input type="text" onChange={changeHandler} name="phone" placeholder="Phone" required />
                <label>Products Price</label>
                <input type="text" onChange={changeHandler} name="product" placeholder="All purchases" required />
                <label>Service Fee</label>
                <input type="text" onChange={changeHandler} name="service" placeholder="Service charge" required />
                <label>Labour</label>
                <input type="text" onChange={changeHandler} name="labour" placeholder="$75/hour" required />
                <div className='btnDiv'>
                <button className='btn' type="submit">Create</button>
                <button className='btn' type="button" onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Add
