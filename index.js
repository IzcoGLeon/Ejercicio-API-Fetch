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

  } catch (error) {
    console.log(error);
  }
}

const printOnDOM = (users) => {
  const cardContainerRef = document.getElementById("cards-container");

  const userCard = users.map(user => `
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

const loadUsers = url => {

  //Se consigue tiempo actual 
  const actualTime = new Date().getTime();
  console.log(actualTime);
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
      console.log('El usuario ya expiró');
    } else {
      printOnDOM(entrieLocalStorage);
      console.log('El usuario no ha expirado');
    }

  } else {
    console.log('No existen elementos en localStorage');
    getUsersFetch(url);
  }
}

loadUsers(url);

const sendToLocalStorage = (users) => {
  localStorage.setItem('userData', JSON.stringify(users));
  console.log('Se ha guardado la info en local!');
}

const spinnerWrapperEl = document.querySelector('.spinner-wrapper');

window.addEventListener('load', () => {
  setTimeout(() => {
    spinnerWrapperEl.style.opacity = 0;
    spinnerWrapperEl.style.display = 'none';
  }, 1000);

});
