const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuote = document.getElementById('new-quote')
const loader = document.getElementById('loader')


// SHOW LOADING
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// HIDE LOADING
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// GET QUOTE FROM API
async function getQuote() {

    showLoadingSpinner();
    
    const apiUrl = 'https://api.quotable.io/random';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log('data ->', quoteText);

        // IF AUTHOR IS BLANK, ADD 'Unknown'
        if(data.author === '') {
            authorText.innerText = 'Unknown'
        }
        else {
            authorText.innerText ='- '+data.author
        }

        // REDUCE FONT SIZE FOR LONG QUOTES
        if(data.content.length > 120) {
            quoteText.classList.add('long-quote')
        }
        else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.textContent = data.content;

        // STOP LOADER, SHOW QUOTE
        removeLoadingSpinner();

        // throw new Error('Oops!!')

    } catch(error) {
        getQuote();
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

