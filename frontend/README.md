# Cart UI

## Application

This app provides the basic code structure for implementing Frontend business logic.
It has been set up using Create React App, and it includes TypeScript, React, Redux, Redux saga, and Jest.

### Base Requirement

This application contains a single page with the dummy Counter feature which serves as an example.
You need to replace this page with the list of products that comes from the backend.
Each product can be added to the cart.
Please note that the user can add multiple items of 1 product to the cart (for example, 2x Bread).
There should be a button on the page which should open a modal with the list of cart items.
There are no strict design requirements, so you can come up with your own design :)

### Secondary Feature (Optional)

Create a 2nd page with a form that will allow the user to create products (there is already a backend endpoint for this).
Please consider using form libraries when implementing the form (for example, Formik or React Final Form).
Please add the validation to the form (you can come up with your own validation rules).
The form should also support loading state as well as handle possible errors (for example, if the product with such name already exists).
Please also add a navigation bar at the top of the page allowing the user to switch between these pages.

## Notes To Developer

Please use the existing approach and structure you find present in this application.

Please ensure tests are present and working for all features.


## Using this app - Quick Start

Get started developing...

```shell
# install deps
yarn

# run in development mode
yarn start

# run tests
yarn test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
yarn
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
yarn start
```


#### Run in *production* mode:

Compiles the application and starts it in production mode.

```shell
yarn build
serve -s build
```

## Test It

Run the Jest unit tests

```shell
yarn test
```
