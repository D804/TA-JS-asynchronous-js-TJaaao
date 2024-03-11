1```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise Resolved!");
    }, 1000);
});

myPromise.then(console.log);

```;
2```js
const myRejectedPromise = new Promise((resolve, reject) => {
    reject("Rejected Promise!");
});

myRejectedPromise.catch(console.log);

```;
3```js
const myRejectedPromise = new Promise((resolve, reject) => {
    reject("Rejected Promise!");
});

myRejectedPromise
    .catch(console.log)
    .finally(() => {
        console.log("Promise Settled!");
    });

```;
4```js
A
D
C
B
```;
5```js
function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

wait(2000) // waits for 2000 milliseconds (2 seconds)
    .then(() => {
        console.log("Promise resolved after 2000ms");
    });

```;
6```js
const myPromise = new Promise((resolve, reject) => {
    resolve(21);
});

myPromise
    .then(value => {
        return value + 10;
    })
    .then(value => {
        return value + 100;
    })
    .then(value => {
        if (value > 100) {
            throw new Error("Value is greater than 100");
        }
        return value;
    })
    .catch(error => {
        console.error(error.message);
    });

```;
7```
const myPromise = new Promise((resolve, reject) => {
    resolve(['A']);
});

myPromise
    .then(array => {
        return array.concat('B');
    })
    .then(array => {
        const obj = {};
        array.forEach((element, index) => {
            obj[index] = element;
        });
        return obj;
    })
    .then(value => {
        console.log(value);
    });

```;
8```js
const first = new Promise((resolve, reject) => {
    resolve(1);
});

first
    .then(value => {
        console.log(value); // Logs: 1
        return 2;
    })
    .then(value => {
        console.log(value); // Logs: 2
        return 3;
    })
    .then(value => {
        console.log(value); // Logs: 3
        return 4;
    })
    .then(value => {
        console.log(value); // Logs: 4
    });

```;
9```
const first = new Promise((resolve, reject) => {
    resolve(1);
});

first
    .then(value => {
        console.log(value); // Logs: 1
        return 2;
    })
    .then(value => {
        console.log(value); // Logs: 2
    });

first
    .then(value => {
        console.log(value); // Logs: 1
        return 3;
    })
    .then(value => {
        console.log(value); // Logs: 3
    });

first
    .then(value => {
        console.log(value); // Logs: 1
        return 4;
    })
    .then(value => {
        console.log(value); // Logs: 4
    });

```;
10```
We use single chain of then and in another we use multi use of then. 
```;
11```js
const firstPromise = new Promise((resolve, reject) => {
    resolve('John');
});

firstPromise
    .then(value => {
        console.log(value); // Logs: John
        return new Promise((resolve, reject) => {
            resolve('Arya');
        });
    })
    .then(value => {
        console.log(value); // Logs: Arya
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Bran');
            }, 2000);
        });
    })
    .then(value => {
        console.log(value); // Logs: Bran
    });

```;
