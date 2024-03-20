import React from 'react'
import axios from 'axios'
import ReceiptIcon from '@material-ui/icons/Receipt';
import MailIcon from '@material-ui/icons/Mail';

import './card.css'

function Card(props) {

    var deadline_exceeded = false
    const today = Date.now()
    if(today>=props.due){
        deadline_exceeded = true
    }

    const paidHandler = () => {
        console.log(typeof props.id);
        axios({
            method: 'patch',
            url: '/invoice',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({"id": props.id})
        }).then(response =>{
            console.log('Status changed');
        }).catch(err =>{
            console.log(err);
        })

        window.location.reload()
    }

    const sum = props.product + props.service + props.labour
    const tax = (0.0425*sum).toFixed(2)
    const grand_total = Number(sum) + Number(tax)

    const mailHandler = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: '/mail',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                receiver: props.email,
                message: grand_total
            })
        }).then(response =>{
            alert('Email sent to ' + props.email)
        }).catch(err =>{
            alert(err);
        })
    }
    
    const paid = props.paid? 'Paid' : 'Pending'
    const paidClass = props.paid ? 'green' : 'red'
    const deadlineClass = deadline_exceeded ? 'exceeded': 'not-exceeded'
    return (
        <div className={'card ' + deadlineClass}>
            <img src="https://www.jing.fm/clipimg/detail/40-400098_invoice.png" alt='Invoice' />
            <h4>{props.name}</h4>
            <p>{props.date[0]}/{props.date[1]}/{props.date[2]}</p> 
            <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
            <button className='btn'onClick={() => props.view(props.id)}><ReceiptIcon /></button>
            <div></div>
            <button onClick={mailHandler} className='btn'><MailIcon/></button>
            <button onClick={paidHandler} className={'btn ' + paidClass}>{paid}</button>
            </div>
            
        </div>
    )
}

export default Card
