import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { AgFloatingFilterComponent } from 'ag-grid-angular';

// This component is used only in BaseAgGridAngularComponent
// If it is used in different component, please review componentParent
@Component({
  selector: 'app-floating-dropdown-renderer',
  template: `
    <form [formGroup]="form">
      <mat-form-field
        *ngIf="!params?.isMultiSelect"
        appearance="outline"
        class="floating-dropdown-renderer"
        style="font-size: 8px;">
        <mat-select
          disableOptionCentering
          [value]="currentValue"
          (selectionChange)="onChange($event)">
          <mat-option
            class="floating-dropdown-renderer__option"
            *ngFor="let c of options"
            [value]="c?.value">
            {{ c?.des }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
      :host::ng-deep {
        border: 1px solid white;
        border-radius: 4px;
        .mat-select .mat-select-value-text span,
        .mat-select .mat-select-value-text div {
          color: white;
        }
      }
      ::ng-deep {
        .max-width-ngSelect.ng-select.ng-select-opened
          > .ng-select-container
          .ng-arrow {
          border-color: transparent transparent white !important;
        }
        .ng-dropdown-panel.ng-select-bottom.max-width-ngSelect {
          width: max-content !important;
        }
        .floating-dropdown-renderer.multi-select {
          .mat-form-field-infix {
            padding: 0;
            border-top: 0;
          }
        }
        .floating-dropdown-renderer {
          .mat-form-field-wrapper {
            padding: 0;
            .mat-form-field-outline,
            .mat-select-placeholder,
            .mat-select-arrow,
            .mat-select-value-text {
              color: white !important ;
            }
            .mat-select-placeholder,
            .mat-select-value-text {
              font-size: 13px;
            }
          }
        }
        .floating-dropdown-renderer.mat-focused {
        }
        .floating-dropdown-renderer__option {
          .mat-option-text {
            font-size: 13px;
          }
        }
      }
    `,
  ],
})
export class FloatingDropdownModeRendererComponent
  implements AgFloatingFilterComponent
{
  form = new FormGroup({
    select: new FormControl(),
  });
  params: any;
  currentValue: any;
  style: any;

  currentOptions: any[] = [];
  selectedValue: any[] = [];

  getItem(item: any) {
    return item;
  }

  agInit(params: any): void {
    this.params = params;
  }

  compareOption = (item: any, selected: any) => {
    if (item.label && selected.label) {
      return item.label === selected.label;
    }
    return false;
  };

  get componentParent() {
    return this.params?.context?.componentParent;
  }

  getOptionLabel(value: string) {
    return this.options.filter((item: any) => item?.value === value)[0]?.label;
  }

  get options() {
    return this.componentParent?.gridData?.optionalParams.modes;
  }

  onParentModelChanged(parentModel: any) {
    // When the filter is empty we will receive a null value here
    if (!parentModel) {
      this.currentValue = null;
    } else {
      this.currentValue = parentModel.filter;
    }
  }

  onChange(event?: any) {
    if (this.params?.isMultiSelect) {
      this.params?.onWarehouseSelectChange(event);
    } else {
      this.currentValue = event.value;
      if (!!!this.currentValue) {
        // Remove the filter
        this.params?.parentFilterInstance((instance: any) => {
          instance.onFloatingFilterChanged(null, null);
        });
        return;
      }
      this.params?.parentFilterInstance((instance: any) => {
        instance.onFloatingFilterChanged('equals', this.currentValue);
      });
    }
  }
}
