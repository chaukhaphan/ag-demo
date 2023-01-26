import * as dayjs from 'dayjs';

export class DateRangeFilterParams {
  filterParams: any;
  constructor(private selectedDateRangeFilter: any, private filterName: any) {
    this.filterParams = {
      inRangeInclusive: true,
      comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
        let selectedShipmentDateRange =
          this.selectedDateRangeFilter[this.filterName];
        let selectedDateFrom = dayjs(selectedShipmentDateRange[0])
          .set('hours', 0)
          .set('minute', 0)
          .set('second', 0);
        let selectedDateTo;
        let formatedCellValue = dayjs(cellValue, 'YYYY-MM-DD')
          .set('hours', 0)
          .set('minute', 0)
          .set('second', 0);
        if (selectedShipmentDateRange.length == 2) {
          selectedDateTo = dayjs(selectedShipmentDateRange[1])
            .set('hours', 0)
            .set('minute', 0)
            .set('second', 0);
          if (
            (formatedCellValue.isAfter(selectedDateFrom) &&
              formatedCellValue.isBefore(selectedDateTo)) ||
            selectedDateFrom.isSame(formatedCellValue) ||
            selectedDateTo.isSame(formatedCellValue)
          ) {
            return 0;
          }
        }
        return -1;
      },
    };
  }
}
