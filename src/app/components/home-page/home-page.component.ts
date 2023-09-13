import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  code: any
  text: string = ''
  api_key: string = ''
  
  wind!: number 
  temp!:number
  location:string=''
  humidity!: number
  invalid!: boolean
  
  // weathers
  sunny:boolean = false
  snow: boolean = false
  haze: boolean = false
  clear: boolean = false
  rainy: boolean = false
  clouds: boolean = false
  drizziling: boolean = false
  error!: string;
  
  constructor(
    private http: HttpClient,
    private service:MainServiceService
  ) {
    this.api_key = Environment.api_key
  }

  ngOnInit(): void {
    this.search()
  
  }

  debouncedSearch = this.debounce(() => {
    this.invalid = false
    this.search();
  }, 1000);

  search() {

    this.service.getData(this.text).subscribe({
      next: (res: any) =>
      {
        this.sunny = false
        this.snow = false
        this.haze = false
        this.clear = false
        this.rainy = false
        this.clouds = false
        this.drizziling = false
        this.location = res.name
        this.temp = res.main.temp
        this.wind = res.wind.speed
        this.code = res.weather[0].icon
        this.humidity = res.main.humidity
    
        if (this.code==="01d" || this.code === "01n") {
           this.clear = true
        } else if (this.code === "02d" || this.code === "02n") {
          this.clouds =true
        }else if (this.code === "03d" || this.code === "03n") {
          this.drizziling =true
        }else if (this.code === "04d" || this.code === "04n") {
          this.drizziling =true
        }else if (this.code === "09d" || this.code === "09n") {
          this.rainy =true
        }else if (this.code === "010d" || this.code === "010n") {
          this.rainy =true
        }else if (this.code === "013d" || this.code === "013n") {
          this.snow =true
        }
      },
      error: (err: any) =>
      {
        if (err.status === 404) {
          this.invalid = true
          this.error  = 'No Matched City Found!!'
        }
      }
    })
  }

  // debounce method
  debounce(func: Function, delay: number) {
    let timeoutId: any;
    return  (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

}
