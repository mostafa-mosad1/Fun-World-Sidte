// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formData = document.querySelector("form");
let isValid = false;
const mode = document.getElementById("mode");
const htmlAll = document.documentElement;
const msg = document.getElementById("msg");

// ! =============> When Start ===============>

// * =============> Events ===============>
formData.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validationName(inputs[0]) &&
    validationName(inputs[1]) &&
    validationEmail() &&
    validationPassword() &&
    validationAge()
  ) {
    console.log("helllo");
        dataInputs();
      // location.href=`./index.html`
  }
});

inputs[0].addEventListener("input", function () {
  validationName(inputs[0]);
});
inputs[1].addEventListener("input", function () {
  validationName(inputs[1]);
});
inputs[2].addEventListener("input", function () {
  validationEmail();
});
inputs[3].addEventListener("input", function () {
  validationPassword();
});
inputs[4].addEventListener("input", function () {
  validationAge();
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

function dataInputs() {
  const data = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };

  console.log(data);
  getData(data);
}

async function getData(userData) {
  const api = await fetch("https://movies-api.routemisr.com/signup", {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  if(response.message == "success"){
   location.href=`./index.html`
  }

  if (response.message == "success") {
    msg.innerHTML = response.message;
    msg.style.cssText = `
  color:green !important;
  font-size: 25px;
  `;
  } else {
    msg.innerHTML = response.message;
    msg.style.cssText = `
  color:red !important;
  font-size: 25px;
  `;
  }
  console.log(response);
 
}

//  =============> Validation ===============>
function validationName(input) {
  const regexStyle =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (regexStyle.test(input.value)) {
    // el tmam
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    //el mesh tmam

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    return false;
  }
}

function validationEmail() {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regexStyle.test(inputs[2].value)) {
    // el tmam
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    //el mesh tmam

    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");

    return false;
  }
}

function validationPassword() {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regexStyle.test(inputs[3].value)) {
    // el tmam
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    //el mesh tmam

    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");

    return false;
  }
}

function validationAge() {
  const regexStyle = /^([1-7][0-9]|80)$/;

  if (regexStyle.test(inputs[4].value)) {
    // el tmam
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    //el mesh tmam

    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");

    return false;
  }
}
