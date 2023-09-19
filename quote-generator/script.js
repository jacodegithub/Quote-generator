// GET QUOTE FROM API
async function getQuote() {

    const apiUrl = 'https://api.quotable.io/random';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log('whopps, no quote', error)
    }
}

// ON LOAD
getQuote();