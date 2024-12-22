import { openDB } from "idb";

export const openDatabase = async () => {
    const db = await openDB("TaskDB", 2, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (oldVersion < 1) {
          // 初始创建 tasks
          if (!db.objectStoreNames.contains("tasks")) {
            db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
          }
        }
        if (oldVersion < 2) {
          // 添加 subCalendars
          if (!db.objectStoreNames.contains("subCalendars")) {
            db.createObjectStore("subCalendars", { keyPath: "name" });
          }
        }
      },
    });
    return db;
  };  
  
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
  
  export const addToStore = async (storeName, item) => {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const id = await store.add(item); // 返回新增任务的 id
    return id;
  };
  
  export const updateInStore = async (storeName, item) => {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.put(item);
  };
  
  export const deleteFromStore = async (storeName, key) => {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.delete(key);
  };
  