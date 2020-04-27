import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IObject } from 'src/app/interfaces/app-interface';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private httpClient: HttpClient) { }
  public getObjects(): Observable<IObject[]> {
    return this.httpClient.get<IObject[]>('http://localhost:3000/api/object');
  }

  public getObjectByName(name: string): Observable<IObject[]> {
    return this.httpClient.get<IObject[]>('http://localhost:3000/api/object/name/' + name);
  }
}
