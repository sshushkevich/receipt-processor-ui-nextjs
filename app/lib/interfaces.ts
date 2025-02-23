export interface ReceiptItem {
  shortDescription: string;
  price: string;
}

export interface Receipt {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  total: string;
  items: ReceiptItem[];
}

export interface ReceiptResponse {
  id: string;
}

export interface ReceiptPointsResponse {
  points: number;
}

export interface ReceiptPointsItem {
  id: string;
  points: number;
}
