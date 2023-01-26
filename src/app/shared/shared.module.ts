import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import {
  FloatingFilterDateRangePickerRendererComponent,
  LoadingOverlayRendererComponent,
  FloatingFilterRendererComponent,
} from './components/base-ag-grid-angular/renderer';

@NgModule({
  declarations: [
    LoadingOverlayRendererComponent,
    FloatingFilterDateRangePickerRendererComponent,
    FloatingFilterRendererComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxTippyModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
