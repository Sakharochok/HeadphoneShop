# Headphone Store

Headphone Store is a modern e-commerce application developed with TypeScript and React. The project demonstrates the use of object-oriented programming principles, design patterns, modular architecture, graphical user interface development, and parallel programming techniques.

The application simulates a real online store where users can browse products, search and sort catalog items, manage a shopping cart, create orders, and interact with a responsive user interface. In addition to the standard store functionality, the project contains a customer simulation subsystem capable of sequential and parallel execution with configurable worker count and real-time analytics.

---

# Main Features

## Product Catalog

The application contains a structured product catalog with support for:

* product browsing;
* product details view;
* dynamic product sorting;
* category navigation;
* search functionality.

## Shopping Cart System

The shopping cart subsystem allows users to:

* add products to cart;
* remove products;
* undo actions;
* track cart state in real time;
* calculate total order price automatically.

## Favorites System

Users can save products into a favorites list for quick access and later review.

## Order Processing

The checkout subsystem validates customer information and simulates the order lifecycle, including:

* order creation;
* payment confirmation;
* shipping process.

## Customer Simulation Subsystem

The project includes a separate simulation module designed to imitate customer activity inside the store.

The simulation supports:

* sequential execution;
* parallel execution;
* configurable number of workers;
* runtime performance comparison;
* analytics generation.

Simulated customers perform actions such as:

* browsing products;
* adding products to carts;
* generating orders.

---

# Simulation Analytics

During execution, the simulation subsystem calculates:

* total number of orders;
* total revenue;
* most popular product;
* average cart value;
* execution time.

The analytics results are displayed directly in the graphical interface.

---

# Design Patterns

The project uses several object-oriented design patterns.

## Facade

`StoreFacade` provides a simplified interface for interacting with store subsystems.

## Decorator

`DiscountDecorator` dynamically extends product functionality by applying discounts.

## Observer

The cart subsystem updates the interface using the observer pattern.

## Command

`AddToCartCommand` encapsulates cart operations and supports undo functionality.

## Builder

`OrderBuilder` creates complex order objects step by step.

## Strategy

Different sorting algorithms are implemented through interchangeable sorting strategies.

---

# Technologies

* TypeScript
* React
* Vite
* Node.js
* Jest

---

# Project Structure

```bash
src/
│
├── core/
│   ├── cart/
│   ├── catalog/
│   ├── facade/
│   ├── orders/
│   ├── simulation/
│   └── analytics/
│
├── tests/
├── App.tsx
├── main.tsx
└── index.ts
```

---

# Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

# Running Tests

```bash
npm test
```

---

# Testing

The project includes unit tests for:

* simulation subsystem;
* analytics calculations;
* cart functionality;
* sorting strategies;
* decorators and builders.

Both valid and invalid scenarios are covered.

---

# Parallel and Sequential Comparison

The project contains both sequential and parallel implementations of the customer simulation subsystem.

The comparison demonstrates:

* execution time difference;
* scalability;
* worker-based load distribution;
* performance improvements during parallel execution.


