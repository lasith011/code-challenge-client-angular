import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableViewComponent} from './table-view.component';
import {TemperatureService} from '../services/temperature.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {Temperature} from '../model/temperature';

describe('TableViewComponent', () => {
  let fixture: ComponentFixture<any>;
  let tableComponent: any;
  let temperatureService: TemperatureService;
  let mockTemperatureService: any;
  let spyTemperatureService: jasmine.Spy;
  let spyComponentLoadData: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableViewComponent],
      providers: [HttpClientModule, TemperatureService],
    }).compileComponents();

    fixture = TestBed.createComponent(TableViewComponent);
    tableComponent = fixture.componentInstance;
    temperatureService = TestBed.inject(TemperatureService);
    mockTemperatureService =
      fixture.debugElement.injector.get(TemperatureService);
    spyComponentLoadData = spyOn(tableComponent, 'reLoad');
    spyTemperatureService = spyOn(
        temperatureService,
        'findAllTemperatures',
    ).and.returnValue(of([new Temperature(1, 1), new Temperature(1, 2)]));
  });

  it('should create', () => {
    expect(tableComponent).toBeTruthy();
  });
  it('should show Beer Temperature table', () => {
    expect(
        fixture.nativeElement.querySelector('#beer-temp-table'),
    ).toBeTruthy();
  });

  describe('#reLoad', () => {
    it('should be defined', () => {
      expect(tableComponent.reLoad).toBeTruthy();
    });
    it('should be called once on component Init', () => {
      tableComponent.ngOnInit();
      expect(spyComponentLoadData).toHaveBeenCalled();
    });
  });

  describe('#showStatus', () => {
    it('should be defined', () => {
      expect(tableComponent.showStatus).toBeTruthy();
    });
    it('should show Too High', () => {
      expect(tableComponent.showStatus(0, 2, 3)).toEqual('Too High');
    });
    it('should show Too Low', () => {
      expect(tableComponent.showStatus(0, 2, -1)).toEqual('Too Low');
    });
    it('should show OK', () => {
      expect(tableComponent.showStatus(0, 2, 1)).toEqual('OK');
    });
  });
});
