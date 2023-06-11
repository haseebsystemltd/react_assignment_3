import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferCoin } from "./redux/actions/actionParamObj";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Banner from "./banner";

function CoinTransferForm(props) {

    let [selectUser, setSelectUser] = useState('');
    let [transferCoinCount, setTransferCoinCount] = useState('');

    let [coinTransFormError, setCoinTransFormError] = useState('');

    const userState = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function coinTransferFormHandler(e) {
        e.preventDefault();

        if (userState.selectCoin.count > transferCoinCount) {
            dispatch(transferCoin({
                sender: userState.loggedInUser.email,
                recevier: selectUser,
                tCoinCount: transferCoinCount
            }));

            navigate('/dashboard');
        } else {
            setCoinTransFormError('You dont have enough coins in you wallet')
        }


    }

    return (
        <>
            <Banner pageTitle="Transfer Coins" />
            <div className="coinTransferForm container">
                <h1 className="mt-5">Transfer Form</h1>


                {coinTransFormError != '' ?
                    <Alert variant="danger" >
                        <Alert.Heading>{coinTransFormError}</Alert.Heading>
                    </Alert> : ""
                }

                <form onSubmit={coinTransferFormHandler}>

                    <div className="form-group">
                        <label ></label>
                        <select className="form-control" name="" id="" value={selectUser} onChange={(e) => setSelectUser(e.target.value)} required={true}>
                            <option value={''}>Select User</option>
                            {userState.users.map((user, index) => {
                                return (
                                    <>
                                        {
                                            user.email == userState.loggedInUser.email ? null : <option key={index} value={user.email}>{user.email}</option>
                                        }

                                    </>
                                )
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label >Transfer Coins</label>
                        <input
                            type="number"
                            className={`form-control`}
                            name="title"
                            onChange={(e) => setTransferCoinCount(e.target.value)}
                            value={transferCoinCount}
                            required={true}
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary">Submit</button>

                </form>

            </div>
        </>
    );

}

export default CoinTransferForm;