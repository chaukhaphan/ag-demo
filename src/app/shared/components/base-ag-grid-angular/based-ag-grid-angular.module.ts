import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAgGridAngularComponent } from './base-ag-grid-angular.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [CommonModule, AgGridModule.withComponents([]), MatCheckboxModule],
  declarations: [BaseAgGridAngularComponent],
  exports: [BaseAgGridAngularComponent],
})
export class BasedAgGridAngularModule {}
