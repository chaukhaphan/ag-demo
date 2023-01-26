/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseAgGridAngularComponent } from './base-ag-grid-angular.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateRouterLinkPipe } from 'src/app/core';
import { SharedModule } from '../../shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';

describe('BaseAgGridAngularComponent', () => {
  let component: BaseAgGridAngularComponent;
  let fixture: ComponentFixture<BaseAgGridAngularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BaseAgGridAngularComponent],
      imports: [
        MockModule(RouterModule),
        MockModule(RouterTestingModule.withRoutes([])),
        MockModule(SharedModule),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MockProvider(LocalizeRouterService),
        MockProvider(TranslateService),
        MockProvider(TranslateRouterLinkPipe),
        MockProvider(MatDialogRef),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAgGridAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
