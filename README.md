# Floxum (WIP)

Floxum is a Socket IO connector for Strapi

![](https://i.imgur.com/8DUiv2R.png)


## Installation


> The installation will also work for the projects which are already using Strapi.


### Step 1

Install the following module inside your React project:

```bash
yarn add @floxum/react
```

### Step 2

Install the following module inside your Strapi application:

```bash
yarn add @floxum/core
```

### Step 3

Create a new file inside your React application to setup Floxum at `src/providers` (or anywhere you'd want) named `floxum.js`, and paste the following code.

```js
import Floxum from '@floxum/react'

const floxum = Floxum('http://localhost:1337')

export default floxum
```

Change the host string to your Strapi host.

### Step 4

Inside your Strapi applicaiton, go to `config/functions/bootstrap.js`, and import Floxum then call it inside the export module with `strapi` parameters:

```js
"use strict";
const folxum = require("@floxum/core");

module.exports = async () => {
  folxum(strapi);
};
```

You're now good to go!


### Step 5

Inside your Rect project (in any component) import Floxum and and test it by calling ping function, like this:

```js
useEffect(() => {
  floxum.ping().then(() => {
    console.log('working')
  })
}, []);
```
