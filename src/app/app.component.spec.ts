import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { GitHubResponse } from './service/models';
import { MyServiceService } from './service/my-service.service';

//#region Mock
const mockGitHubRepoArray: GitHubResponse[] = [
  { id: 1, name: 'repo1' },
  { id: 2, name: 'repo2' }
] as GitHubResponse[];

const mockService = {
  http: jest.fn(),
  getRemoteData: (name: string) => of(mockGitHubRepoArray),
};
//#endregion

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        {
          provide: MyServiceService,
          useValue: mockService
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular Jest App'`, () => {
    expect(component.title).toEqual('Angular Jest App');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Angular Jest App app is running!');
  });

  it('should test search Repos method', () => {
    component.username = 'Test1';
    component.searchRepos();
    expect(component.repoNames[0]).toEqual('repo1');
  });

});
