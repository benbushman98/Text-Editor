import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const textDB = await openDB('jate', 1);
    const text = textDB.transaction('jate', 'readwrite');
    const store = text.objectStore('jate');
    const request = store.put({ id: 1, content: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  } catch {
    console.error('putDb not implemented');
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const textDB = await openDB('jate', 1);
    const text = textDB.transaction('jate', 'readonly');
    const store = text.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
  } catch {
    console.error('getDb not implemented');
  }
}

initdb();
