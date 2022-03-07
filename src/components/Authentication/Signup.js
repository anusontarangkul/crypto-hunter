import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'

const Signup = ({ handleClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = () => { }
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