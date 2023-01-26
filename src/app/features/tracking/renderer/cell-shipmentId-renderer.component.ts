import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-document-button',
  template: `
    <div class="app-document-button">
      <div class="shipment-id">
        <button
          mat-button
          style="background-color: transparent;"
          type="button"
          attr.arial-label="Shipment ID {{ params?.data?.shipmentId }}"
          (click)="onIdClick($event)">
          {{ params?.data?.shipmentId || params?.value }}
        </button>
      </div>
      <div *ngIf="showIcon">
        <!-- 0-ttsls, 1-prolan, 2-cargowise -->
        <button
          style="background-color: transparent;"
          class="shipment-id-button"
          *ngIf="params?.data?.shipmentSource !== 1"
          mat-button
          type="button"
          (click)="onDocumentClick($event)">
          <span class="material-symbols-outlined"> description </span>
        </button>
        <button
          style="background-color: transparent;"
          class="shipment-id-button"
          mat-button
          type="button"
          (click)="onContactUsClick($event)">
          <span class="material-symbols-outlined"> contact_phone </span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../../../../styles/_variables.scss';
      ::ng-deep {
        .app-document-button {
          display: flex;
          margin-top: -3px;
          button,
          button .mat-button-wrapper:hover,
          .material-symbols-outlined:hover {
            background-color: transparent;
          }
          .shipment-id {
            /* display: flex;
            align-items: center; */
            width: 100%;
            display: block;
            text-align: start;
            button {
              padding: 0;
              text-align: start;
            }
          }
          .shipment-id-button {
            height: 30px;
            line-height: 30px;
            margin: 1px;
            padding: 0;
            width: 30px;
            min-width: 30px;
            right: 0;
            top: calc(50% - 17px);
            .material-symbols-outlined {
              color: $text-color-dark;
              font-weight: 300;
            }
          }

          .select-button {
            height: 30px;
            line-height: 30px;
            margin: 1px;
            padding: 0;
            width: 30px;
            min-width: 30px;
            right: 0;
            top: calc(50% - 17px);
          }
        }
      }
    `,
  ],
})
export class CellShipmentIdRendererComponent
  implements ICellRendererAngularComp
{
  params: any;
  showIcon = true;

  agInit(params: any): void {
    this.params = params;

    if (!params?.data && params?.node?.field != 'shipmentId') {
      this.showIcon = false;
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onIdClick($event: any) {
    $event.stopPropagation();
    if (this.params.onIdClick instanceof Function) {
      this.params.onIdClick(this.params.node.data);
    }
  }

  onDocumentClick($event: any) {
    $event.stopPropagation();
    if (this.params.onDocumentClick instanceof Function) {
      this.params.onDocumentClick(this.params.node.data);
    }
  }

  onContactUsClick($event: any) {
    $event.stopPropagation();
    if (this.params.onContactUsClick instanceof Function) {
      this.params.onContactUsClick(this.params.node.data);
    }
  }
}
