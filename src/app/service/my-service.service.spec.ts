import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MyServiceService } from './my-service.service';
import { GitHubResponse } from './models';

describe('MyServiceService', () => {
  let service: MyServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyServiceService]
    });

    service = TestBed.inject(MyServiceService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getRemoteData', (done) => {

    service.getRemoteData('Test').subscribe((res: GitHubResponse[]) => {
      expect(res.length).not.toEqual(0);
      expect(res[0].name).toEqual('Test');
      done();
    });

    const req = httpMock.expectOne('https://api.github.com/users/Test/repos');
    expect(req.request.method).toBe('GET');
    req.flush([{ name: 'Test' } as GitHubResponse]);
  });

});
