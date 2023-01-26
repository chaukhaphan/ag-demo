import { DatePipe } from '@angular/common';
import { DateRangeFilterParams } from './date-range-filter';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-enterprise';
import * as dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import { AG_GRID_LOCALE_EN } from './locale.en';

import {
  FloatingFilterDateRangePickerRendererComponent,
  LoadingOverlayRendererComponent,
  FloatingFilterRendererComponent,
} from './renderer';
declare let myFlatpickrPlugins: any;

@Component({
  selector: 'app-base-ag-grid-angular',
  templateUrl: './base-ag-grid-angular.component.html',
  styleUrls: ['./base-ag-grid-angular.component.scss'],
})
export class BaseAgGridAngularComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() gridData: {
    columnDefs: ColDef[];
    rowData: any[];
  } = {
    columnDefs: [],
    rowData: [],
  };

  // Because of this value, we cannot declare date filter in col
  selectedDateRangeFilterParams: any = {};

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  public autoGroupColumnDef: ColDef = {
    // supplies filter values to the column filters based on the colId
    filterValueGetter: (params: any) => {
      let colId = params.column.getColId();
      let colIdArray = colId.split('-');
      let field = colIdArray[colIdArray?.length - 1];
      return params.data ? params.data[field] : '';
    },
  };

  gridOptions: GridOptions = {
    animateRows: true,
    suppressContextMenu: true,
    alwaysMultiSort: true,
    suppressDragLeaveHidesColumns: true,
    suppressMenuHide: true,

    defaultColDef: {
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
      menuTabs: ['generalMenuTab', 'filterMenuTab'],
      floatingFilterComponent: FloatingFilterRendererComponent,
      floatingFilterComponentParams: { suppressFilterButton: true },
    },
    autoGroupColumnDef: {
      minWidth: 100,
    },
    groupDisplayType: 'multipleColumns',
    getRowClass: (params: any) => {
      if (
        (params && params?.data?.dropCount > 1) ||
        params?.data?.pickCount > 1
      ) {
        return 'multiple-pickup-dropdown';
      }
      return '';
    },
    loadingOverlayComponent: LoadingOverlayRendererComponent,
    rowHeight: 40,

    statusBar: {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    },
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',

    onGridReady: (params: any) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    onRowDataChanged: () => {
      this.gridApi?.sizeColumnsToFit();
    },
    onSortChanged: (params: any) => {
      let shippingPointsColumnState = JSON.stringify(
        this.gridColumnApi?.getColumnState()
      );
      this.gridColumnApi
        ?.getColumnState()
        .forEach((col: any, index: number) => {
          // We like to add class to header(first and second row) when we are sorting
          if (col.colId) {
            let sortElement = document.querySelectorAll(
              '[col-id=' + col.colId + ']'
            )[0];
            let floatingFilterElement = document.querySelectorAll(
              ".ag-floating-filter[aria-colindex='" + (index + 1) + "']"
            )[0];
            sortElement?.classList.remove('sort__desc');
            sortElement?.classList.remove('sort__asc');
            floatingFilterElement?.classList.remove('sort__desc');
            floatingFilterElement?.classList.remove('sort__asc');
            if (col.sort) {
              sortElement?.classList.add('sort__' + col.sort);
              floatingFilterElement?.classList.add('sort__' + col.sort);
            }
          }
        });
    },
    onColumnRowGroupChanged: (params: any) => {
      this.gridColumnApi?.getColumnState().forEach((element: any) => {
        if (element?.colId?.indexOf('ag-Grid-AutoColumn') > -1) {
          let colIdDuplicated = element?.colId.replace(
            'ag-Grid-AutoColumn-',
            ''
          );
          this.gridColumnApi?.setColumnVisible(colIdDuplicated, false);
        }
      });
    },

    onModelUpdated: (params: any) => {
      if (this.gridApi && this.gridApi.getModel().getRowCount() == 0) {
        this.gridApi.showNoRowsOverlay();
      }
      if (this.gridApi && this.gridApi.getModel().getRowCount() > 0) {
        this.gridApi.hideOverlay();
      }
    },
    onFilterChanged: (params: any) => {
      let filteModel = (params.api as GridApi).getFilterModel();
      this.selectedShipmentMode = '';
      if (filteModel.hasOwnProperty('webUnitCode')) {
        this.selectedShipmentMode = filteModel['webUnitCode'].filter;
      }
      if (this.prevSelectedShipmentMode != this.selectedShipmentMode) {
        if (filteModel.hasOwnProperty('shipmentStatusName')) {
          delete filteModel.shipmentStatusName;
          this.gridApi.setFilterModel(filteModel);
        }
        this.prevSelectedShipmentMode = this.selectedShipmentMode;
      }
    },
    localeText: AG_GRID_LOCALE_EN,
  };

  selectedShipmentMode = '';
  prevSelectedShipmentMode = '';

  context: any;

  constructor() {
    this.context = {
      componentParent: this,
    };
  }

  ngOnInit(): void {
    // For grid which has shipment date or delivery date, we render custom floating cmp
    if (this.gridData?.columnDefs && this.gridData?.columnDefs?.length > 0) {
      this.setDateRangeFilter();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.gridApi) {
      if (this.gridData.rowData) {
        // For grid which has shipment date or delivery date, we render custom floating cmp
        if (
          this.gridData?.columnDefs &&
          this.gridData?.columnDefs?.length > 0
        ) {
          this.setDateRangeFilter();
        }
      }
    }
    this.gridApi?.sizeColumnsToFit();
  }

  datePipe = new DatePipe('en');

  setDateRangeFilter() {
    this.gridData.columnDefs.forEach((colDef: ColDef) => {
      if (colDef.filter == 'agDateColumnFilter') {
        colDef.filterParams = new DateRangeFilterParams(
          this.selectedDateRangeFilterParams,
          colDef.field
        ).filterParams;
        colDef.floatingFilterComponentParams = { filterName: colDef.field };
        colDef.floatingFilterComponent =
          FloatingFilterDateRangePickerRendererComponent;
      }
    });
  }

  initializePicker(element: any, onDateChanged: any, currentComponent: any) {
    let picker: any;
    let labelJson = {
      TXT_CLEAR: 'Clear Filter',
      TXT_TODAY: 'Today',
      TXT_YESTERDAY: 'Yesterday',
      TXT_LAST7: 'Last 7 Days',
      TXT_LAST30: 'Last 30 Days',
      TXT_LAST_MONTH: 'Last Month',
      TXT_THIS_MONTH: 'This Month',
      TXT_CUSTOM_RANGE: 'Custom Range',
    };

    let ranges: any = {};
    // Clear
    ranges[labelJson['TXT_CLEAR']] = [];
    //   Today
    ranges[labelJson['TXT_TODAY']] = [dayjs().toDate(), dayjs().toDate()];
    // Yesterday
    ranges[labelJson['TXT_YESTERDAY']] = [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1)),
    ];
    // Last 7 days
    ranges[labelJson['TXT_LAST7']] = [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(),
    ];
    //   'Last 30 Days'
    ranges[labelJson['TXT_LAST30']] = [
      dayjs().subtract(29, 'days').toDate(),
      new Date(),
    ];
    //   'This Month'
    ranges[labelJson['TXT_THIS_MONTH']] = [
      dayjs().startOf('month').toDate(),
      dayjs().endOf('month').toDate(),
    ];
    //   'Last Month'
    ranges[labelJson['TXT_LAST_MONTH']] = [
      dayjs().subtract(1, 'month').startOf('month').toDate(),
      dayjs().subtract(1, 'month').endOf('month').toDate(),
    ];

    let config: any = {
      onChange: onDateChanged.bind(currentComponent),
      wrap: true,
      mode: 'range',
      altFormat: 'F j, Y',
      dateFormat: 'M d, Y',
      showMonths: 2,
      plugins: myFlatpickrPlugins,
      locale: 'en',
      rangesOnly: true, // only show the ranges menu unless the custom range button is selected
      rangesAllowCustom: true, // adds a Custom Range button to show the calendar
      rangesCustomLabel: 'Custom Range', // customize the label for the custom range button
    };
    config.ranges = ranges;

    picker = flatpickr(element, config);
    picker.calendarContainer.classList.add('ag-custom-component-popup');
    return picker;
  }

  setTimeRangeFilter(range: any, filterInstanceName: any) {
    let instance = this.gridApi.getFilterInstance(filterInstanceName);
    let dateFromInput =
      range.length == 0 ? '' : dayjs(range[0]).format('YYYY-MM-DD');
    let datetOInput =
      range.length == 0 ? '' : dayjs(range[1]).format('YYYY-MM-DD');
    this.selectedDateRangeFilterParams[filterInstanceName] = range;
    instance?.setModel({
      type: 'inRange',
      dateFrom: dateFromInput,
      dateTo: datetOInput,
    });
    this.gridApi.onFilterChanged();
  }
  //#endregion

  ngOnDestroy(): void {}
}
