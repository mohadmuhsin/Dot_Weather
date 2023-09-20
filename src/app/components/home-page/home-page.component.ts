import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Environment } from 'src/app/environments/environment';
import { weatherIcon } from 'src/app/model/weather';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  code: any
  text: string = ''
  api_key: string = ''
 
  img!:string
  wind!: number 
  temp!:number
  location:string=''
  humidity!: number
  invalid!: boolean
  weatherIcon:any[]=weatherIcon
  error!: string;
  
  constructor(
    private http: HttpClient,
    private service: MainServiceService,
    
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

    this.service.getData(this.text)
    //   .pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged()
    // )
      .subscribe({
      next: (res: any) =>
      {
        this.location = res.name
        this.temp = res.main.temp
        this.wind = res.wind.speed
        this.code = res.weather[0].icon
        this.humidity = res.main.humidity

        let items: any = this.weatherIcon.find((items: any) => {
          let findings = items.code.find((code: any) =>{ 
            
            if(code == this.code) return code
          })
          return findings
        })
        this.img=items.img
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
