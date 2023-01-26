import { shipmentData } from './data';
import { BaseAgGridAngularComponent } from './../../shared/components/base-ag-grid-angular/base-ag-grid-angular.component';
import { Subscription } from 'rxjs';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as dayjs from 'dayjs';
import { ColDef } from 'ag-grid-enterprise';
import {
  CellShipmentIdRendererComponent,
  FloatingDropdownModeRendererComponent,
  FloatingFilterStatusRendererComponent,
} from './renderer';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, OnDestroy {
  statuses: any[] = [];
  datePipe = new DatePipe('en');
  gridData: {
    columnDefs: ColDef[];
    columnDefsMobile: ColDef[];
    rowData: any;
    rowDoubleClickHandler: any;
    optionalParams?: any;
  } = {
    rowData: [],
    columnDefs: [
      {
        field: 'shipmentDate',
        filter: 'agDateColumnFilter',
        valueGetter: (params: any) => {
          return params && params?.data?.shipmentDate
            ? dayjs(params?.data?.shipmentDate)
                .locale('en')
                .format('MM/DD/YYYY')
            : '';
        },
        valueFormatter: (params: any) => {
          return params && (params?.data?.shipmentDate || params?.value)
            ? this.datePipe.transform(
                params?.data?.shipmentDate || params?.value,
                'MMM dd, YYYY'
              ) || ''
            : '';
        },
        enableRowGroup: true,
      },
      {
        field: 'firstOrigin',
        valueGetter: (param: any) => {
          return param.data?.firstOrigin.replace(/<br\/>/g, ' ');
        },
        enableRowGroup: true,
      },
      {
        field: 'webUnitCode',
        width: 80,
        floatingFilterComponent: FloatingDropdownModeRendererComponent,
        cellRenderer: (params: any) => {
          const webUnitIconClass = this.getWebUnitIconClass(
            params.data?.webUnitCode || params?.value
          );
          return `<img  style='height:35px' src='${webUnitIconClass}'></img>`;
        },
        valueFormatter: (params: any) => {
          return params && (params.data?.webUnitCode || params?.value);
        },
        enableRowGroup: true,
      },
      {
        field: 'shipmentStatusName',
        floatingFilterComponent: FloatingFilterStatusRendererComponent,
        valueGetter: (params: any) => {
          if (!params || !params?.data) return '';
          if (params && params?.data['shipmentStatusName'] == '') {
            return 'N/A';
          }
          return params?.data['shipmentStatusName'];
        },
        enableRowGroup: true,
      },
    ],
    columnDefsMobile: [],
    rowDoubleClickHandler: (params: any) => {
      return;
    },
    optionalParams: {},
  };
  @ViewChild(BaseAgGridAngularComponent)
  baseAgGridAngularComponent: BaseAgGridAngularComponent | undefined;

  constructor() {}

  ngOnInit(): void {
    this.getShipments();
  }

  getDistinctObjectByKey(
    inputArray: any,
    filterKey1: string,
    filterKey2?: string
  ) {
    let uniqueRows = inputArray.reduce((res: any, obj: any) => {
      let isFound = res.some((o: any) => {
        let isFound = o[filterKey1] === obj[filterKey1];
        if (filterKey2 && isFound) {
          isFound = o[filterKey2] === obj[filterKey2];
        }
        return isFound;
      });
      if (!isFound) {
        res.push(obj);
      }
      return res;
    }, []);
    let uniqueObject: any[] = [
      {
        value: '',
        label: 'All',
        unit: 'ALL-UNITS',
        des: 'All',
      },
    ];
    uniqueRows.forEach((e: any) => {
      uniqueObject.push({
        value: e[filterKey1] || 'N/A',
        label: e[filterKey1] || 'N/A',
        unit: filterKey2 ? e[filterKey2] : '',
        des: e['webUnitName'],
      });
    });
    return uniqueObject;
  }

  getShipments() {
    // Add summary columns
    this.gridData.rowData = shipmentData;
    // Set flag to add webunit column
    this.gridData.optionalParams.modes = this.getDistinctObjectByKey(
      this.gridData.rowData,
      'webUnitCode'
    );
    // Set flag to add shipment status column
    this.gridData.optionalParams.statuses = this.getDistinctObjectByKey(
      this.gridData.rowData,
      'shipmentStatusName',
      'webUnitCode'
    ); // Let it know we finished loading data
    this.gridData.optionalParams.tabletMaxNumOfColumn = 7;
  }

  getWebUnitIconClass(webUnitCode: string) {
    let relativePath = '../../../assets/images/tracking/grid/';

    if (webUnitCode == 'OR' || webUnitCode == 'US' || webUnitCode == 'MX')
      return relativePath + 'truck-sm-2.png';
    else if (webUnitCode == 'IM') return relativePath + 'train-intermodal.png';
    else if (webUnitCode == 'AOO') return relativePath + 'boat-3.png';
    else if (webUnitCode == 'AOA') return relativePath + 'plane-sm-2.png';
    else if (webUnitCode == 'AG') return relativePath + 'boxes-sm-2.png';
    else if (webUnitCode == 'BT') return relativePath + 'bulk-2.png';
    else if (webUnitCode == 'PD') return relativePath + 'produce-2.png';
    else if (webUnitCode == 'EX') return relativePath + 'truck-expedited-2.png';
    else return '';
  }

  ngOnDestroy(): void {}
}
