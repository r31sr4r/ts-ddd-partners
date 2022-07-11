import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {      
      console.log(error);
      throw new Error(`Error on create new order. Details: ${error}`);
      
    }

  }

  async update(entity: Order): Promise<void> {
    try {
      const sequelize = OrderModel.sequelize;
      await sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction: t,
        });
        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        }));
        await OrderItemModel.bulkCreate(items, { transaction: t });
        await OrderModel.update(
          { 
            customer_id: entity.customerId,
            total: entity.total() 
          },
          { where: { id: entity.id }, transaction: t }
        );
      }
      
      );
    } catch (error) {
      throw new Error(`Error on update order. Details: ${error}`);
    }
  }
  
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel
      .findOne(
        { 
          where: { id },
          include: [{ model: OrderItemModel }]
        });

        
    const order = new Order(orderModel.id, 
      orderModel.customer_id,       
      orderModel.items.map((item) => 
        new OrderItem(item.id, 
                      item.name, 
                      item.price, 
                      item.product_id, 
                      item.quantity)
                    )
    );

    order.total();

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll(
      { include: [{ model: OrderItemModel }] }
    );

    return orderModels.map((orderModel) => {
      const order = new Order(orderModel.id, 
        orderModel.customer_id,       
        orderModel.items.map((item) => 
          new OrderItem(item.id, 
                        item.name, 
                        item.price, 
                        item.product_id, 
                        item.quantity)
                      )
      );

      order.total();

      return order;
    });
  }
}
