import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateRouterLinkPipe } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { TrackingModule } from '..';

import { TrackingComponent } from './tracking.component';

describe('TrackingComponent', () => {
  let component: TrackingComponent;
  let fixture: ComponentFixture<TrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingComponent],
      imports: [
        MockModule(RouterModule),
        MockModule(RouterTestingModule.withRoutes([])),
        MockModule(SharedModule),
        MockModule(TrackingModule),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MockProvider(LocalizeRouterService),
        MockProvider(TranslateService),
        MockProvider(TranslateRouterLinkPipe),
        MockProvider(MatDialogRef),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
