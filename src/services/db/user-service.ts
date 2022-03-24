import { DocumentReference, DocumentData } from 'firebase/firestore';
import { User, UpdatePreferencesRequest } from '@/models/user-model';
import { updateLocalStoragePreferences } from '@/stores/user-store';
import FirestoreService from './firestore-service';

const getUserReference = async (uid: string): Promise<DocumentReference<DocumentData> | void> => {
  try {
    const userReference = await FirestoreService.getDocumentReference({
      collectionId: 'users',
      indentiferField: 'uid',
      indentiferValue: uid,
    });
    return userReference;
  } catch (error) {
    console.error(error);
  }
}

export const getUserData = async (uid: string): Promise<User | void> => {
  try {
    const user = await FirestoreService.getDocumentData({
      collectionId: 'users',
      indentiferField: 'uid',
      indentiferValue: uid,
    }) as User;
    updateLocalStoragePreferences(user.preferences);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export const addUser = async (user: User): Promise<void> => {
  try {
    const userRecord = await FirestoreService.getDocumentReference({
      collectionId: 'users',
      indentiferField: 'uid',
      indentiferValue: user.uid,
    });

    if (!userRecord) {
      console.log('User not found in db, adding new user...');
      await FirestoreService.addDocument({
        collectionId: 'users',
        document: user,
      });
      console.log('User added to db');
      return;
    }
    console.log('User already found in db');
  } catch (error) {
    console.error(error);
  }
}

export const updateUserPreferences = async (request: UpdatePreferencesRequest) => {
  try {
    const userRef = await getUserReference(request.uid);
    if (userRef) {
      await FirestoreService.updateDocumentField({
        documentId: userRef,
        field: 'preferences',
        value: request.preferences,
      });
      localStorage.setItem('preferences', JSON.stringify(request.preferences));
      console.log('User preferences updated...');
    }
  } catch (error) {
    console.error(error);
  }
}
