import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyComponent } from './family/family.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  {
    path: '/dashboard',
    redirectTo: '/dashboard/family',
    pathMatch: 'full'
  },
 
  {
    path: 'family',
    component: FamilyComponent
  },
  
];

@NgModule({
  declarations: [
    FamilyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
