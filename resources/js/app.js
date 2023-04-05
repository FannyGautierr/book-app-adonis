import axios from 'axios';
import '../css/app.css'


let category = document.querySelectorAll(".category")

category.forEach((item)=>{
    item.addEventListener("click", function(){
        document.cookie = "category="+item.innerHTML.toLowerCase();
        console.log(document.cookie)
    })
})

function getCookieValue(cookieName) {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }
  
    return null;
  }


let recoUrl = document.querySelector(".reco")
document.addEventListener("DOMContentLoaded",function(){
    
    let category = getCookieValue('category');
    if(category !== null){
        recoUrl.href = '/reco/'+category
    }else{
        recoUrl.href = '/reco/classics'
    }

})


let searchInput = document.querySelector(".search-input")

searchInput.addEventListener("keydown", function(event){
    let query = searchInput.value 
    const fetch = require('node-fetch');
  
    const url = `http://openlibrary.org/search.json?title=${query}`;
    console.log(url)
  
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        let dropdown = document.querySelector(".drop-down")
        dropdown.innerHTML=""
        for(let i = 0; i <10 ; i++){
            let dropdown = document.querySelector(".drop-down")
            let link = document.createElement("a")
            let key = json.docs[i].key.substring(6)
            link.href = "/book"+ key 
            let title = document.createElement("p")
            title.innerHTML = json.docs[i].title
            link.appendChild(title)
            dropdown.appendChild(link)
    
        }
    })
    .catch(err => console.log(err))  


})