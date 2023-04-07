import axios from 'axios';
import { EqualStencilFunc } from 'three';
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
  
    const url = `http://openlibrary.org/search.json?title=${query}&language:eng`;
    console.log(url)
  
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        let dropdown = document.querySelector(".drop-down")
        dropdown.classList.remove("hidden")
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

let dropdown = document.querySelector(".drop-down")

dropdown.addEventListener("mouseleave",function(){
    dropdown.classList.add("hidden")
})

let homeSelect = document.querySelectorAll(".home-select")



for (var i = 0; i < homeSelect.length; i++) {

    homeSelect[i].addEventListener('click', function() {
        let categories = document.querySelector("#category-component")
        let trending = document.querySelector("#trending-component")
        let discover = document.querySelector("#discover-component")
      for (var j = 0; j < homeSelect.length; j++) {
        homeSelect[j].classList.remove('active');
      }
      this.classList.add('active');
      if(this.classList.contains("our-categories")){
        console.log("categories")
        categories.classList.remove('hidden')
        trending.classList.add('hidden')
        discover.classList.add('hidden')

      }else if(this.classList.contains("trending")){
        console.log("trend")

        trending.classList.remove('hidden')
        categories.classList.add('hidden')
        discover.classList.add('hidden')
      }else{
        discover.classList.remove('hidden')
        categories.classList.add('hidden')
        trending.classList.add('hidden')
      }
    });
  }

  