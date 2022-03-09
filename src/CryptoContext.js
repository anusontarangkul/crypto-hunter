import React, { createContext, useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import axios from 'axios'
import { CoinList } from './config/api'
import { auth, db } from './firebase'
import { doc, onSnapshot } from "@firebase/firestore"
const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState('$')
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        type: 'success'
    })
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, 'watchlist', user.uid)
            var unsubscribe = onSnapshot(coinRef, coin => {
                if (coin.exists()) {
                    console.log(coin.data().coins)
                    setWatchlist(coin.data().coins)
                } else {
                    console.log('no items in watchlist')
                }
            })
            return () => {
                unsubscribe()
            }
        }

    }, [user])
    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)

    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                console.log('user', user)
            }

            else setUser(null)
        })

    }, [])

    useEffect(() => {
        if (currency === 'USD') setSymbol('$')
        else if (currency === 'INR') setSymbol('₹')
    }, [currency])
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}
