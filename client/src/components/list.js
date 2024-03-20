import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios'
import Card from './card'

import './list.css'


function List(props) {

    const [invlist, setInvlist] = useState([])

    useEffect(() =>{
        axios({
            method: 'get',
            url: '/invoice',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response =>{
            setInvlist(response.data.message)
        })
        .catch(err =>{
            console.log(err);
        })
    }, [])

    const viewHandler = (id) => {
        props.history.push(`/${id}`)
    }

    const invoiceList = invlist.map(inv =>{
        return(
            <li
            key={inv._id}>
                <Card
                id={inv._id}
                name={inv.name}
                date={inv.date}
                due={inv.due}
                paid={inv.paid}
                email={inv.email}
                product={inv.product}
                service={inv.service}
                labour={inv.labour}
                view={viewHandler} />
            </li>
        )
    })

    return (
        <div className="list">
            <h2 style={{'marginTop': '0'}}>
                <Link style={{'textDecoration': 'none', 'color': 'white'}} 
                to='/add'
                 ><AddCircleOutlineIcon /> Create Invoice</Link></h2>
            <ul>
                {invoiceList}
            </ul>
        </div>
    )
}

export default List
