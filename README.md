# Crypto Hunter

An app where you can search crypto and add certain crypto to your own personal watchlist.

![screenshot](screenshot.png)

|                                         |                                         |                                                   |
| :-------------------------------------: | :-------------------------------------: | :-----------------------------------------------: |
|     [Introduction](#crypto-hunter)      | [Table of Contents](#table-of-contents) | [Development Highlights](#development-highlights) |
|      [Installation](#Installation)      |    [Page Directory](#page-directory)    |       [Code Hightlights](#code-highlights)        |
| [Technologies Used](#Technologies-Used) |           [Credits](#Credits)           |                [License](#License)                |

## Development Highlights

- Use React Context to store global state used in different components
- Axios Get crypto endpoints
- Login and Google login through firebase
- Save Watchlist using Firestore

## Installation

```
npm i
```

## Page Directory

This app is seperated into components, pages, and configuration.

## Code Highlights

Used useEffect to check if the user is logged in.

```JavaScript
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else setUser(null)
        })
    }, [])
```

Add a crypto to watch list.

```JavaScript
    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
                { merge: true }
            );
            setAlert({
                open: true,
                message: `${coin.name} Added to the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };
```

## Technologies

- [react](https://reactjs.org/)
- [firebase](https://firebase.google.com/)
- [mui](https://mui.com/)

## Credits

This project followed the tutorial by [Roadside Coder](https://www.youtube.com/watch?v=QA6oTpMZp84)

|                           |                                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **David Anusontarangkul** | [![Linkedin](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/anusontarangkul/) [![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/anusontarangkul) |

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
