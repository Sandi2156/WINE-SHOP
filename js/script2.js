let apiKey = '1948166876634520984ec9aa5b8361e0';


document.querySelector('.button-container').addEventListener('click', ()=> {
    let wineName = document.getElementById('filter-jobs').value;
    findWines(wineName);
})

document.getElementById('input-wine').addEventListener('keyup', (e)=> {
    if(e.keyCode === 13) {
        let wineName = document.getElementById('input-wine').value;
        findWines(wineName);
    }
})

function findWines(wineName) {
    fetch(`https://api.spoonacular.com/food/wine/recommendation?apiKey=${apiKey}&wine=${wineName}&number=12`)
    .then(checkError)
    .then(res => res.json())
    .then(data => show_Wines(data))
    .catch(error => {
        show_Wines(null);
    })
}

function checkError(res) {
    if(res.code>=400 && res.code<599) throw new Error('Error occured');
    
    return res;
}

function show_Wines(wines) {
    // console.log(wines)
    
    document.querySelector('.error-container').innerHTML = '';
    let all = '';
    if(wines) {
    wines.recommendedWines.forEach(wine => {
        all += `
        <div class="wine-card">
        <div class="card-top">
            <img src="${wine.imageUrl}" alt="">
            <span class="material-icons more_horiz">more_horiz</span>
        </div>
        <div class="title">
            <span>${wine.title}</span>
        </div>
        <div class="quality-section">
            <div class="rating">
                <i class="fas fa-star-half-alt"></i>
                <span>${ Number.parseFloat(wine.averageRating).toPrecision(2)}</span>
            </div>
            <div class="price">
                <i class="fas fa-dollar-sign"></i>
                <span>${wine.price.substring(1,wine.price.length)}</span>
            </div>
        </div>
        <div class="description">
            ${wine.description.length >= 240 ? wine.description.substring(0,240) : wine.description}..

        </div>
        <div class="shop-button">
            <a href="${wine.link}" target='_blank'>
            <span>Buy Now</span>
            <i class="fas fa-shopping-cart"></i>
            </a>
        </div>
    </div>
            `
        })
        document.querySelector('.wines-container').innerHTML = all;
    } 
    else {
        all += `<h2 id="error">Not Found !</h2>`;
        document.querySelector('.error-container').innerHTML = all;
    }
}