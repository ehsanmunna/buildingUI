import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReadingSearch, IReading } from 'src/app/interfaces/app-interface';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  constructor(private httpClient: HttpClient) { }

  public getRedings(params) {
    return this.httpClient.get('http://localhost:3000/api/reading', {params: params} );
  }

}
