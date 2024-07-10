import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddFeedbackComponent} from "./add-feedback/add-feedback.component";

export const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:'feedback',
    component:AddFeedbackComponent
  }
];
