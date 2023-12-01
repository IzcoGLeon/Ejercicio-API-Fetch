/* 1. Función solicitud GET
    2. Condición: Existen elementos en localStorage?
    3.1 Si existen: 
      4.1 Condición: Comparar si ha pasado un minuto desde creación de elemento con tiempo actual
        5.1 Si expiró:
          6.1 Función removeItem (from localStorage)
          7.1 Función solicitud fetch a url
          8.1 Imprimir en DOM
          9.1 Almacenar respuesta (users) del fetch en localStorage
        5.2 No expiró (no ha pasado un minuto aún):
          6.2 Función getItem (desde localStorage)
          7.2 Imprimir en DOM 
    3.2 No existen (no se ha hecho ni fetch, ni hay nada en localStorage)
      4.2 Función solicitud fetch
      5.2 Imprimir en DOM
      6.2 Función almacenar respuesta fetch (users) en localStorage
*/

/*const fetchUsers = url => {

  a.1 Existen elementos en localStorage?
  // If (elementos en local storage) {

    b.1 Si existen elementos en local

        c.1 if (tiempoCreado - tiempoActual > 60000) {
        //Comparar si ha pasado un minuto desde creación

            d.1 Si expiró 
                //removeItem from localStorage
                //fetch 
                //printInDOM
                //setItem localStorage
        //  } d.2  No ha pasado 
              //getItem from lcoal Storage
              //printInDOM

//} b.2 No existen elementos en local 
    // fetch
    // printInDom
    // setItem localStorage

}
*/

const url = "https://reqres.in/api/users?delay=3";

const getUsersFetch = async url => {

  try {
    const response = await fetch(url);
    const info = await response.json();
    const { data: users } = info;
    users.forEach(user => { user.timestamp = new Date().getTime() });
    console.log(users);
    console.log("Se hizo fetch exitosamente")
    sendToLocalStorage(users);
    printOnDOM(users)
    //Aqui va la función para almacenar usuarios en localStorage con fecha y hora
    //Función que mostrará usuarios en DOM
    //
  } catch (error) {
    console.log(error);
  }
}

const printOnDOM = (users) => {
  const cardContainerRef = document.getElementById("cards-container");

  const userCard = users.map((user, index, array) => `
  <div class="card">
    <div class="card-image">
      <img src="${user.avatar}" alt="">
    </div>
    <div class="card-name">${user.first_name} ${user.last_name}</div>
    <div class="card-email">${user.email}</div>
  </div>
  `);

  console.log(userCard);
  console.log('Se ha impreso en DOM');

  cardContainerRef.innerHTML = userCard.join('');

};

const fetchUsers = url => {

  //Se consigue tiempo actual 
  const actualTime = new Date().getTime();
  console.log(actualTime);
  // const entrieLocalStorage = [{
  //   name: "Victor",
  //   apellido: "Quiñones"
  // },
  // {
  //   name: "Saul",
  //   apellido: "Pajaro"
  // }];
  // Si no hay nada, es tipo null, si existen elementos regresa un objeto
  const entrieLocalStorage = JSON.parse(localStorage.getItem('userData'));
  console.log(entrieLocalStorage);
  // entrieLocalStorage.forEach(user => { user.timestamp = new Date().getTime() });
  // console.log(entrieLocalStorage[0].timestamp);
  let hasExpired;

  //Existen elementos en localStorage?
  if (entrieLocalStorage !== null) {
    console.log('Hay elementos en local storage');
    //Comparar si expiró, ha pasado mas de un minuto
    hasExpired = entrieLocalStorage.some((user) => (actualTime - user.timestamp) > 60000);
    if (hasExpired) {
      //removeItem (users)
      localStorage.removeItem('userData');
      console.log('Se ha elimnado de local');
      getUsersFetch(url);
      //fetch 
      //printInDOM 
      //Store in local setItem
      console.log(hasExpired);
      console.log('El usuario ya expiró');
    } else {
      //getIem from local = entrieLocalStorage
      printOnDOM(entrieLocalStorage);
      //printInDOM(entrieLocalStorage)
      console.log(hasExpired);
      console.log('El usuario no ha expirado');
    }

  } else {
    console.log('No existen elementos en localStorage');
    getUsersFetch(url);
  }
}

fetchUsers(url);

/*
  Función removeItem
  Función retrieve from fetch url
  Función printInDOM ---- done 
  Función store setItem localStorage --- done
  Función retrieve getItem localStorage

*/

const sendToLocalStorage = (users) => {
  localStorage.setItem('userData', JSON.stringify(users));
  console.log('Se ha guardado la info en local!');
}
