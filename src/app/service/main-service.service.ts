import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  api_key:string =''
  constructor(
    private http: HttpClient,
  ) { 
this.api_key = Environment.api_key
  }

  getData(text: string ) {
    console.log(text,"caaa");
    let texts = text
    if (texts == '') {
      texts='malappuram'
    }
   return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${texts}&units=Metric&appid=${this.api_key}`) 
  }

}
