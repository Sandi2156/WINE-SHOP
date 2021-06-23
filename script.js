let apiKey = '1948166876634520984ec9aa5b8361e0'


document.getElementById('btn1').addEventListener('click', ()=>{

    let wineName = document.getElementById('wine-by-name').value;
    fetch(`https://api.spoonacular.com/food/wine/recommendation?apiKey=1948166876634520984ec9aa5b8361e0&wine=${wineName}&number=9`)
    .then(res => res.json())
    .then(data => {
        console.log(data.recommendedWines)
        let temp = '';
        data.recommendedWines.forEach(element => {
            temp += `
            <div class="card" style="width: 22rem; margin:10px;">
            <img src="${element.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.description}</p>
            </div>
          </div>
            `
        })
        document.getElementById('wine-show').innerHTML = temp;
    })
})