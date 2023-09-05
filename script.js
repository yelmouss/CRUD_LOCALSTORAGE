const Button = document.getElementById("button");
const ClearButton = document.getElementById("clear");
const userListElement = document.getElementById("userList");

// Vérifie s'il y a des utilisateurs dans le stockage local
let users = JSON.parse(localStorage.getItem("users")) || [];

// Affiche les utilisateurs existants sur la page
displayUsers();

Button.onclick = () => {
  const nom = document.getElementById("nom").value;
  const age = document.getElementById("age").value;

  // Crée un nouvel utilisateur
  const user = {
    nom: nom,
    age: age
  };

  // Ajoute le nouvel utilisateur au tableau d'users
  users.push(user);

  // Met à jour le stockage local avec le tableau d'users mis à jour
  localStorage.setItem("users", JSON.stringify(users));

  // Réinitialise les champs de saisie
  document.getElementById("nom").value = "";
  document.getElementById("age").value = "";

  // Réaffiche les users sur la page
  displayUsers();
};

ClearButton.onclick = () => {
  // Supprime tous les users du stockage local
  localStorage.removeItem("users");
  users = [];

  // Réaffiche les users sur la page (la liste sera vide)
  displayUsers();
};

function displayUsers() {
  // Efface la liste existante
  userListElement.innerHTML = "";

  // Parcourt tous les utilisateurs et les ajoute à la liste
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const listItem = document.createElement("li");
    listItem.textContent = `Nom: ${user.nom}, Âge: ${user.age}`;

    // Ajoute un bouton de suppression pour chaque utilisateur
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", function () {
      deleteUser(i);
    });

    listItem.appendChild(deleteButton);
    userListElement.appendChild(listItem);
  }
}

function deleteUser(index) {
  // Supprime l'utilisateur correspondant à l'index donné du tableau d'utilisateurs
  users.splice(index, 1);

  // Met à jour le stockage local avec le tableau d'utilisateurs mis à jour
  localStorage.setItem("users", JSON.stringify(users));

  // Réaffiche les utilisateurs sur la page
  displayUsers();
}