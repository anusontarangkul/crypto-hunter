
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext'

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace'
    },
    profile: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        height: '92%'
    },
    picture: {
        width: 200,
        height: 200,
        cursor: 'pointer',
        backgroundColor: '#EEBC1D',
        objectFot: 'contain'
    },
    logout: {
        height: '8%',
        width: '100%',
        backgroundColor: '#EEBC1D',
        marginTop: 20
    }
});

const logOut = () => { }

export default function UserSidebar() {
    const { user } = CryptoState();
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: 'pointer',
                            backgroundColor: '#EEBC1D'
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: '100%',
                                        fontSize: 25,
                                        textAlign: 'center',
                                        fontWeight: 'bolder',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}
                            >logout
                            </Button >
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
