// firebaseService.js
import { db } from './firebase'; // Импорт Firestore из файла firebase.js
import { doc, setDoc } from 'firebase/firestore';

// Функция для сохранения данных пользователя
export const saveUserData = async (userData) => {
  const userRef = doc(db, 'users', 'user_id'); // Замените 'user_id' на уникальный идентификатор пользователя
  await setDoc(userRef, userData);
};
