import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BuildingService } from '../../shared/services/building.service';
import { IBuilding, IObject, IDataField, IReading } from 'src/app/interfaces/app-interface';
import { UnsubscribeAdapter } from 'src/app/Class/unsubscribe-adapter';
import { debounceTime } from 'rxjs/operators';
import { DataFieldService } from '../../shared/services/data-field.service';
import { ObjectService } from '../../shared/services/object.service';
import { ReadingService } from '../../shared/services/reading.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-building-chart',
  templateUrl: './building-chart.component.html',
  styleUrls: ['./building-chart.component.sass']
})
export class BuildingChartComponent extends UnsubscribeAdapter implements OnInit {
  public searchForms: FormGroup;
  public buildingList: IBuilding[];
  public ObjectList: IObject[];
  public dataFieldList: IDataField[];
  public readingList;
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
          console.log(res);
          this.subs.add(
            this.buildingService.getBuildingByName(res)
              .subscribe((resp: IBuilding[]) => {
                this.buildingList = resp;
              })
          );
        }),
      this.searchForms.get('object')
        .valueChanges
        .subscribe(res => {
          console.log(res);
          this.subs.add(
            this.objectService.getObjectByName(res)
              .subscribe((resp: IBuilding[]) => {
                this.ObjectList = resp;
              })
          );
        }),
      this.searchForms.get('dataField')
        .valueChanges
        .subscribe(res => {
          console.log(res);
          this.subs.add(
            this.dataFieldService.getDataFieldByName(res)
              .subscribe((resp: IBuilding[]) => {
                this.dataFieldList = resp;
              })
          );
        })
    );
  }

  search() {
    console.log(this.searchForms.value);
    const frmValue = this.searchForms.value;
    const srcVal = {
      buildingId: frmValue.buildingId,
      objectId: frmValue.objectId,
      dataFieldId: frmValue.dataFieldId,
      // dateRange: moment( frmValue.dateRange, 'yyyy-MM-dd HH:mm:ss' )
    };
    if (frmValue.dateRange) {
      srcVal['startDate'] = moment( frmValue.dateRange.startDate ).format('YYYY-MM-DD HH:mm:ss');
      srcVal['endDate'] = moment( frmValue.dateRange.endDate ).format('YYYY-MM-DD HH:mm:ss');
    }

    this.readingService.getRedings(srcVal)
      .subscribe(res => {
        this.readingList = res;
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
