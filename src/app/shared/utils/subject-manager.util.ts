import { Subject } from "rxjs";

export class SubjectManager {
  private $subject = new Subject<boolean>();

  getSubject() {
    return this.$subject.asObservable();
  }

  setSubject(value: boolean) {
    this.$subject.next(value)
  }
}