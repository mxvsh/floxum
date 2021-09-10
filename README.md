
# Floxum (WIP)

Floxum is a Socket IO connector for Strapi


![Artboard](https://user-images.githubusercontent.com/31907722/132536324-df8029d9-8f10-4041-a779-fedb872283a6.png)



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

# Functions

Here are the functions available in Floxum API

## ping
This will test the connection with the Strapi server. Returns a Promise.

## register

This function is used to register a user.
**Example**:
```js
floxum.register({ username: 'xxxxx', email: 'xxxxx', password: '****'})
	.then(data => {
		// data: jwt and others values
	})
	.catch(err => {
		// err: Strapi error
	})
```

## login

This function is used to login a user.
**Example**:
```js
floxum.login({ identifier: 'xxxxx', password: '****'})
	.then(data => {
		// data: jwt and others values
	})
	.catch(err => {
		// err: Strapi error
	})
```

## authenticate

This function can be used to get the currently logged in user's data, using token from `localStorage`
**Example**:
```js
floxum.authenticate()
	.then(data => {
		// data: user data and others values
	})
	.catch(err => {
		// err: Strapi error
	})
```
## services

This function can be used to execute services for any API registered on Strapi. The following example will create a new entry in "todo" collection.
You can also execute, `find`, `update` or `delete` services.
**Example**:
```js
floxum.services('todo', 'create', { todo: 'Grab coffee' })
	.then(data => {
		// data: response from the Strapi
	})
	.catch(err => {
		// err: Strapi error
	})
```
