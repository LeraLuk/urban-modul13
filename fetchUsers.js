const url_users = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  return fetch(url_users)
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        console.log(user.name);
      });
      return users;
    })
    .catch((error) => console.error("Error fetching users:", error));
}
fetchUsers();
