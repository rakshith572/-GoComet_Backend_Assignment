const socket=io();
const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results')
const history_btn=document.querySelector('.history-btn');
const historyHTML = document.querySelector('.history');
const loadHTML = document.querySelector('.loading');

form.addEventListener('submit', formSubmitted);

history_btn.addEventListener('click',()=>{
  getHistory().then(showHistory);
});
const getHistory=()=>{
  return fetch(`/history`).then(res=>res.json());
}
function showHistory(results) {
  resultsList.innerHTML=``;
  var HTMLTag =`<dt class="col-sm-3">History</dt>\n`;
  var aTag=``;
  if(results){   
    results.forEach(element => {
      console.log(element);
      aTag+=`<a href=/tag.html?tag=${element.tag}>${element.tag}</a>`;
      aTag+='<br>'
    });
  }
  HTMLTag+=`<dd class="col-sm-9">${aTag}</dd>`;

  historyHTML.innerHTML=HTMLTag;

}
function formSubmitted(event) {
  event.preventDefault();

  const searchTerm = searchInput.value;
  // console.log(searchTerm)
  
    historyHTML.innerHTML=``;
    resultsList.innerHTML=``;
  getSearchResults(searchTerm)
    // .then(showResults);
}

function getSearchResults(searchTerm) {
  return fetch(`/search/${searchTerm}`)
    .then(res => res.json());
}

socket.on('log-receive',(ele)=>{
    // loadHTML.innerHTML='Loading...'
    // wait(5);
    // loadHTML.innerHTML=''
    showResults(ele);
});
function showResults(results) {
  if(results==null){
    resultsList.innerHTML=`<h1>404 Error - Page Not Found</h1>
    <p>We're sorry, but the page you requested could not be found. Please check that you have entered the correct URL, or try one of the following options:</p>
    <ul>
      <li>Go back to the previous page</li>
      <li>Please click on history</li>
      <li>Contact us if you think there is an error</li>
    </ul>`;
    return;
  }
  const tag=results;
//   results.forEach(tag => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = tag.BlogTitle;
    
    a.href = '/blog.html?id=' + tag.id;
//     console.log(a.href);
    li.appendChild(a);
    resultsList.appendChild(li);
    const br=document.createElement('br');
    resultsList.appendChild(br);
//   });
}
