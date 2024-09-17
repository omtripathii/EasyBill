import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import CopyrightIcon from '@mui/icons-material/Copyright';


import './index.css'

function Invoice() {

    const [invoice, setInvoice] = useState({})

    const invId = useParams()

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/${invId.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data.message);
            setInvoice(response.data.message)
        }).catch((err) => {
            console.log(err);
        })  
    }, [])

    const sum = invoice.product + invoice.service + invoice.labour
    const tax = (0.0425*sum).toFixed(2)
    const grand_total = Number(sum) + Number(tax)
    
    const d = new Date()
    const year = d.getFullYear()
    
    
    return (
        <div className='container'>
            <div className='inv'>
                <div className='heading'>
                    <div className='headers'>
                        <h2 style={{'marginTop': '0'}}>The Company</h2>
                        <p>221-B, Baker Street</p>
                        <p>London, England</p>
                        <p>Contact: 1234-5555</p>
                    </div>
                    <div className='headers'>
                        <h1 style={{'marginTop': '0', 'textAlign': 'center'}}>INVOICE</h1>
                        <ul>
                            <li><strong>Invoice ID: </strong> {invId.id.slice(0,10)}</li>
                            <li><strong>Date: </strong>{invoice.date}</li>
                        </ul>
                    </div>
                </div>
                <div className='billing'>BILL TO</div>
                <ul className='details'>
                    <li>{invoice.name}</li>
                    <li>{invoice.address}</li>
                    <li>{invoice.email}</li>
                    <li>{invoice.phone}</li>
                </ul>
                <div className='table'>
                    <table style={{'width': '100%'}}>
                        <tbody>
                        <tr style={{'background': '#DDDDDD'}}>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>Products</td>
                            <td>$ {invoice.product}</td>
                        </tr>
                        <tr>
                            <td>Service Fee</td>
                            <td>$ {invoice.service}</td>
                        </tr>
                        <tr>
                            <td>Labour Charges</td>
                            <td>$ {invoice.labour}</td>
                        </tr>
                        <tr>
                            <td style={{'rowSpan':'30'}}>Tax (4.25%)</td>
                            <td>$ {tax}</td>
                        </tr>
                        <div style={{'height':'80px'}}></div>
                        <tr className='total'>
                            <td>Total</td>
                            <td>$ {grand_total}</td>
                        </tr>
                        </tbody>
                    </table>  
                </div>
                <div className='payment'>
                    <p>How to pay: </p>
                    <ul style={{'listStyle': 'disc'}}>
                        <li>Send Check: Second Floor, Building No – B3, Nirlon Complex, Opp Western Express Highway, Goregaon (E)
                        Mumbai - 400 063</li>
                        <li>UPI number: +91 1234-567890</li>
                        <li>Paypal: payment@company.com</li>
                    </ul>
                    <p style={{'maginLeft': '50px'}}>For any queries contact +91 1234-567890</p>
                    <p style={{'color': 'grey', 'textAlign': 'center', 'marginBottom':'0'}}>The company <CopyrightIcon style={{ fontSize: 10 }}/> {year}</p>
                </div>
            </div>        
        </div>
    )
}

export default Invoice;
