import { HomeComponent } from './features/home/home.component';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { MockModule, MockProvider } from 'ng-mocks';
import { AppComponent } from './app.component';
import { TranslateRouterLinkPipe } from './core';
import { SharedModule } from './shared';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(RouterModule),
        MockModule(
          RouterTestingModule.withRoutes([
            { path: '', component: HomeComponent },
            { path: 'simple', component: HomeComponent },
          ])
        ),
        MockModule(SharedModule),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MockProvider(LocalizeRouterService),
        MockProvider(TranslateService),
        MockProvider(TranslateRouterLinkPipe),
      ],
      declarations: [AppComponent],
    }).compileComponents();
    //https://medium.com/practical-angular-karma-testing/testing-angular-router-events-in-practice-ef1ac517b3ea
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TTInteractive'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.title).toEqual('TTInteractive');
  });

  it(`should have called subscribeRouter from constructor`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    fixture.detectChanges();
    let spySubscribeRouter = spyOn(app, 'subscribeRouter').and.returnValue();
    app.subscribeRouter();
    fixture.detectChanges();

    expect(spySubscribeRouter).toHaveBeenCalled();
  });
});
