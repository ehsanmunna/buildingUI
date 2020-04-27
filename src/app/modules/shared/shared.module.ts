import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BuildingService } from './services/building.service';
import { HttpClientModule } from '@angular/common/http';
import { DataFieldService } from './services/data-field.service';
import { ObjectService } from './services/object.service';
import { MatDatepickerModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    BuildingService,
    DataFieldService,
    ObjectService,
    MatDatepickerModule,
    DatePipe
  ]
})
export class SharedModule { }
