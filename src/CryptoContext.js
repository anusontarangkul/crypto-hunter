import React, { createContext, useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import axios from 'axios'
import { CoinList } from './config/api'
import { auth } from './firebase'
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

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)

    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null)
        })
    }, [])

    useEffect(() => {
        if (currency === 'USD') setSymbol('$')
        else if (currency === 'INR') setSymbol('₹')
    }, [currency])
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}
