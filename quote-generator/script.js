const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuote = document.getElementById('new-quote')

// GET QUOTE FROM API
async function getQuote() {
    const apiUrl = 'https://api.quotable.io/random';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log('data ->', quoteText);

        if(data.author === '') {
            authorText.innerText = 'Unknown'
        }
        else {
            authorText.innerText ='- '+data.author
        }

        if(data.content.length > 50) {
            quoteText.classList.add('long-quote')
        }
        else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.textContent = data.content;

    } catch(error) {
        console.log('whopps, no quote', error)
    }
}

// TWEET QUOTE
function tweetQuote() {
    const quote = quoteText.innerHTML;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

//EVENT LISTENERS
newQuote.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// ON LOAD
getQuote();