import { logDOM } from "@testing-library/react";

const initialState = {
    users: [
        {
            name: 'haseebanjum',
            email: 'haseebanjum8421@gmail.com',
            password: 'asd',
            address: 'dummy address',
            status: "active",
            loginAttempts: 0,
            coins: [
                {
                    id: 12,
                    coinName: 'gold-coin',
                    count: 3
                },
                {
                    id: 24,
                    coinName: 'silver-coin',
                    count: 6
                }
            ]
        },

        {
            name: 'tayyab',
            email: 'tayyab@gmail.com',
            password: 'asd',
            address: 'dummy address',
            status: "active",
            loginAttempts: 0,
            coins: [
                {
                    id: 12,
                    coinName: 'gold-coin',
                    count: 18
                },
                {
                    id: 24,
                    coinName: 'silver-coin',
                    count: 6
                }
            ]
        },

        {
            name: 'moshsin',
            email: 'moshsin@gmail.com',
            password: 'asd',
            address: 'dummy address',
            status: "active",
            loginAttempts: 0,
            coins: [
                {
                    id: 12,
                    coinName: 'gold-coin',
                    count: 10
                },
                {
                    id: 24,
                    coinName: 'silver-coin',
                    count: 6
                }
            ]
        },
    ],
    loggedInUser: null,
    selectCoin: null
};

const userReducer = (state = initialState, action) => {

    let payload = action.payload;

    switch (action.type) {
        case 'transfer_coin':

            let userStateCopy = [...state.users]; // Take copy of users state

            let recUserIndex = userStateCopy.findIndex((user) => user.email == payload.transferDetail.recevier); // find Receiver user index
            let recUser = { ...userStateCopy[recUserIndex] }; // receiver User


            let recUserCoins = [...recUser.coins]; // Take a copy of coins array of receiver user
            let recUserCoinsIndex = recUserCoins.findIndex((coin) => coin.id == state.selectCoin.id); // find index of particular user


            recUserCoins[recUserCoinsIndex] = {
                ...recUserCoins[recUserCoinsIndex],
                count: recUserCoins[recUserCoinsIndex].count + parseInt(payload.transferDetail.tCoinCount)
            }


            recUser = {
                ...recUser,
                coins: recUserCoins
            }

            userStateCopy[recUserIndex] = recUser;



            let senUserIndex = userStateCopy.findIndex((user) => user.email == payload.transferDetail.sender);
            let senUser = { ...userStateCopy[senUserIndex] };
            let senUserCoins = [...senUser.coins];
            let senUserCoinsIndex = senUserCoins.findIndex((coin) => coin.id == state.selectCoin.id);

            senUserCoins[senUserCoinsIndex] = {
                ...senUserCoins[senUserCoinsIndex],
                count: senUserCoins[senUserCoinsIndex].count - payload.transferDetail.tCoinCount
            }

            senUser = {
                ...senUser,
                coins: senUserCoins
            }

            userStateCopy[senUserIndex] = senUser;

            return {
                ...state,
                selectCoin: null,
                users: userStateCopy,
                loggedInUser: senUser
            };

        case 'select_coin':

            return {
                ...state,
                selectCoin: payload.coin
            };

        case 'register_user':

            let userStateCopy1 = [...state.users];

            userStateCopy1.push(payload.user);

            return {
                ...state,
                users: userStateCopy1
            };
        case 'login_user':

            return {
                ...state,
                loggedInUser: payload.user
            };
        case 'logout_user':
            console.log('asdasd');
            return {
                ...state,
                loggedInUser: null
            };
        default:
            return state;
    }
};

export default userReducer;
