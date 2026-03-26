# Project Architecture

For this lab, I decided to split the project into three main layers: Core (Business Logic), UI (React), and Data. I wanted to make sure the frontend doesn't mix with the core logic. Because of this separation, I was able to test the app in the terminal first, and then plug in the React UI later without rewriting the headphone logic.

### 1. Core Layer (`src/core`)
This is where all the actual work happens. It doesn't know anything about HTML, React, or databases. 
- **Models:** Contains the basic `ICatalogComponent` interface and the concrete `HeadphoneProduct` class.
- **Patterns:** I grouped the 11 GoF patterns into `creational`, `structural`, and `behavioral` folders so it's easy to navigate. 
The most important part here is the `StoreFacade`. It acts as the single entry point for the application. If the UI wants to get the catalog or add an item to the cart, it asks the Facade.

### 2. UI Layer (`src/App.tsx` & `main.tsx`)
I used React with Vite for the frontend. The UI is kept as simple as possible - it just displays what the Facade gives it.
To keep the shopping cart updated in real-time, the React component implements my custom `IObserver` interface. When a user clicks "Add to cart", the command goes to the Facade, the Cart updates its state, and sends a notification back to React to trigger a re-render.

### 3. Data Layer (`src/data` & Adapter)
Right now, the app saves completed orders into a local `database.json` file. The `JsonFileAdapter` handles all the file system operations. The core application just calls `save(order)` and doesn't care how or where the data gets saved.

### Directory Structure
Here is how I organized the project folders:

```text
/src
  /core
    /models       (Product classes and basic interfaces)
    /patterns     (The 11 GoF patterns sorted by category)
  /data           (database.json file)
  App.tsx         (Main React UI component)
  main.tsx        (Vite application entry point)
/tests            (Jest unit tests for Singleton and Composite)
/docs             (Markdown documentation for the lab)