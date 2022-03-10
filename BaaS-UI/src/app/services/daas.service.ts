import {Injectable} from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import {BuildResponse} from "../baas/build.response.model";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaasService {

  constructor(private firestore: Firestore) {
  }

  public addProject(project: BuildResponse) {
    const projectRef = collection(this.firestore, 'daaSProjects');
    return addDoc(projectRef, project);
  }

  public getProjects(): Observable<BuildResponse[]> {
    const projectsRef = collection(this.firestore, 'daaSProjects');
    return collectionData(projectsRef, {idField: 'id'}) as Observable<BuildResponse[]>;
  }

  public getProjectByID(id: string) {
    const projectRef = doc(this.firestore, `daaSProjects/${id}`);
    return docData(projectRef, {idField: 'id'}) as Observable<BuildResponse>;
  }

  public updateProject(project: BuildResponse) {
    const projectDocRef = doc(this.firestore, `daaSProjects/${project.id}`);
    return setDoc(projectDocRef, project);
  }
}
