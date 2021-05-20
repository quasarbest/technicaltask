//TABS ==========================================================================
const tabsBtn   = document.querySelectorAll(".nav-btn")
const tabsItems = document.querySelectorAll(".tabs_page")

tabsBtn.forEach(onTabClick);
// главная function
function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab")
        let currentTab = document.querySelector(tabId)

        if( ! currentBtn.classList.contains('active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active')
            });
    
            tabsItems.forEach(function(item) {
                item.classList.remove('active')
            });
    
            currentBtn.classList.add('active')
            currentTab.classList.add('active')
        }
    });
}
document.querySelector('.nav-btn').click()

//TABS - END ==========================================================================

// запрос фото
fetch('https://api.unsplash.com/photos/?client_id=7KgQXADb7ejIrHk90YJQCOsyycbx7-LvEK4irs3Di_E&w=1500&dpr=2') 
  .then(response => response.json())
  .then(data => getLink(data)); 

function getLink(data) {
    let objLength = data.length 
    let imgBox = document.querySelector('.img') 
    for (let i = 0; i < objLength; i++) { 
        let img = document.createElement('img') 
        img.setAttribute('src', data[i].urls.regular) 
        imgBox.append(img) 
    }
}

// поиск фото
let searchBtn = document.querySelector('.searchBtn') 
let myInput = document.querySelector('.query') 
let history = document.querySelector('.history') 

let historyArray = []
searchBtn.addEventListener('click', function(){
    historyArray.push(myInput.value) 
    let historyStorage = localStorage.setItem('history', JSON.stringify(historyArray)) 


    fetch(`https://api.unsplash.com/search/photos?query=${myInput.value}&client_id=7KgQXADb7ejIrHk90YJQCOsyycbx7-LvEK4irs3Di_E&w=1500&dpr=2`) // fetch запрос
    .then(response => response.json())
    .then(data => getSearch(data)); 

    function getSearch(data) {
        let searchLength = data.results.length 
        let resultBox = document.querySelector('.results') 
        for (let i = 0; i < searchLength; i++) { 
            let imgRes = document.createElement('img') 
            imgRes.setAttribute('src', data.results[i].urls.regular) 
            resultBox.prepend(imgRes) 
        }
    }
})

// очистить результаты поиска (картинки) и вывести историю поиска ================================
let clear = document.querySelector('.clear')
clear.addEventListener('click', function () {
    document.querySelector('.results').value = ''
    myInput.value = ''
    let getHistoryArray = JSON.parse(localStorage.getItem('history'))
    history.innerHTML = ''
    for (let a = 0; a < getHistoryArray.length; a++) {
        
        let p = document.createElement('p')
        p.innerHTML = getHistoryArray[a]
        history.prepend(p)
    }
});

// Добавление в историю ==========================================================================
function valueHistory() {
    let btn = document.querySelectorAll('.history')
    btn.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            myInput.value = e.target.textContent    
        });
    });

};
valueHistory();

// добавление в избранное ========================================================================
let favorite = []
document.querySelector('.results').addEventListener('click', function (e) {
    favorite.push(e.target.getAttribute('src'))
    localStorage.setItem('favorite', JSON.stringify(favorite))
});
if (true) {
    let favoriteBox = document.querySelector('.favorite')
    let favoriteGetArray = JSON.parse(localStorage.getItem('favorite'))
    for (let x = 0; x < favoriteGetArray.length; x++) {
        let favImg = document.createElement('img')
        favImg.setAttribute('src', favoriteGetArray[x])
        favoriteBox.prepend(favImg)
    }
};

