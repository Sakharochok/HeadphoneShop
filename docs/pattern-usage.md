# Design Patterns Usage in Headphone Shop

For this project, I implemented 11 different GoF design patterns to make the architecture clean and scalable. Below is a list of the patterns I used, where they are applied, and why I chose them.

### 1. Composite (Structural)
**Where I used it:** `Category` and `HeadphoneProduct` classes.
**Why:** The store catalog is basically a tree. Categories can contain single products, but they can also contain sub-categories. Composite allowed me to treat both products and categories the same way.
**Pros:** Calling `getPrice()` or `displayInfo()` on a main category automatically goes through all the nested items.
**Cons:** The interface is very general, so it's a bit harder to restrict what types of objects can be added to a category.

### 2. Singleton (Creational)
**Where I used it:** `ShoppingCart` class.
**Why:** A user should only have one active shopping cart during their session. It didn't make sense to pass the cart object around everywhere, so Singleton gave me a global point of access.
**Pros:** Guarantees there's only one cart instance across the whole app.
**Cons:** Global state can be annoying when writing unit tests (I had to be careful with Jest so tests wouldn't affect each other).

### 3. Strategy (Behavioral)
**Where I used it:** Catalog sorting (`PriceAscendingStrategy`, `PriceDescendingStrategy`).
**Why:** I wanted to add features like "sort by cheapest" without writing a bunch of `if/else` statements inside the Category class. 
**Pros:** If I want to add a new sorting method later (like "sort by rating"), I just add a new class. It doesn't break existing code.

### 4. Decorator (Structural)
**Where I used it:** `DiscountDecorator` class.
**Why:** Sometimes we have sales (like Black Friday). Instead of creating a new `DiscountedHeadphone` subclass for every product, I can just wrap the existing product object with a decorator to change its price and name dynamically.
**Pros:** Very flexible, we can even stack multiple decorators on one product.

### 5. Observer (Behavioral)
**Where I used it:** Connecting the `ShoppingCart` to the React UI (`ReactCartObserver`).
**Why:** The frontend needs to know exactly when a user adds something to the cart so it can update the total price and item counter in the header.
**Pros:** The core cart logic doesn't know anything about React. It just says "I updated!" and anyone listening can react to it.

### 6. Facade (Structural)
**Where I used it:** `StoreFacade` class.
**Why:** The `index.ts` (or `App.tsx`) file was getting messy trying to talk to the catalog, the cart, and the sorting strategies all at once. The Facade hides this complexity and gives the UI simple methods like `store.addToCart()`.
**Pros:** Makes the client code much cleaner and easier to read.

### 7. Adapter (Structural)
**Where I used it:** `JsonFileAdapter` class.
**Why:** I needed to save orders to a database, but right now I only have a local `.json` file. The adapter maps my code's save/load requests to Node's file system methods.
**Pros:** If I switch to a real database like PostgreSQL later, I just write a new adapter. The rest of the app won't even notice.

### 8. Builder (Creational)
**Where I used it:** `OrderBuilder` class.
**Why:** Creating a final order object requires a lot of steps (setting the customer name, phone, delivery address, and pulling items from the cart). Passing all of this into one huge constructor would be terrible.
**Pros:** I can construct the order step-by-step in a very readable way.

### 9. State (Behavioral)
**Where I used it:** Order statuses (`NewState`, `PaidState`, `ShippedState`).
**Why:** An order goes through a lifecycle. I needed to prevent bugs like shipping an order that hasn't been paid for yet.
**Pros:** Got rid of giant `switch` statements for checking order status. Each state handles its own rules.

### 10. Command (Behavioral)
**Where I used it:** `AddToCartCommand` class.
**Why:** I wanted to encapsulate the "add to cart" action as an object. This is super useful because it allowed me to easily add an `undo()` method to remove the item if the user changes their mind.
**Pros:** Makes actions reversible and easy to log.

### 11. Iterator (Behavioral)
**Where I used it:** `CatalogIterator` class.
**Why:** To have a standard way to loop through the products in the catalog without exposing how the array is actually stored inside the class.
**Pros:** Provides a uniform interface for traversing the collection.