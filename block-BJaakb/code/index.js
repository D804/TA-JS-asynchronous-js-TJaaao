function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
    xhr.onload = () =>
      setTimeout(() => resolve(JSON.parse(xhr.response)), 2000);
    xhr.onerror = () => setTimeout(() => reject('Something Went Wrong'));
    xhr.send();
  });
}
let data = fetch('https://api.github.com/users/D804')
  .then((data) => {
    console.log(data.name);
  })
  .catch((error) => alert('Error'));
