import {Injectable} from '@angular/core';
import {SubjectManager} from '../utils/subject-manager.util';

@Injectable({
  providedIn: 'root',
})
export class DialogServices {
  dialogSubject$ = new SubjectManager();
}
