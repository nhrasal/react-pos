export interface ICustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

const data: ICustomer[] = [
  {
    id: 1,
    name: "Mr Bean",
    phone: "1234567890",
    email: "mrbean@test.com",
    address: "123, Test Street, Test City, Test State, Test Country",
  },
  {
    id: 2,
    name: "NH Rasal",
    phone: "1234567890",
    email: "nhrasal.cse@gmail.com",
    address: "123, Test Street, Test City, Test State, Test Country",
  },
];

const customers = {
  total: data.length,
  data: data,
  message: "Customers fetched successfully",
};

export default customers;
