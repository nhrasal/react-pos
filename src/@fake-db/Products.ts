import SamsungPhone from "./../assets/product-images/samsung-galaxy-s10-1.jpg";
import Camera from "./../assets/product-images/camera.jpg";
import EarBuds from "./../assets/product-images/earbuds.jpg";
import HeadPhone from "./../assets/product-images/headphone.jpg";
import Mouse from "./../assets/product-images/mouse.jpg";
import Keyboard from "./../assets/product-images/keyboard.jpg";
import Ram from "./../assets/product-images/ram.jpg";
import Computer from "./../assets/product-images/Surface Laptop 4.jpg";

export interface IProducts {
  id: number;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
  image: string;
  stock?: number;
  qty?: number;
}
export interface IAddedProducts {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
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
    image: SamsungPhone,
  },
  {
    id: 3,
    name: "Camera",
    description: "Camera",
    price: 100,
    isAvailable: true,
    image: Camera,
  },
  {
    id: 4,
    name: "EarBuds",
    description: "EarBuds",
    price: 50,
    isAvailable: true,
    image: EarBuds,
  },
  {
    id: 5,
    name: "HeadPhone",
    description: "HeadPhone",
    price: 100,
    isAvailable: true,
    image: HeadPhone,
  },
  {
    id: 6,
    name: "Mouse",
    description: "Mouse",
    price: 50,
    isAvailable: true,
    image: Mouse,
  },
  {
    id: 7,
    name: "Keyboard",
    description: "Keyboard",
    price: 100,
    isAvailable: true,
    image: Keyboard,
  },
  {
    id: 8,
    name: "Ram",
    description: "Ram",
    price: 50,
    isAvailable: true,
    image: Ram,
  },
  {
    id: 9,
    name: "Computer",

    description: "Computer",
    price: 100,
    isAvailable: true,
    image: Computer,
  },
];
const products = {
  total: data.length,
  data: data,
  message: "found",
};

export default products;
