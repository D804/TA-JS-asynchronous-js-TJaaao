1;
function createPromiseWithRandomValue(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomValue = Math.random();
      resolve(randomValue);
    }, delay);
  });
}

const promises = [
  createPromiseWithRandomValue(1000),
  createPromiseWithRandomValue(2000),
  createPromiseWithRandomValue(3000),
  createPromiseWithRandomValue(4000),
];

Promise.all(promises)
  .then((values) => {
    values.forEach((value, index) => {
      console.log(`Promise ${index + 1} resolved with value:`, value);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

2;
const usernames = ['user1', 'user2', 'user3', 'user4', 'user5']; // Replace with actual GitHub usernames

function getUserFollowers(username) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((userData) => {
        resolve({ username: username, followers: userData.followers });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const promises = usernames.map((username) => getUserFollowers(username));

Promise.all(promises)
  .then((userData) => {
    userData.forEach((user) => {
      console.log(`User: ${user.username}, Followers: ${user.followers}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const urls = ['https://random.dog/woof.json', 'https://aws.random.cat/meow'];

function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const promises = urls.map((url) => fetchData(url));

Promise.race(promises)
  .then((fastestData) => {
    console.log('Data from the resolved promise:', fastestData);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```
4
```;
const urls = ['https://random.dog/woof.json', 'https://aws.random.cat/meow'];

function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const promises = urls.map((url) => fetchData(url));

Promise.race(promises)
  .then((fastestData) => {
    console.log('Data from the resolved promise:', fastestData);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

// Using Promise.allSettled to log the value of each promise
Promise.allSettled([one, two, three]).then((results) => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise ${index + 1} resolved with value:`, result.value);
    } else if (result.status === 'rejected') {
      console.log(
        `Promise ${index + 1} rejected with reason:`,
        result.reason.message
      );
    }
  });
});

// Using Promise.all to handle promises one, two, and three
Promise.all([one, two, three])
  .then((values) => {
    console.log('All promises resolved with values:', values);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

['Arya', 'Sam', { name: 'John' }];
