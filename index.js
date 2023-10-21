let pokemons = {};
fetch("https://pokeapi.co/api/v2/pokemon/").then(respones => {
    console.log(respones);
    if(respones.ok)
        return respones.json();
}).then(pokemons => {      
    console.log(pokemons['results']);
    var pokemonList = pokemons['results'];
    pokemonList.forEach(item => {
        
        Add2List(item['name'], item['url']);
    });
    
}).catch( error => {
    console.log("can't fetch data from API.")
});


var Add2List = (name, url)=>{
    var urlsplited = url.split("/");
    console.log(urlsplited[6]);
    var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + 
        urlsplited[6] + ".png"

    var pokemonDiv = document.getElementById("pokemonlist");
    var card = document.createElement("div")
    card.setAttribute("class", "card col-3");

    var imag = document.createElement("img");
    imag.setAttribute("class", "card-img-top");
    imag.setAttribute("src", imageUrl);

    var nameDiv = document.createElement("div")
    nameDiv.setAttribute("class", "card-body");

    var title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = name;

    var button = document.createElement("a");
    button.setAttribute("class", "btn btn-primary","center");
    button.setAttribute("href", "#");
    button.innerText = "show";
    button.addEventListener("click", () => {
      showDetails(name);
    });

    nameDiv.appendChild(title);
    nameDiv.appendChild(button);

    card.appendChild(imag);
    card.appendChild(nameDiv);
    pokemonDiv.appendChild(card);

}
var showDetails = (name) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(response => {
      if (response.ok)
        return response.json();
    })
    .then(pokemonDetails => {
      var modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
      var modalTitle = document.getElementById("modalTitle");
      var modalImage = document.getElementById("modalImage");
      var modalDetails = document.getElementById("modalDetails");

      modalTitle.innerText = name;
      modalTitle.setAttribute("class", "title-center");
      modalImage.setAttribute("src", pokemonDetails.sprites.front_default);

      var filteredStats = pokemonDetails.stats.filter(stat => {
        return ["hp", "attack", "defense", "speed"].includes(stat.stat.name);
      });

      var statsHTML = `
        <div class="col-6">
          <h5>Stats:</h5>
          <ul>
            ${filteredStats
              .map(stat => `<li>${stat.stat.name}:${stat.base_stat}</li>`)
              .join("")}
          </ul>
        </div>
      `;

      var detailsHTML = `
        <div class="row">
          <div class="col-6">
            <p>Height: ${pokemonDetails.height} </p>
            <p>Weight: ${pokemonDetails.weight} </p>
            <p>Base Experience: ${pokemonDetails.base_experience}</p>
            <!-- Add more basic details if needed -->
          </div>
          ${statsHTML}
        </div>
      `;

      modalDetails.innerHTML = detailsHTML;
      modal.show();
    })
    .catch(error => {
      console.log("Can't fetch Pokemon details from the API.");
    });
};


