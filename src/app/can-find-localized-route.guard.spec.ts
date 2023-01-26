import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateRouterLinkPipe } from './core';

describe('CanFindLocalizedRouteGuard', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(RouterModule)],
      providers: [
        MockProvider(LocalizeRouterService),
        MockProvider(TranslateService),
        MockProvider(TranslateRouterLinkPipe),
      ],
    }).compileComponents();
  }));
});
