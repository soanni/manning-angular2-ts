import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TemperaturePipe } from './temperature-pipe';


@Component({
    selector: 'app',
    pipes: [ TemperaturePipe ],
    template: `<input type="text" value="0"
                placeholder="Enter temperature" [(ngModel)]="temp">
                <button (click)="toggleFormat()">Toggle Format</button>
                <br>In {{targetFormat}} this temperature is {{temp | temperature: format | number:'1.1-2'}}`
})
class AppComponent{
    temp: number;
    toCelcius: boolean=true;
    targetFormat: string='Celcius';
    format: string='FtoC';

    toggleFormat(){
        this.toCelcius = !this.toCelcius;
        this.format = this.toCelcius ? 'FtoC' : 'CtoF';
        this.targetFormat = this.toCelcius ? 'Celcius' : 'Fahrenheit';
    }
}

@NgModule({
    imports: [ BrowserModule, FormsModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);
