const createUser = async () => {
  let itemName = document.getElementById("nameUserTecler").value;
  let itemLastName = document.getElementById("firstNameTeclers").value;
  let nameUsr = document.getElementById("form3Example1q").value;
  let itemEmail = document.getElementById("emailRegisterTecler").value;
  let dateBirth = document.getElementById("dateBirthTeclers").value;
  let itemPassword = document.getElementById("inputPasswordRegister").value;
  const listFormValidation=[ itemName,itemLastName,nameUsr,itemEmail,dateBirth,itemPassword];

  for (let index = 0; index < 6; index++) {
    if(listFormValidation[index] == undefined ||listFormValidation[index] ==""   ){
      alert("Debes de llenar todos los campos")
      return false;
    }
  }
  let dataUpdate = {
    name: itemName,
    lastName: itemLastName,
    nameUsr: nameUsr,
    emailUsr: itemEmail,
    birthDate: dateBirth,
    passwordUser: itemPassword,
  };
  return sendDataUser(dataUpdate);
}

const sendDataUser = async (dataUpdate) => {
  console.log(dataUpdate);
  let searching = await fetch("http://localhost:3000/createUserTeclers", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate),
  }).then((response) => {
    console.log("validacion");
    if (!response.ok) {
      alert("Hubo un error no se encuentra el id");
    }
  });
};
