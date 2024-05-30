// ? =============> Global ===============>
const links = document.querySelectorAll(".menu a");
const loading = document.querySelector(".loading");
const mode = document.getElementById("mode");
const log_out = document.querySelector(".logout-btn");
const htmlAll = document.documentElement;
// ! =============> When Start ===============>
getGame("mmorpg");
// * =============> Events ===============>

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");
    const category = link.dataset.category;
    getGame(category);
  });
});

log_out.addEventListener("click", async function (e) {
 toasterPop();
 localStorage.removeItem("uToken")
});


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


// ! =============> Functions ===============>

async function getGame(cat) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2b6d9ae4femsh7d33cc6942bdb64p1c302bjsnc48c0aaf5c90",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    loading.classList.remove("d-none");

    const api = await fetch(url, options);
    const response = await api.json();
    // console.log(response[0]);

    displayData(response);

    loading.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
}

function displayData(games) {
  let gamesBox = "";
  for (let i = 0; i < games.length; i++) {
    let videoPath = games[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    ); /// https://www.freetogame.com/g/540/thumbnail.jpg

    gamesBox += `
       <div class="col">
       <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${games[i].id})" class="card h-100 bg-transparent" role="button" >
          <div class="card-body">
 
             <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${games[i].thumbnail}" />
 
              <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
               <source src="${videoPath}">
               </video>
 
             </figure>
 
             <figcaption>
 
                <div class="hstack justify-content-between">
                   <h3 class="h6 small"> ${games[i].title} </h3>
                   <span class="badge text-bg-primary p-2">Free</span>
                </div>
 
                <p class="card-text small text-center opacity-50">
                   ${games[i].short_description}
                </p>
 
             </figcaption>
          </div>
 
          <footer class="card-footer small hstack justify-content-between">
 
             <span class="badge badge-color">${games[i].genre}</span>
             <span class="badge badge-color">${games[i].platform}</span>
 
          </footer>
       </div>
    </div>
       `;
  }

  document.getElementById("gameData").innerHTML = gamesBox;
}

function startVideo(event) {
  const videoEl = event.target.querySelector("video"); // card ---> video
  videoEl.classList.remove("d-none");
  videoEl.muted = true;
  videoEl.play();
}

function stopVideo(event) {
  const videoEl = event.target.querySelector("video");
  videoEl.classList.add("d-none");
  videoEl.muted = true;
  videoEl.pause();
}

function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}
async function toasterPop (){
    $(document).ready(function () {
        toastr.options.timeOut = 32000; // 3s
        toastr.success(`good lock!  <div class="loading ">
        <span class="loader"></span>
     </div>`);
        $("#linkButton").click(function () {
          toastr.success("Click Button");
        });
      });
    
      await setTimeout(() => {
        location.href = "./index.html";
      }, 3000);
      loading.classList.add("d-none");
}