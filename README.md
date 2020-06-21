# Saucer
### Tanay Biradar, Riley Kong, Siddharth Nath, Ritvik Pandey
### Def Hacks 2020

---
Every year, "roughly 1.3 billion tons of food, worth nearly $1 trillion, spoils or is thrown away" [(Wernick, PRI)](https://www.pri.org/stories/2020-05-28/food-waste-increases-during-pandemic-compounding-existing-problem). At the same time, "11.1 percent (14.3 million) households experience food shortages at some time during a year" [(USDA)](https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/key-statistics-graphics.aspx).

By eliminating food waste, we can provide food to people who need it the most and simultaneously help the environment in the process by conserving natural resources.

Saucer is a solution to food waste by recommending users suitable recipes based on the items they already have. 

To start, input ingredients you have in the kitchen and their expiry dates. With this information, Saucer intelligently recommends recipes that use those ingredients. You can also use the voice recognition feature to conveniently add an ingredient. 

All of this is wrapped up in a user-friendly website which incorporates Material design and is streamlined to bring a clear recipe.

## Live Demo
Click [here](https://defhacks-2020.web.app/) to preview the app.

## Development
```bash
$ yarn install  # installs dependencies
$ yarn serve    # compiles/hot-reloads for development
$ yarn build    # compiles/minifies for production
$ yarn lint     # lints/fixes files
```

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
Add the following code to `src/creds/spoonacular.js`, along with your API key:
```js
export default {
  key: "API_KEY"
}
```
