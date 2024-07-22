import {Component, inject, OnDestroy} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {FirestoreService} from "../services/firestore.service";
import {NavigateService} from "../services/navigate.service";
@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './add-feedback.component.html',
  styleUrl: './add-feedback.component.scss'
})
export class AddFeedbackComponent implements OnDestroy{
  feedbackForm: FormGroup;
  private fireStoreService = inject(FirestoreService)
  private navigateService = inject(NavigateService)
  constructor() {
    this.feedbackForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      status: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }
ngOnDestroy() {
    this.feedbackForm.reset()
}

  onSubmit() {
    if (this.feedbackForm.valid) {
      let addedValues = {
          ...this.feedbackForm.getRawValue(),
        upvotes: 0,
        upvoted:false
      }
      this.fireStoreService.addProductRequest(addedValues).then((_) => {
          this.onNavigateHome()
      })
    }
  }
  onNavigateHome() {
    this.navigateService.navigateTo('')
  }

}
