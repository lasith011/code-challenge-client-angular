import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../services/temperature.service';
import { Temperature } from '../model/temperature';

export interface BeerElement {
  id: number;
  beerType: string;
  minTem: number;
  maxTemp: number;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  TEMP_DATA: BeerElement[] = [
    {id: 0, beerType: '', minTem: 4, maxTemp: 6},
    {id: 1, beerType: 'Pilsner', minTem: 4, maxTemp: 6},
    {id: 2, beerType: 'IPA', minTem: 5, maxTemp: 6},
    {id: 3, beerType: 'Lager', minTem: 4, maxTemp: 7},
    {id: 4, beerType: 'Stout', minTem: 6, maxTemp: 8},
    {id: 5, beerType: 'Wheat beer', minTem: 3, maxTemp: 5},
    {id: 6, beerType: 'Pale Ale', minTem: 4, maxTemp: 6},
  ];

  data: Temperature[] = [];

  constructor(private temperatureService: TemperatureService) {
  }

  ngOnInit(): void {
    this.reLoad();
  }

  reLoad(): void {
    this.temperatureService.findAllTemperatures().subscribe((data) => {
      this.data = data;
    });
  }

  showStatus(min: number, max: number, value: number): string {
    let massage = 'OK';
    if (value < min) {
      massage = 'Too Low';
    } else if (value > max) {
      massage = 'Too High';
    }
    return massage;
  }
}
