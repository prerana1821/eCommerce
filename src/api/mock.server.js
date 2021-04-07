import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      product: Model,
      cartItem: Model,
      wishListItem: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
      this.resource("cartItems");
      this.resource("wishListItems");
    },

    seeds(server) {
      [...Array(100)].forEach((_) => {
        server.create("product", {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.datatype.boolean(),
          wishList: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "Republic Day Sale",
          ]),
          idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior",
          ]),
          level: faker.random.arrayElement([
            "Beginner",
            "Amateur",
            "Intermediate",
            "Advanced",
            "Professional",
          ]),
          color: faker.commerce.color(),
        });
      });
      [...Array(0)].forEach((_) => {
        server.create("cartItem", {});
      });
      [...Array(0)].forEach((_) => {
        server.create("wishListItem", {});
      });
    },
  });
}

// [...Array(1)].forEach((_) => {
//   server.create("cart", {
//     id: faker.datatype.uuid(),
//     name: faker.commerce.productName(),
//     image: faker.random.image(),
//     price: faker.commerce.price(),
//     material: faker.commerce.productMaterial(),
//     brand: faker.lorem.word(),
//     inStock: faker.datatype.boolean(),
//     wishList: faker.datatype.boolean(),
//     fastDelivery: faker.datatype.boolean(),
//     ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
//     offer: faker.random.arrayElement([
//       "Save 50",
//       "70% bonanza",
//       "Republic Day Sale",
//     ]),
//     idealFor: faker.random.arrayElement([
//       "Men",
//       "Women",
//       "Girl",
//       "Boy",
//       "Senior",
//     ]),
//     level: faker.random.arrayElement([
//       "beginner",
//       "amateur",
//       "intermediate",
//       "advanced",
//       "professional",
//     ]),
//     color: faker.commerce.color(),
//   });
// });
// [...Array(0)].forEach((_) => {
//   server.create("wishList", {});
// });
