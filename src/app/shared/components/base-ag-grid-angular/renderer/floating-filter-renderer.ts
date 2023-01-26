import { IFloatingFilterAngularComp } from 'ag-grid-angular';
import { IFloatingFilterParams } from 'ag-grid-community';
import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-filter-component',
  template: `
    <input
      type="text"
      [(ngModel)]="currentValue"
      (input)="onInputBoxChanged($event)" />
    <div class="clear-btn">
      <button
        *ngIf="currentValue"
        mat-icon-button
        mat-raised-button
        mat-button
        class="mat-elevation-z0"
        aria-label="Clear"
        (click)="currentValue = ''; onInputBoxChanged($event)">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;

        .clear-btn {
          position: absolute;
          right: 0;
          height: 45px;
          top: 0;
          display: flex;
          align-items: center;
          button {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            line-height: 24px;
            border-radius: 0;
            background: transparent;
            .mat-icon {
              font-size: 20px;
              color: #545859;
            }
          }
        }

        input[type='text'] {
          height: 24px;
          border: 1px solid #babfc7;
          min-height: 24px;
          border-radius: 3px;
          width: 100%;
          padding-left: 5px;
          padding-right: 24px;
          font-size: 13px;
          &:focus {
            outline: none;
            box-shadow: 0 0 2px 0.1rem rgb(33 150 243 / 40%);
          }
        }
      }
    `,
  ],
})
export class FloatingFilterRendererComponent
  implements IFloatingFilterAngularComp
{
  params: IFloatingFilterParams | any;
  currentValue: any;

  agInit(params: IFloatingFilterParams): void {
    this.params = params;
  }

  onParentModelChanged(parentModel: any) {
    // When the filter is empty we will receive a null value here
    if (!parentModel) {
      this.currentValue = null;
    } else {
      this.currentValue = parentModel.filter;
    }
  }

  onInputBoxChanged(event: any) {
    if (!this.currentValue) {
      // clear the filter
      this.params.parentFilterInstance((instance: any) => {
        instance.onFloatingFilterChanged(null, null);
      });
      return;
    }

    this.params.parentFilterInstance((instance: any) => {
      instance.onFloatingFilterChanged('contains', this.currentValue);
    });
  }
}
