export interface SearchParams {
  accountingXref: any;
  contactId: any;
  langId: any;
  prolanKeyName: any;
  referenceValue: any;
  showHistoricalData: any;
  companyId: any;
  isCompanyLevelUser: any;
}

// otr
// Details of each shipment row in grid
export class OrShipmentDetails {
  constructor(
    public bolDocId: number,
    public containerCount: number,
    public containers: any,
    public deliveryDate: string,
    public destinationsDescription: string,
    public dropCount: number,
    public firstOrigin: string,
    public isCreatedByCustomer: boolean,
    public isLtlShipment: boolean,
    public lastDestination: string,
    public lastLocationDatetime: string,
    public lastLocationName: string,
    public originsDescription: string,
    public pickCount: number,
    public pickupNumber: string,
    public referenceValues: string,
    public shipmentDate: string,
    public shipmentId: string,
    public shipmentSource: number,
    public shipmentStatusName: string,
    public webDocumentAccessTypeId: number,
    public webUnitCode: string,
    public webUnitName: string
  ) {}
}

// Extended detail of shipment when calling another API
export class OrShipmentTaskDetails {
  constructor(
    public tasks: OrShipmentTask[],
    public lastLocation: OrShipmentTaskLastLocation
  ) {}
}

export class OrShipmentTask {
  constructor(
    public actualEndTimeStamp: Date,
    public actualStartTimeStamp: Date,
    public address: string,
    public city: string,
    public companyName: string,
    public contactName: string,
    public contactPhone: string,
    public country: string,
    public delays: any,
    public deliveryReason: string,
    public firstReferenceName: string,
    public firstReferenceValue: string,
    public mainPhone: string,
    public postalCode: string,
    public scheduledEndTimeStamp: Date,
    public scheduledStartTimeStamp: Date,
    public secondReferenceName: string,
    public secondReferenceValue: string,
    public sortIndex: number,
    public state: string,
    public status: string,
    public taskId: number,
    public taskName: string,
    public taskStatusId: number,
    public taskTypeId: number
  ) {}
}

interface OrShipmentTaskLastLocation {
  city: string;
  country: string;
  distance: null;
  distanceUnit: string;
  isTask: boolean;
  state: string;
  timeStamp: string;
  utcTimeStamp: string;
}

export class BanyanShipmentStatus {
  constructor(
    public banyanMessage: string,
    public bol: string,
    public carrierMessage: string,
    public city: string,
    public createTimestamp: string,
    public customerId: number,
    public loadId: string,
    public state: string,
    public statusCode: string,
    public supplier: string,
    public timestamp: string
  ) {}
}

export class FreightItem {
  constructor(
    public description: string,
    public dimension_height: any,
    public dimension_length: any,
    public dimension_shipment_unit_id: any,
    public dimension_unit: any,
    public dimension_width: any,
    public purchase_order_number: any,
    public shipment_quantity: number,
    public shipment_unit: string,
    public weight: string
  ) {}
}

// CW
export class ProlandShipmentDetails {
  constructor(
    public shipmentId: string,
    public shipmentStatusName: string,
    public consignee: string,
    public shipper: string,
    public mawb: string,
    public bkgcontact: string,
    public service: string,
    public shipmentMethod: string,
    public origin: string,
    public etd: Date,
    public destination: string,
    public eta: Date,
    public discharge: string,
    public dischargeDate: Date,
    public containers: string,
    public containersCount: number,
    public vessel: string,
    public voyage: string,
    public carrier: string,
    public pcs: string,
    public weight: string,
    public volume: string,
    public cbm: string,
    public warehouse: string,
    public pickupDate: Date,
    public deliveryDate: Date,
    public description: string,
    public comments: string,
    public poNr: string,
    public styleNr: string
  ) {}
}

export class CWShipmentDetails {
  constructor(
    public consignee: string,
    public containerMode: string,
    public containers: string,
    public destination: {
      name: string;
      code: any;
      countryCode: string;
    },
    public eta: string,
    public etd: string,
    public goodsDescription: string,
    public houseBillNr: string,
    public legs: {
      loadLocation: string;
      dischargeLocation: any;
      arrival: string;
      departure: string;
      mode: string;
    }[],
    public milestones: {
      actualDate: string;
      description: string;
      parentJob: string;
      scheduledDate: string;
      status: string;
    }[],
    public orderReferences: string,
    public origin: {
      name: string;
      code: any;
      countryCode: string;
    },
    public packageType: string,
    public qty: number,
    public shipmentId: string,
    public shipper: string,
    public transportMode: string,
    public volume: number,
    public volumeUnit: string,
    public weight: number,
    public weightUnit: string
  ) {}
}

export class CWShipmentDetailsLeg {
  public location: string | undefined;
  public arrival?: Date;
  public departure?: Date;
  public departureMode?: string;
  public pickedUpDate?: Date | any;
  public deliveriedDate?: Date | any;

  constructor(input: any) {
    if (!input) return;
    this.location = input?.location;
    this.arrival = input?.arrival;
    this.departure = input?.departure;
    this.departureMode = input?.departureMode;
    this.pickedUpDate = input?.pickedUpDate;
    this.deliveriedDate = input?.deliveriedDate;
  }
}
