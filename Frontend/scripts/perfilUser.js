let globalToken,sendEmail,token;
const imagePreview = document.querySelector('.img-preview');
const imageUploader = document.getElementById('img-uploader');
const CLOUDINARY_URL=' https://api.cloudinary.com/v1_1/do6splh6t/image/upload';
const CLOUDINARY_UPLOAD_PRESET='present_photos'

imageUploader.addEventListener('change',async(e)=>{
  let url_photo=""
  try {
    const file= e.target.files[0];//informacion de la imagen
  const formData= new FormData();
  formData.append('file',file);//agregar la foto
  formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)

  const res=await axios.post(CLOUDINARY_URL,formData,{
      headers:{
          'Content-Type':'multipart/form-data'
      }
  });
  
  url_photo=res.data.secure_url;
  viewPhto(url_photo);
  } catch (error) {
    alert("Error la imagen no se subio")
  }
  
});

async function getPerfilUser() {
   token = localStorage.getItem("myData");
  globalToken = token;
  let infoUser = JSON.parse(atob(token.split(".")[1]));
  let emailUser = infoUser.data[0][0].emailUsr;
  sendEmail = infoUser.data[0][0].emailUsr;
  let data = {
    email: emailUser,
  };
  console.log("My email", data);
  let url = await fetch("http://localhost:3000/usersTeclers", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  const date = await url.json(url);
  console.log(date);
  changeInfoUser(date);
}
getPerfilUser();

const viewPhto=async(url_photo)=>{

  console.log(url_photo," ",sendEmail);
  let dataUrl={
    urlPhoto:url_photo,
    emailUsr:sendEmail
  }
  let searching = await fetch("http://localhost:3000/urlImageSave", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dataUrl),
  });
  const date = await searching.json(searching);
  console.log("La url", date);
}

const getPhoto=async(url_photo)=>{

  console.log(url_photo," ",sendEmail);
  let dataUrl={
    emailUsr:sendEmail
  }
  let searching = await fetch("http://localhost:3000/getUrlImage", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dataUrl),
  });
  const date = await searching.json(searching);
  imagePreview.src = date.photoUserUrl;
  console.log("La url", date);
}
getPhoto();
const signOf = () => {
  console.log("Hola");
  sessionStorage.removeItem("myData");
  window.location = "./index.html";
};
const changeInfoUser = (dateUser) => {
  let inputName = document.querySelector(".userName");
  inputName.innerHTML = "";
  try {
    console.log("Hola llamando", dateUser.token[0].nameUsrPage);
    inputName.innerHTML += `${dateUser.token[0].nameUsrPage}`;
    let inputNamePerfil = document.querySelector(".userNamePerfil");
    inputNamePerfil.innerHTML = "";
    inputNamePerfil.innerHTML += `${dateUser.token[0].nameUsrPage}`;

    let userName = document.querySelector(".userNameUser");
    userName.innerHTML = "";
    userName.innerHTML += `${dateUser.token[0].nameUsr}`;
    let userLastName = document.querySelector(".userLastName");
    userLastName.innerHTML = "";
    userLastName.innerHTML += `${dateUser.token[0].lastName}`;

    let emailMain = document.querySelector(".emailMain");
    emailMain.innerHTML = "";
    emailMain.innerHTML += `${dateUser.token[0].emailUsr}`;

    console.log(dateUser.token[0].birthDate);
    let fechaDeNacimiento = new Date(dateUser.token[0].birthDate);
    let hoy = new Date();

    let dateCalculate = parseInt(
      (hoy - fechaDeNacimiento) / (1000 * 60 * 60 * 24 * 365)
    );
    console.log(
      parseInt((hoy - fechaDeNacimiento) / (1000 * 60 * 60 * 24 * 365))
    );

    let setAgeUser = document.querySelector(".dateCalculate");
    setAgeUser.innerHTML = "";
    setAgeUser.innerHTML += `${dateCalculate}`;
  } catch (error) {
    alert("Error haz login otra vez");
    window.location = "./index.html";
  }
};
const updatePerfilUser = async () => {
  let tokens = globalToken;
  let nameUserTecler = document.getElementById("nameUserTecler").value;
  let firstNameTeclers = document.getElementById("firstNameTeclers").value;
  let userTeclerSocial = document.getElementById("userTeclerSocial").value;
  let dateBirthTeclers = document.getElementById("dateBirthTeclers").value;
  let emailRegisterTecler = document.getElementById(
    "emailRegisterTecler"
  ).value;

  let encoded = JSON.parse(atob(tokens.split(".")[1]));
  let previusUser = encoded.data[0][0].emailUsr;
  let dataUpdate = {
    userPrevius: previusUser,
    nameUser: nameUserTecler,
    firstName: firstNameTeclers,
    nameUserPerfil: userTeclerSocial,
    AgeDate: dateBirthTeclers,
    emailUpdate: emailRegisterTecler,
  };
  console.log(dataUpdate);
  let searching = await fetch("http://localhost:3000/usersTeclersUpdate", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokens,
    },
    body: JSON.stringify(dataUpdate),
  });
  location.reload(); //cargar la paginba
};

const updatePerfilUserPro = async () => {
  let tokens = globalToken;
  let perfilUserTecler = document.getElementById("perfilUserTecler").value;
  let LinkedinNameTeclers = document.getElementById("LinkedinNameTeclers").value;
  let userCity = document.getElementById("userCity").value;
  let userLocationCountry = document.getElementById("userLocationCountry").value;
  let certUser = document.getElementById("certUser").value;
  let userLenguajes = document.getElementById("userLenguajes").value;
  let userHobbies = document.getElementById("userHobbies").value;
 

  let encoded = JSON.parse(atob(tokens.split(".")[1]));
  let previusUser = encoded.data[0][0].emailUsr;
  let dataUpdate = {
    profileUser: perfilUserTecler,
    LinkedinTeclers: LinkedinNameTeclers,
    cityLocation: userCity,
    countryUser: userLocationCountry,
     certiFication: certUser,
    lenguajes: userLenguajes,
    hobbies: userHobbies,
    emailPrevious:previusUser
  };
  console.log(dataUpdate);
  let searching = await fetch("http://localhost:3000/createInfoAdditionalPerfil", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokens,
    },
    body: JSON.stringify(dataUpdate),
  });
  location.reload(); //cargar la paginba
};

const getInfoUserPerfil = async() => {
  const HTMLResponse = document.querySelector(".perfilUser");
  const perfilProfessional = document.querySelector(".professionalPerfil");
    let data = {
      email: sendEmail,
    };
    console.log("My email", sendEmail);
    let url = await fetch("http://localhost:3000/viewPerfilUser", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
  const date = await url.json(url);
  console.log(date[0].professionalProfile);
  perfilProfessional.innerHTML = ""
  perfilProfessional.innerHTML +=`${date[0].professionalProfile}`
  let tpl = ``;
  for (let i = 0; i < 1; i++) {
    tpl = `
    <p>Perfil: ${date[i].professionalProfile}</p>
    <p>Pais: ${date[i].country}</p>
    <p>Ciudad: ${date[i].town}</p>
    <p>Linkedin: ${date[i].linkLinkedin}</p>
    <p>Idiomas: ${date[i].languages}</p>
    <p>Idiomas: ${date[i].certifications}</p>
    <p>Idiomas: ${date[i].hobbies}</p>
    `;
    HTMLResponse.innerHTML += `${tpl}`;
  }
  
};
getInfoUserPerfil();
