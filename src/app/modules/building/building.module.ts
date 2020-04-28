import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingChartComponent } from './building-chart/building-chart.component';
import { BuildingRoutingModule } from './building-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule
  , MatFormFieldModule
  , MatRadioModule
  , MatButtonModule
  , MatIconModule
  , MatCardModule
  , MatTableModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';

const materialModules = [
  MatButtonModule,
  MatRadioModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    BuildingChartComponent
  ],
  imports: [
    BuildingRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules,
    FlexLayoutModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
    ChartModule
  ]
  , exports: [
    materialModules
  ]
})
export class BuildingModule { }
