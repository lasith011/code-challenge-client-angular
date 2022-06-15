import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Temperature} from '../model/temperature';

@Injectable()
export class TemperatureService {
  constructor(private http: HttpClient) {}

  findTemperatureById(temperatureId: number): Observable<Temperature> {
    return this.http.get<Temperature>(`/api/v1/temperature/${temperatureId}`);
  }

  findAllTemperatures(): Observable<Temperature[]> {
    return this.http.get<Array<Temperature>>('/api/v1/temperature');
  }
}
