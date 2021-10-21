class StartSession {
  constructor() {}
  validationUser() {
    let email = document.getElementById("emailLogin").value;
    let pass = document.getElementById("loginPassword").value;
    console.log(email, "Email");
    if (email == undefined || email == "") {
      alert("Please enter the email.");
      return false;
    }
    if (pass == undefined || pass == "") {
      alert("Please enter the password.");
      return false;
    }
    return this.loginUser(email,pass)
  }
  async loginUser(email,pass) {
    

    let dataInsert = {
      email: email,
      userPasword: pass,
    };
    console.log(dataInsert);
    let url = await fetch("http://localhost:3000/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInsert),
    });
    console.log(url);
    try {
      const data = await url.json();
      console.log(data);
      localStorage.setItem("myData",data.token);
      alert("Iniciando cession");
     window.location="./perfilUser.html"
    } catch (error) {
      localStorage.setItem("myData",data);
     
      alert("Error usuarios y contraseñas incorrectos")
    }
    
  }
}
const loginStart = new StartSession();

function signOf(){
  console.log(Hola);
  window.location="./index.html"
}