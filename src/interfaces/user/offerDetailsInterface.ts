
interface Seller {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    profileImage:string
    level : {
      level : number
    }
  }
  
  interface Service {
    id: string;
    name: string;
    nameAr: string;
  }
  
  interface SubService {
    id: string;
    name: string;
    nameAr: string;
  }
  
  interface Brand {
    id: string;
    name: string;
    nameAr: string;
    image: string;
  }
  
  interface Product {
    id: string;
    title: string;
    titleAr: string;
    image: string;
    description: string;
    descriptionAr: string;
    service: Service;
    subService: SubService;
    brand: Brand;
    region: string | null;
  }
  
 export  interface IOfferDetails {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    unitPriceUSD: number;
    unitPriceSAR: number;
    minQty: number;
    apiQty: number;
    lowStockAlertQty: number;
    deliveryMethods: string[];
    createdAt: string;
    updatedAt: string;
    seller: Seller;
    product: Product;
  }
  