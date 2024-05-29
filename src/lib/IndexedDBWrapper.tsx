// src/lib/IndexedDBWrapper.js
class IndexedDBWrapper {
  constructor(dbName, version, storeName) {
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName;
    this.db = null; // Initialize db as null
  }

  

  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version,{       storage: 'persistent'     });

      request.onerror = (event) => {
        reject("Error opening database");
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve("Database opened successfully");
      };

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          this.db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async closeDatabase() {
    this.db.close();
    console.log("Database closed");
  }

  async getData(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(key);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject("Error getting data");
      };
    });
  }
  async getAllData()   {
  return new Promise((resolve, reject) => {
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
  async putData(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.put(data);

      request.onsuccess = (event) => {
        resolve("Data added or updated successfully");
      };

      request.onerror = (event) => {
        reject("Error adding or updating data");
      };
    });
  }

  async deleteData(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(key);

      request.onsuccess = (event) => {
        resolve("Data deleted successfully");
      };

      request.onerror = (event) => {
        reject("Error deleting data");
      };
    });
  }
}

export default IndexedDBWrapper;




