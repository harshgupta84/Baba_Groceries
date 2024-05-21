import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [earningsByDay, setEarningsByDay] = useState({});

    useEffect(() => {
        const getHistory = async () => {
            try {
                if (token) {
                    const endpoint = isAdmin ? '/api/payment' : '/user/history';
                    const res = await axios.get(endpoint, {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                    calculateEarnings(res.data);
                }
            } catch (error) {
                console.error('Error fetching order history:', error.message);
            }
        };

        const calculateEarnings = (historyData) => {
            const earnings = {};

            historyData.forEach((order) => {
                const date = new Date(order.createdAt).toLocaleDateString();

                if (earnings[date]) {
                    earnings[date] += order.cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    );
                } else {
                    earnings[date] = order.cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    );
                }
            });

            setEarningsByDay(earnings);
        };

        getHistory();
    }, [token, isAdmin, setHistory]);

    return (
        <div className="history-page">
            <h2>Order History</h2>

            <h4>
                {isAdmin
                    ? `You have completed ${history.length} orders`
                    : `You have ordered ${history.length} items`}
            </h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchase</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => (
                        <tr key={item._id}>
                            <td>{item.paymentID}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/history/${item._id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isAdmin && (
                <div className="earnings-table">
                    <h3>Daywise Earnings</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Earnings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(earningsByDay).map(([date, earnings]) => (
                                <tr key={date}>
                                    <td>{date}</td>
                                    <td>{earnings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
