import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-building-chart',
  templateUrl: './building-chart.component.html',
  styleUrls: ['./building-chart.component.sass']
})
export class BuildingChartComponent implements OnInit {
  searchForms: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForms = this.formBuilder.group({
      buildingId: [],
      objectId: [],
      dataFieldId: [],
      dateRange: []
    });
  }

}
