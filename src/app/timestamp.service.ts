// timestamp.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TimestampObject } from './dto/timestamp';
import { RawObject } from './dto/raw';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {
  constructor(private http: HttpClient) {}

  getRaw(): Observable<RawObject> {
    return interval(500).pipe(
      switchMap(() => this.http.get<RawObject>('http://192.168.31.13/api/v1/temp/raw'))
    );
  }

  getTimestamp(): Observable<TimestampObject> {
    return this.http.get<TimestampObject>('http://192.168.31.13/api/v1/timestamp');
  }
}