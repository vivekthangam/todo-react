// src/lib/dbWrapperInitialization.js
import IndexedDBWrapper from './IndexedDBWrapper';

const dbName = 'exampleDB';
const dbVersion = 1;
const storeName = 'exampleStore';

const dbWrapper = new IndexedDBWrapper(dbName, dbVersion, storeName);
dbWrapper.openDatabase().then((message) => {
  console.log(message);
}).catch((error) => {
  console.error(error);
});

export { dbWrapper };
