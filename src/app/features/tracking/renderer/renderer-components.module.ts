import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared';
import {
  CellShipmentIdRendererComponent,
  FloatingDropdownModeRendererComponent,
  FloatingFilterStatusRendererComponent,
} from '.';

@NgModule({
  declarations: [
    FloatingFilterStatusRendererComponent,
    FloatingDropdownModeRendererComponent,
    CellShipmentIdRendererComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    AgGridModule.withComponents([
      FloatingFilterStatusRendererComponent,
      FloatingDropdownModeRendererComponent,
      CellShipmentIdRendererComponent,
    ]),
  ],
  exports: [AgGridModule],
})
export class RendererComponentsModuleLocal {}
