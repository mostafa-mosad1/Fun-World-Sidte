const space =document.getElementById("detailsData");
const mode = document.getElementById("mode");
const htmlAll = document.documentElement;

// ! =============> When Start ===============>
(function data() {
  const parms = new URLSearchParams(location.search);
  const id = parms.get("id");
  console.log(id);
  getGame(id);
})();

async function getGame(id) {
  const url =
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2b6d9ae4femsh7d33cc6942bdb64p1c302bjsnc48c0aaf5c90",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const api = await fetch(url, options);
    const response = await api.json();
   displayData(response)
  } catch (error) {
    console.error(error);
  }
}

function displayData(data) {
  const detailsBox = `
   
    <div class="col-md-4">
    <figure>
       <img src="${data.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb" class="text-light">
             <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
             <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
          </ol>
       </nav>
 
       <h1>${data.title}</h1>
 
       <h3>About ${data.title}</h3>
       <p>${data.description}</p>
 
       
    </div>
 </div>
 
    `;
    space.innerHTML=detailsBox;
    const backgroundImage = data.thumbnail.replace("thumbnail", "background");

    document.body.style.cssText = `
    background-image:url('${backgroundImage}') ;
    background-size:cover;
    background-position:center; `;
}

// ================== Events ========================
htmlAll.dataset.theme=localStorage.getItem("mode");

if(localStorage.getItem("mode")=="dark"){
  mode.classList.remove("fa-sun");
  mode.classList.add("fa-moon");
 }else{
  mode.classList.add("fa-sun");
  mode.classList.remove("fa-moon");

 }


mode.addEventListener("click", async function (e) {
 if(mode.classList.contains("fa-sun")){
  mode.classList.remove("fa-sun");
  mode.classList.add("fa-moon");
  htmlAll.dataset.theme="dark";
  localStorage.setItem("mode","dark");
  console.log("moon");
 }else{
  mode.classList.add("fa-sun");
  mode.classList.remove("fa-moon");
  htmlAll.dataset.theme="light";
  localStorage.setItem("mode","light");
  console.log("light");
 }

});
