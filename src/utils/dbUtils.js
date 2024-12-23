import { openDB } from "idb";

// Opens the IndexedDB database and sets up object stores
export const openDatabase = async () => {
  const db = await openDB("TaskDB", 2, {
    upgrade(db, oldVersion) {
      // Create the "tasks" store during the initial setup
      if (oldVersion < 1) {
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
        }
      }
      // Add the "subCalendars" store in version 2
      if (oldVersion < 2) {
        if (!db.objectStoreNames.contains("subCalendars")) {
          db.createObjectStore("subCalendars", { keyPath: "name" });
        }
      }
    },
  });
  return db;
};

// Retrieves all items from a specified object store
export const getAllFromStore = async (storeName) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const items = [];
  let cursor = await store.openCursor();
  while (cursor) {
    items.push(cursor.value);
    cursor = await cursor.continue();
  }
  return items;
};

// Adds a new item to a specified object store
export const addToStore = async (storeName, item) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  const id = await store.add(item); // Returns the generated ID of the new item
  return id;
};

// Updates an existing item in a specified object store
export const updateInStore = async (storeName, item) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.put(item);
};

// Deletes an item from a specified object store by key
export const deleteFromStore = async (storeName, key) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(key);
};
