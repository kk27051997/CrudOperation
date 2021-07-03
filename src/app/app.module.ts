import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { FormsModule } from '@angular/forms';
import { EditFormComponent } from './edit-form/edit-form.component';
import { TableDataComponent } from './TableComponent/table-data/table-data.component';

@NgModule({
  declarations: [
    AppComponent,
    UserinfoComponent,
    EditFormComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
