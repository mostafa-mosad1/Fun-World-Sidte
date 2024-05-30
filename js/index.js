// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById("btnLogin");
const msg = document.getElementById("msg");
const formData = document.querySelector("form");
const htmlAll = document.documentElement;
let isValid = false;
const mode = document.getElementById("mode");
// ! =============> When Start ===============>

// * =============> Events ===============>

formData.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validationEmail()
    // && validationPassword()
  ) {
    console.log("helllo");
    dataInputs();
  }
});

inputs[0].addEventListener("input", function () {
  validationEmail();
});
inputs[1].addEventListener("input", function () {
  validationPassword();
});

htmlAll.dataset.theme = localStorage.getItem("mode");

if (localStorage.getItem("mode") == "dark") {
  mode.classList.remove("fa-sun");
  mode.classList.add("fa-moon");
} else {
  mode.classList.add("fa-sun");
  mode.classList.remove("fa-moon");
}

mode.addEventListener("click", async function (e) {
  if (mode.classList.contains("fa-sun")) {
    mode.classList.remove("fa-sun");
    mode.classList.add("fa-moon");
    htmlAll.dataset.theme = "dark";
    localStorage.setItem("mode", "dark");
    console.log("moon");
  } else {
    mode.classList.add("fa-sun");
    mode.classList.remove("fa-moon");
    htmlAll.dataset.theme = "light";
    localStorage.setItem("mode", "light");
    console.log("light");
  }
});

// ! =============> Functions ===============>

function dataInputs() {
  const data = {
    email: inputs[0].value,
    password: "mo123456",
    // inputs[1].value,
  };

  console.log("data is ", data);
  getData(data);
}

async function getData(userData) {
  const api = await fetch("https://movies-api.routemisr.com/signin", {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  console.log(response);
  if (response.message == "success") {
    localStorage.setItem("uToken", response.token);
    location.href = `./home.html`;
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

function validationEmail() {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regexStyle.test(inputs[0].value)) {
    // el tmam
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  } else {
    //el mesh tmam

    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");

    return false;
  }
}

function validationPassword() {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regexStyle.test(inputs[1].value)) {
    // el tmam
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true;
  } else {
    //el mesh tmam

    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");

    return false;
  }
}
