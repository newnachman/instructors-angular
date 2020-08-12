import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InstructorsListComponent } from './instructors-list.component';
import { InstructorDetailComponent } from './instructor-detail.component';


@NgModule({
    declarations: [
        InstructorsListComponent,
        InstructorDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'instructors', component: InstructorsListComponent },
            { path: 'instructor/:id', component: InstructorDetailComponent },
            // { 
            //   path: 'products/:id', 
            //   canActivate: [ProductDetailGuard],
            //   component: ProductDetailComponent 
            // }
          ]),
          FormsModule
    ]
})
export class InstructorsModule { }