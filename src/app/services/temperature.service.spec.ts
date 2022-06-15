import {TestBed} from '@angular/core/testing';

import {TemperatureService} from './temperature.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TemperatureService', () => {
  let service: TemperatureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TemperatureService],
    });
    service = TestBed.inject(TemperatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#findAllTemperatures', () => {
    it('is defined', () => {
      expect(service.findAllTemperatures).not.toBeUndefined();
    });
    it('should return expected result in json temperature model', () => {
      const mockResponse = [
        {
          id: 1,
          temperature: 5,
        },
      ];
      service.findAllTemperatures().subscribe((result) => {
        expect(result).toBeDefined();
        const temperature = result[0];
        expect(temperature.id).toBeInstanceOf(Number);
        expect(temperature.temperature).toBeInstanceOf(Number);
      });

      const req = httpMock.expectOne(`/api/v1/temperature`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      httpMock.verify();
    });
  });

  describe('#getTempByProductId', () => {
    it('is defined', () => {
      expect(service.findTemperatureById).not.toBeUndefined();
    });
    it('should return expected result for given product id', () => {
      const productId = 1;
      const mockResponse = {
        id: 1,
        temperature: 5,
      };
      service
          .findTemperatureById(productId)
          ?.toPromise()
          .then((temp) => {
            const temperature = temp;
            expect(temperature.id).toEqual(productId);
            expect(temperature.temperature).toBeInstanceOf(Number);
          });

      const req = httpMock.expectOne(`/api/v1/temperature/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      httpMock.verify();
    });
  });
});
