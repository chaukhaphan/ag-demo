import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { IDateAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IDateParams } from 'ag-grid-community';
import * as $ from 'jquery';
// we'll be using the globally provided flatpickr for our example

@Component({
  selector: 'app-custom-date-range-picker',
  template: `
    <div
      #flatpickrEl
      class="ag-input-wrapper custom-date-filter"
      role="presentation">
      <mat-form-field appearance="outline" style="font-size: 3px;">
        <input
          matInput
          placeholder="{{
            translateService.instant(
              'SHARED.BASED-AG-GRID-ANGULAR.DATE-RANGE-PICKER-PLACEHOLDER'
            )
          }}"
          type="text"
          id="shipmentDate"
          #eInput
          data-input
          style="width: 100%;height: 24px;" />
        <span class="material-symbols-outlined">calendar_month</span>
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      :host::ng-deep {
        border: 1px solid white;
        border-radius: 4px;
        width: 100%;
      }
      ::ng-deep {
        .custom-date-filter {
          .material-symbols-outlined {
            position: absolute;
            right: 0px;
            color: white;
            cursor: pointer;
            font-size: 21px;
          }
          .mat-input-element,
          .mat-input-element::placeholder {
            color: white !important ;
            padding-left: 3px;
          }
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

        .custom-date-filter:after {
          position: absolute;
          display: block;
          font-weight: 400;
          font-family: 'Font Awesome 5 Free';
          right: 5px;
          pointer-events: none;
          color: rgba(0, 0, 0, 0.54);
        }
      }
    `,
  ],
})
export class FloatingFilterDateRangePickerRendererComponent
  implements IDateAngularComp, AfterViewInit, OnDestroy
{
  @ViewChild('flatpickrEl', { read: ElementRef }) flatpickrEl!: ElementRef;
  @ViewChild('eInput', { read: ElementRef }) eInput!: ElementRef;
  private date!: Date;
  private params!: any;
  private picker: any;
  translateServiceSub?: Subscription;

  constructor(public translateService: TranslateService) {
    this.translateServiceSub = this.translateService.onLangChange.subscribe(
      (lang: any) => {
        this.picker = this.componentParent.initializePicker(
          this.flatpickrEl.nativeElement,
          this.onDateChanged,
          this
        );
      }
    );
  }

  agInit(params: IDateParams | ICellRendererParams): void {
    this.params = params;
  }

  ngAfterViewInit(): void {
    this.picker = this.componentParent.initializePicker(
      this.flatpickrEl.nativeElement,
      this.onDateChanged,
      this
    );
  }

  onDateChanged(selectedDates: any) {
    let isCustomRange =
      $(
        '.flatpickr-calendar.arrowTop.arrowLeft .nav-item.d-grid:has(button.active)'
      ).index() == 5;

    if (
      selectedDates.length == 0 ||
      selectedDates.length == 2 ||
      !isCustomRange
    ) {
      this.date = selectedDates[0] || null;
      this.componentParent.setTimeRangeFilter(
        selectedDates,
        this.params?.filterName
      );
    }
  }

  get componentParent() {
    return this.params.context.componentParent;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date || null;
    this.picker.setDate(date);
  }

  setInputPlaceholder(placeholder: string): void {
    this.eInput.nativeElement.setAttribute('placeholder', placeholder);
  }

  setInputAriaLabel(label: string): void {
    this.eInput.nativeElement.setAttribute('aria-label', label);
  }

  ngOnDestroy(): void {
    this.translateServiceSub?.unsubscribe();
  }
}
