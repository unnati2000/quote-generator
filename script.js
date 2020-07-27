// get quote from api
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  loading();
  const proxyUrl = 'https://nitinr-cors.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      AuthorText.innerText = 'Unkmown';
    } else {
      AuthorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;

    complete();

    //  console.log(data);
  } catch (err) {
    getQuote();
    console.log('err', err);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = AuthorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterbtn.addEventListener('click', tweetQuote);
