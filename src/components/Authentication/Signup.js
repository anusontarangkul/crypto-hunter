import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from '@firebase/auth'

const Signup = ({ handleClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { setAlert } = CryptoState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: 'Passwords do not match',
                type: 'error'
            })
            return
        }
        console.log('after vali')
        try {
            console.log('in try')
            const result = await createUserWithEmailAndPassword(auth, email, password)
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: 'success'
            })
            handleClose()
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            })
        }
    }
    return (
        <div>
            <Box
                p={3}
                style={{ display: "flex", flexDirection: "column", gap: '20px' }}
            >
                <TextField
                    variant="outlined"
                    type="email"
                    label="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                >
                </TextField>
                <TextField
                    variant="outlined"
                    type="password"
                    label="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                >
                </TextField>
                <TextField
                    variant="outlined"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                >
                </TextField>
                <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "#EEBC1D" }}
                    onClick={handleSubmit}
                >Sign Up</Button>
            </Box>
        </div>
    )
}

export default Signup
