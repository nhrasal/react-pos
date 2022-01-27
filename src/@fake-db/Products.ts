export interface IProducts {
  id: number;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
  image: string;
  stock?: number;
}

const data: IProducts[] = [
  {
    id: 1,
    name: "iPhone X",
    description: "Apple smart phone",
    price: 1000,
    isAvailable: true,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/x/iphone-x-silver-select-2017?wid=300&hei=300&fmt=png-alpha&qlt=95&.v=1506616086387",
  },
  {
    id: 2,
    name: "Samsung Galaxy S10",
    description: "Samsung smart phone",
    price: 900,
    isAvailable: true,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/x/iphone-x-silver-select-2017?wid=300&hei=300&fmt=png-alpha&qlt=95&.v=1506616086387",
  },
  {
    id: 3,
    name: "Xiaomi Mi8",
    description: "Xiaomi smart phone",
    price: 800,
    isAvailable: true,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/x/iphone-x-silver-select-2017?wid=300&hei=300&fmt=png-alpha&qlt=95&.v=1506616086387",
  },
];
const products = {
  total: data.length,
  data: data,
  message: "found",
};

export default products;
