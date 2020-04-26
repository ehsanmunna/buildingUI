import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingChartComponent } from './building-chart/building-chart.component';


const routes: Routes = [
    {path: 'chart', component: BuildingChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule { }
