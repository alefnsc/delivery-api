
Version: 1.0
Date: August 20, 2023

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
3. [Installation](#3-installation)
4. [Usage](#4-usage)
5. [Business Rules](#5-business-rules)
6. [Methods](#6-methods)
7. [Libraries Used](#7-libraries-used)
8. [License](#8-license)
9. [Contact](#9-contact)

---

## 1. Introduction

Welcome to the documentation for the Delivery API project. This project aims to provide a RESTful API for managing delivery orders. It involves manipulating JSON files containing orders, generating logs, and enforcing business rules to ensure smooth order processing.

## 2. Project Overview

The Delivery API project focuses on providing a user-friendly and efficient way to manage delivery orders. It employs various libraries and tools to achieve this goal.

## 3. Installation

To install and set up the project locally, follow these steps:

1. Clone the project repository from GitHub:

```bash
git clone https://github.com/alefnsc/delivery-api.git
```
2. Navigate to the project directory:

```bash
cd delivery-api
```

3. Install project dependencies using npm:

```bash
npm install
```

## 4. Usage
After installation, you can start the server by running:

```bash
npm start
```

This will start the Express server and make the API available at http://localhost:3000.

Additionally, you can access the Swagger UI documentation at http://localhost:3000/doc to explore and test the API endpoints interactively.

## 5. Business Rules
The Delivery API enforces the following business rules:

- An order must have a unique ID.
- Orders must have valid and complete information.

## 6. Methods
The project contains methods for managing orders. Here is an overview of the methods:

- **getOrders():** Retrieves all orders from the JSON file.
- **getOrder(id):** Retrieves an order by its unique ID.
- **createOrder(order):** Creates a new order.
- **updateOrder(id, order):** Updates an existing order by its ID.
- **deleteOrder(id):** Deletes an order by its ID.
- **updateStatus(order):** update an entire order.
- **getMostWanted():** retrieve the most wanted products.
- **getProductTotalValue(product):** retrieve the total value of all orders containing a product.
- **getCustomerTotalValue(customer):** retrieve the total value of all orders for a specific customer.

## 7. Libraries Used

The Delivery API project utilizes the following libraries:

- **@hapi/joi:** A validation library for validating request data.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **express:** A fast and minimal web framework for Node.js.
- **joi:** A powerful schema description language and data validator for JavaScript.
- **logger:** Custom logging utility for generating logs.
- **node:** The runtime environment for executing JavaScript code.
- **nodemon:** A development tool that automatically restarts the server on code changes.
- **swagger-ui-express:** Middleware for serving Swagger UI documentation.
- **winston:** A versatile logging library for Node.js.

## 8. License
The Delivery API project was created with learning purposes about the construction of an api using node, express and other libraries, feel free to clone and to know its capabilities

## 9. Contact
**Maintainer:** Alexandre Fonseca
**Email:** alexandrefonsecach@gmail.com
