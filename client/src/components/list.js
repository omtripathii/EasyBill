import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import Card from './card';
import './index.css';

function List() {
    const [invlist, setInvlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/invoice`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data); // Inspect the API response
            setInvlist(response.data.message || []);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const viewHandler = (id) => {
        navigate(`/${id}`);
    }

    const invoiceList = (invlist || []).map(inv => (
        <li key={inv._id}>
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
    ));

    return (
        <div className="list">
            <h2 style={{ 'marginTop': '0' }}>
                <Link style={{ 'textDecoration': 'none', 'color': 'white' }} to='/add'>
                    <AddCircleOutlineIcon /> Create Invoice
                </Link>
            </h2>
            <ul>
                {invoiceList}
            </ul>
        </div>
    );
}

export default List;
