# defhacks-2020

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Credentials
You must add 2 credentials (for Firebase and Spoonacular respectively) in `src/creds`.

### Firebase
Add the following code to `src/creds/firebase.js`:
```js
export default {
  firebaseConfig: {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    ...
  }
}
```
including your API key and other information specified by the Firebase console.

### Spoonacular
Add the following code to `src/creds/spoonacular.js`:
```js
export default {
  key: "API_KEY"
}
```
