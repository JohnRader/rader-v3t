import {
  Firestore, getFirestore, collection, getDocs, query, where, doc, updateDoc, addDoc,
} from 'firebase/firestore';
import type { DocumentReference, DocumentData } from 'firebase/firestore';
import firebaseApp from '@/services/firebase';

// TODO: Move type definitions to separate file
export interface GetDocumentRequest {
  collectionId: string;
  indentiferField: string;
  indentiferValue: any;
}

export interface AddDocumentRequest {
  collectionId: string;
  document: DocumentData;
}

export interface UpdateDocumentFieldRequest {
  documentId: DocumentReference<DocumentData>;
  field: string;
  value: any;
}

const db = getFirestore(firebaseApp);

class FirestoreServiceClass {
  db: Firestore;

  constructor(dbProvider: Firestore) {
    this.db = dbProvider;
  }

  public async getDocumentReference(
    request: GetDocumentRequest
  ): Promise<DocumentReference<DocumentData> | undefined> {
    try {
      const collectionRef = await collection(db, request.collectionId);
      const { docs } = await getDocs(query(collectionRef, where(request.indentiferField, '==', request.indentiferValue)));

      if (docs.length > 0) {
        const docRef = doc(collectionRef, docs[0].id);
        return docRef;
      }

      console.log(`Document reference in ${request.collectionId} not found`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getDocumentData(request: GetDocumentRequest): Promise<DocumentData | undefined> {
    try {
      const collectionRef = await collection(db, request.collectionId);
      const { docs } = await getDocs(query(collectionRef, where(request.indentiferField, '==', request.indentiferValue)));

      if (docs.length > 0) {
        const data: DocumentData = JSON.parse(JSON.stringify(docs[0].data()));
        console.log(`Document ${docs[0].id} found in ${request.collectionId}`);
        return data;
      }
      console.log(`Document data in ${request.collectionId} not found`);
    } catch (error) {
      console.error(error);
    }
  }

  public async updateDocumentField(request: UpdateDocumentFieldRequest): Promise<any> {
    try {
      await updateDoc(request.documentId, request.field, request.value);
      console.log(`Document field ${request.field} updated`);
    } catch (error) {
      console.error(error);
    }
  }

  public async addDocument(request: AddDocumentRequest): Promise<any> {
    try {
      const collectionRef = await collection(db, request.collectionId);
      await addDoc(collectionRef, request.document);
      console.log(`Document added to ${request.collectionId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

const FirestoreService = new FirestoreServiceClass(db);

export default FirestoreService;
