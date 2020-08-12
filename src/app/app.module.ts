import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { InstructorsModule } from './instructors/instructors.module';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  declarations: [ 
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    InstructorsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
