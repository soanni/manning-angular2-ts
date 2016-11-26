import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TemperaturePipe } from './temperature-pipe';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

@Component({
	selector: 'app',
	//pipes: [ TemperaturePipe ],
	template: `
		<h2>Observable weather</h2>
		<input type="text" placeholder="Enter city" [formControl]="searchInput">
		<div *ngIf="cityIsFound">
			<h3>Temperature: {{temperature | temperature: format | number:'1.1-2' }}</h3>
			<h3>Humidity: {{humidity}}%</h3>
		</div>
		<!--<h3>{{temperature | temperature: format | number:'1.1-2' }}</h3>-->
	`
})
class AppComponent{
	private baseWeatherUrl: string = 'http://api.openweathermap.org/data/2.5/find?q=';
	private urlSuffix: string = '&units=imperial&appid=ca3f6d6ca3973a518834983d0b318f73';
	format: string = 'FtoC';
	searchInput: FormControl = new FormControl('');

	cityIsFound: boolean = false;
	temperature: number;
	humidity: number;

	constructor(private http:Http){
		this.searchInput.valueChanges
			.debounceTime(200)
			.switchMap(city => this.getWeather(city))
			.subscribe(
				res => {
					//this.temperature = res.cod;
					if(res['cod'] === '404') return;
					if(!res.list[0].main){
						//this.temperature = 'City is not found';
						return;
					}else{
						//this.temperature = `Current temperature is ${(res.list[0].main.temp}F, ` +
						//`humidity: ${res.list[0].main.humidity}%`;
						this.cityIsFound = true;
						this.temperature = res.list[0].main.temp;
						this.humidity = res.list[0].main.humidity;
					}
				},
				err => console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url),
				() => console.log(`Weather is retrieved`)
			)
	}

	getWeather(city: string): Observable<Array<string>> {
		return this.http.get(this.baseWeatherUrl + city + this.urlSuffix)
			.map(res => {
				console.log(res);
				return res.json()
			});
	}
}

@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule, HttpModule ],
    declarations: [ AppComponent, TemperaturePipe ],
    bootstrap: [ AppComponent ]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);