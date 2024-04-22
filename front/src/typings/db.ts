export interface ILocation {
  lat: number;
  lng: number;
}

export interface IParking {
  parkingName: string;
  parkingType: string;
  roadAddress: string;
  address: string;
  feeInfo: string;
  latitude: string;
  longitude: string;
}

export interface ICloseParking {
  id: number;
  distance: number;
  parkingName: string;
  parkingType: string;
  roadAddress: string;
  address: string;
  feeInfo: string;
  latitude: string;
  longitude: string;
}

export interface ICloseParkingsParams {
  latitude: number;
  longitude: number;
  radius: number;
}
