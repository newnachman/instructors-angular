import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminGuard } from './guards/admin.guard';
import { InstructorsListComponent } from './instructors-list.component';
import { InstructorDetailComponent } from './instructor-detail.component';
import { InstructorCreateComponent } from './instructor-create.component';
import { InstructorAdminComponent } from './instructor-admin.component';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';


@NgModule({
    declarations: [
        InstructorsListComponent,
        InstructorDetailComponent,
        InstructorCreateComponent,
        InstructorAdminComponent,
        AdminDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'instructors', component: InstructorsListComponent },
            { path: 'create', component: InstructorCreateComponent },
            { path: 'instructor/:id', component: InstructorDetailComponent },
            { 
              path: 'admin', 
              canActivate: [AdminGuard],
              component: InstructorAdminComponent 
            }
          ]),
          FormsModule
    ],
    entryComponents: [AdminDialogComponent]
})
export class InstructorsModule { }