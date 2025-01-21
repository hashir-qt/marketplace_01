export interface simplifiedProduct {
    _id: string;
    imageUrl: string;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    product: string;
    query: string;
  }

  export interface fullProduct {
    _id: string;
    imageUrl: string;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    description: string;
    quantity: number;
  }
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
   
  }


  
 
