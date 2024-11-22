export enum roleType {
  admin = 'admin',
  superAdmin = 'superAdmin',
  customer = 'customer',
  staff = 'staff',
  delivery = 'delivery',
}


export enum orderStatus {
  pending = 'pending',
  accepted = 'accepted',
  shipped = 'shipped',
  delivered = 'delivered',
  cancel = 'cancel',
}

export enum paymentMethod {
  online = 'online',
  cod = 'cod',
  esewa = 'esewa',
  khalti = 'khalti',
  bankTransfer = 'bankTransfer',
  others ='others'
}

export enum billingStatus {
  paid = 'paid',
  unpaid = 'unpaid',
}

export enum paymentStatus {
  accept = 'accept',
  pending = 'pending',
  release = 'release',
  reject = 'reject',
}

export enum genderType {
  male = 'male',
  female = 'female',
  others = 'others',
}

export type JwtPayload = {
  sub: string;
  role: string;
};

export enum otpRequestType {
  register = 'register',
  forgotPassword = 'forgotPassword',
}

export enum CategoryStatus {
  available = 'available',
  unavailabe = 'unavailable',
}

export enum ProductStatus {
  available = 'available',
  unavailabe = 'unavailable',
}

export enum filterProductType {
  highSell = 'highSell',
  highRating = 'highRating',
  lowRating = 'lowRating',
  highPrice = 'highPrice',
  lowPrice = 'lowPrice',
}
