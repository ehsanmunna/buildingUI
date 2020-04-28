import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BuildingService } from '../../shared/services/building.service';
import { IBuilding, IObject, IDataField, IReading } from 'src/app/interfaces/app-interface';
import { DataFieldService } from '../../shared/services/data-field.service';
import { ObjectService } from '../../shared/services/object.service';
import { ReadingService } from '../../shared/services/reading.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
// import Chart from 'chart.js';
import { Chart } from 'angular-highcharts';
import { BaseCompoment } from 'src/app/Class/base-compoment';

@Component({
  selector: 'app-building-chart',
  templateUrl: './building-chart.component.html',
  styleUrls: ['./building-chart.component.sass']
})
export class BuildingChartComponent extends BaseCompoment implements OnInit {
  public searchForms: FormGroup;
  public buildingList: IBuilding[];
  public ObjectList: IObject[];
  public dataFieldList: IDataField[];
  public readingList;
  public chart;
  constructor(
    private formBuilder: FormBuilder,
    private buildingService: BuildingService,
    private dataFieldService: DataFieldService,
    private objectService: ObjectService,
    private readingService: ReadingService,
    private datePipe: DatePipe,
  ) { super(); }

  ngOnInit() {
    this.searchForms = this.formBuilder.group({
      building: [],
      buildingId: [],
      objectId: [],
      object: [],
      dataField: [],
      dataFieldId: [],
      dateRange: []
    });
    this.subs.add(
      this.searchForms.get('building')
        .valueChanges
        .subscribe(res => {
          if (res) {
            this.subs.add(
              this.buildingService.getBuildingByName(res)
                .subscribe((resp: IBuilding[]) => {
                  this.buildingList = resp;
                })
            );
          }
        }),
      this.searchForms.get('object')
        .valueChanges
        .subscribe(res => {
          if (res) {
            this.subs.add(
              this.objectService.getObjectByName(res)
                .subscribe((resp: IBuilding[]) => {
                  this.ObjectList = resp;
                })
            );
          }
        }),
      this.searchForms.get('dataField')
        .valueChanges
        .subscribe(res => {
          if (res) {
            this.subs.add(
              this.dataFieldService.getDataFieldByName(res)
                .subscribe((resp: IBuilding[]) => {
                  this.dataFieldList = resp;
                })
            );
          }
        })
    );
    this.renderChart([]);

  }

  renderChart(cdata: number[]) {
    this.chart = new Chart({
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Unit rate over time'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Unit'
        }
      },
      legend: {
        enabled: false
      },

      series: [{
        type: 'area',
        name: 'Reading',
        data: cdata
      }]
    });
  }

  search() {
    this.isLoading = true;
    const frmValue = this.searchForms.value;
    const srcVal = {
      buildingId: frmValue.buildingId,
      objectId: frmValue.objectId,
      dataFieldId: frmValue.dataFieldId,
      // dateRange: moment( frmValue.dateRange, 'yyyy-MM-dd HH:mm:ss' )
    };
    if (frmValue.dateRange) {
      srcVal['startDate'] = moment(frmValue.dateRange.startDate).format('YYYY-MM-DD HH:mm:ss');
      srcVal['endDate'] = moment(frmValue.dateRange.endDate).format('YYYY-MM-DD HH:mm:ss');
    }

    this.readingService.getRedings(srcVal)
      .subscribe((res: any[]) => {
        this.readingList = res;
        let data = [];
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          data.push([new Date(element.Timestamp).getTime(), element.Value]);
        }
        this.isLoading = false;
        this.renderChart(data);
      }, () => {
        this.isLoading = false;
      });
  }

  displayBuildingFn(item?: IBuilding): string | undefined {
    return item ? item.Name : undefined;
  }

  displayObjectFn(item?: IObject): string | undefined {
    return item ? item.Name : undefined;
  }

  displayDataFieldFn(item?: IDataField): string | undefined {
    return item ? item.Name : undefined;
  }

  setToBuildingId(event: IBuilding) {
    this.searchForms.get('buildingId').patchValue(event.Id);
  }
  setToObjectId(event: IObject) {
    this.searchForms.get('objectId').patchValue(event.Id);
  }
  setToDataFieldId(event: IDataField) {
    this.searchForms.get('dataFieldId').patchValue(event.Id);
  }

}
