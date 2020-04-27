import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBuilding } from 'src/app/interfaces/app-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private httpClient: HttpClient) { }

  public getBuildings(): Observable<IBuilding[]> {
    return this.httpClient.get<IBuilding[]>('http://localhost:3000/api/buildings');
  }

  public getBuildingByName(name: string): Observable<IBuilding[]> {
    return this.httpClient.get<IBuilding[]>('http://localhost:3000/api/buildings/name/' + name);
  }

}
