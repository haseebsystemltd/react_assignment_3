import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSelectCoin } from "./redux/actions/actionParamObj";
import Banner from "./banner";
import axios from "axios";

function Dashboard(props) {

    const loginUser = useSelector((state) => state.userReducer.loggedInUser);
    const [liveCoins, setLiveCoins] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get('http://laravel.haseebanjum.com/api/allCoins')
          .then(function (response) {
          
            setLiveCoins(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    function navigateTransferForm(coin) {
        dispatch(addSelectCoin(coin))
        navigate('/coinTransferForm');
    }

    return (
        <>
             <Banner pageTitle="Dashboard" />
            <div className="dashboard container">
                <h1 className="mt-5">Welcome to the dashboard</h1>
                <div className="card">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>Count</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            liveCoins ? 
                            loginUser.coins.map((coin, index) => {

                                let liveCoinIndex = liveCoins.findIndex((element)=> element.id == coin.id );
                                console.log(liveCoins[liveCoinIndex].price);

                                return <tr key={index}>
                                    <td>{coin.id}</td>
                                    <td>{coin.coinName}</td>
                                    <td>{liveCoins[liveCoinIndex].price}$</td>
                                    <td>{coin.count}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => navigateTransferForm(coin)} disabled={coin.count < 1 ? true : false}>Transfer</button>
                                    </td>
                                </tr>
                            })  : null
                        
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );

}

export default Dashboard;