import { weatherDatas } from 'src/app/models/interfaces/weather';
import { WeatherService } from '../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl:'./weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject <void> = new Subject();//pratica comum ultilizar o dolar($) identificar que e um obsevable
  initialCityName = 'São Paulo';
  weatherDatas!: weatherDatas ;
  searchIcon = faMagnifyingGlass;

  constructor (private WeatherService: WeatherService)  {}


  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
      this.WeatherService.getWeatherDates(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=> {
          response && (this.weatherDatas = response);
          console.log(this.weatherDatas);

        },
        error: (error: any) => console.log(error),
      });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    console.log ('chamou a função')
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
