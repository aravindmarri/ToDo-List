import {Injectable, NgModule} from '@angular/core';
import {BrowserModule, HammerModule,  HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TodoEntryComponent} from './todo-list/todo-entry.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {AddtaskComponent} from './todo-list/addtask/addtask.component';
import {EllipsisModule} from 'ngx-ellipsis';
import {MatRippleModule} from '@angular/material/core';
import { ConformClearComponent } from './todo-list/conform-clear/conform-clear.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig  {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { enable: true }
  } as any;
}

@NgModule({
  declarations: [
    AppComponent,
    TodoEntryComponent,
    AddtaskComponent,
    ConformClearComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HammerModule,
    EllipsisModule,
    MatRippleModule
  ],
  providers: [AngularFireModule, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent],
  entryComponents: [AddtaskComponent]
})
export class AppModule {
}
