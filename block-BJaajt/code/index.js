const headingText = document.querySelector('h3');
const p = document.querySelector('p');
const userImg = document.querySelector('.user');
const followerImage = document.querySelectorAll('.followers-img');
const followingImage = document.querySelectorAll('.following-img');
const input = document.querySelector('input');
function handleChange(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      headingText.innerText = userData.name;
      p.innerText = userData.login;
      userImg.src = userData.avatar_url;
      followerImage.forEach((image) => {
        image.src = userData.followers_url;
      });
      followingImage.forEach((image) => {
        image.src = userData.following_url;
      });
    };
    xhr.send();
  }
}
input.addEventListener('keyup', handleChange);

const image = document.querySelector('img');
const randomImage = document.querySelector('button');
randomImage.addEventListener('click', () => {
  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://api.unsplash.com/photos/random/?client_id=GDHEDzIFTFGP7OnN_KvGBtWNlb8jMecgYRBt94tbkb0'
  );
  xhr.onload = function () {
    let imageData = JSON.parse(xhr.response);
    image.src = imageData.urls.small;
  };
  xhr.send();
});
