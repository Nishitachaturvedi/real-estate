// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

// For modular API:
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
// OR, for compat:
// import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private storage: Storage /* or: private storage: AngularFireStorage */) {}

  uploadImage(file: File, folder: string): Observable<string> {
    const timestamp = Date.now();
    const path = `${folder}/${timestamp}_${file.name}`;
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable<string>(observer => {
      uploadTask.on(
        'state_changed',
        null,
        err => observer.error(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            observer.next(url);
            observer.complete();
          });
        }
      );
    });
  }
}
