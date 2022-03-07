import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from './config/api'
const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState('$')

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)

    }

    useEffect(() => {
        if (currency === 'USD') setSymbol('$')
        else if (currency === 'INR') setSymbol('₹')
    }, [currency])
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}
