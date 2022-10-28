import { openDB } from 'idb';

// Initializeing the database. Code given to us.
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

// Logic to a method that accepts some content and adds it to the database. Got help from instructor Jonathan Bejarano.
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jateDB = await openDB('jate', 1);
    const text = jateDB.transaction('jate', 'readwrite');
    const store = text.objectStore('jate');
    const request = store.put({ id: 1, content: content });
    const result = await request;
    console.log('Added to the database succesful', result);
  } catch {
    console.error('Error with putDb function');
  }
}

// Logic for a method that gets all the content from the database. Got help from instructor Jonathan Bejarano.
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const jateDB = await openDB('jate', 1);
    const text = jateDB.transaction('jate', 'readonly');
    const store = text.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('Request from the database succesful', result);
  } catch {
    console.error('Error with getDb function');
  }
}

initdb();
