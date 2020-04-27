import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataField } from 'src/app/interfaces/app-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataFieldService {

  constructor(private httpClient: HttpClient) { }
  public getDataFields(): Observable<IDataField[]> {
    return this.httpClient.get<IDataField[]>('http://localhost:3000/api/datafield');
  }

  public getDataFieldByName(name: string): Observable<IDataField[]> {
    return this.httpClient.get<IDataField[]>('http://localhost:3000/api/datafield/name/' + name);
  }
}
