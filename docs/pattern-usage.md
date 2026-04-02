# Design Patterns Usage in Headphone Shop

For this project, I implemented 11 different GoF design patterns to make the architecture clean and scalable. Below is a list of the patterns I used, where they are applied, and why I chose them.

### 1. Composite (Structural)
**File:** [`src/core/patterns/structural/CategoryComposite.ts`](../src/core/patterns/structural/CategoryComposite.ts)

**Why:** The store catalog is basically a tree. Categories can contain single products, but they can also contain sub-categories. Composite allowed me to treat both products and categories the same way.
**Pros:** Calling `getPrice()` or `displayInfo()` on a main category automatically goes through all the nested items.
**Cons:** The interface is very general, so it's a bit harder to restrict what types of objects can be added to a category.

### 2. Singleton (Creational)
**File:** [`src/core/patterns/creational/ShoppingCartSingleton.ts`](../src/core/patterns/creational/ShoppingCartSingleton.ts)

**Why:** A user should only have one active shopping cart during their session. It didn't make sense to pass the cart object around everywhere, so Singleton gave me a global point of access.
**Pros:** Guarantees there's only one cart instance across the whole app.
**Cons:** Global state can be annoying when writing unit tests.

### 3. Strategy (Behavioral)
**File:** [`src/core/patterns/behavioral/SortStrategy.ts`](../src/core/patterns/behavioral/SortStrategy.ts)

**Why:** I wanted to add features like "sort by cheapest" without writing a bunch of `if/else` statements inside the Category class. 
**Pros:** If I want to add a new sorting method later, I just add a new class. It doesn't break existing code.

### 4. Decorator (Structural)
**File:** [`src/core/patterns/structural/ProductDecorator.ts`](../src/core/patterns/structural/ProductDecorator.ts)

**Why:** Sometimes we have sales (like Black Friday). Instead of creating a new `DiscountedHeadphone` subclass for every product, I can just wrap the existing product object with a decorator to change its price dynamically.
**Pros:** Very flexible, we can even stack multiple decorators on one product.

### 5. Observer (Behavioral)
**File:** [`src/core/patterns/behavioral/Observer.ts`](../src/core/patterns/behavioral/Observer.ts)

**Why:** The frontend needs to know exactly when a user adds something to the cart so it can update the total price and item counter in the header.
**Pros:** The core cart logic doesn't know anything about React. It just says "I updated!" and anyone listening can react to it.

### 6. Facade (Structural)
**File:** [`src/core/patterns/structural/StoreFacade.ts`](../src/core/patterns/structural/StoreFacade.ts)

**Why:** The UI was getting messy trying to talk to the catalog, the cart, and the sorting strategies all at once. The Facade hides this complexity.
**Pros:** Makes the client code much cleaner and easier to read.

### 7. Adapter (Structural)
**File:** [`src/core/patterns/structural/StorageAdapter.ts`](../src/core/patterns/structural/StorageAdapter.ts)

**Why:** I needed to save orders to a database, but right now I only have a local `.json` file. The adapter maps my code's save/load requests to Node's file system methods.
**Pros:** If I switch to a real database like PostgreSQL later, I just write a new adapter.

### 8. Builder (Creational)
**File:** [`src/core/patterns/creational/OrderBuilder.ts`](../src/core/patterns/creational/OrderBuilder.ts)

**Why:** Creating a final order object requires a lot of steps (setting the customer name, phone, delivery address, and pulling items from the cart).
**Pros:** I can construct the order step-by-step in a very readable way.

### 9. State (Behavioral)
**File:** [`src/core/patterns/behavioral/OrderState.ts`](../src/core/patterns/behavioral/OrderState.ts)

**Why:** An order goes through a lifecycle. I needed to prevent bugs like shipping an order that hasn't been paid for yet.
**Pros:** Got rid of giant `switch` statements for checking order status.

### 10. Command (Behavioral)
**File:** [`src/core/patterns/behavioral/Command.ts`](../src/core/patterns/behavioral/Command.ts)

**Why:** I wanted to encapsulate the "add to cart" action as an object. This allowed me to easily add an `undo()` method.
**Pros:** Makes actions reversible and easy to log.

### 11. Iterator (Behavioral)
**File:** [`src/core/patterns/behavioral/Iterator.ts`](../src/core/patterns/behavioral/Iterator.ts)

**Why:** To have a standard way to loop through the products in the catalog without exposing how the array is actually stored inside the class.
**Pros:** Provides a uniform interface for traversing the collection.