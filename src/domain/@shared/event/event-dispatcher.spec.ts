import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import WriteLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/write-log-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import EventDispatcher from "./event-dispatcher";
import WriteLogWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/write-log-when-customer-address-is-changed.handler";

describe("Domain events tests", () => {
  describe("Product Events tests", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        0
      );
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
      });

      // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(productCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe("Customer Events tests", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new WriteLogWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new WriteLogWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
        0
      );
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new WriteLogWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new WriteLogWhenCustomerIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const customerCreatedEvent = new CustomerCreatedEvent({
        name: "Customer 1",
        address: "4567 Main St - Apt. 1 - Seattle, WA",
        active: true
      });

      // Quando o notify for executado o WriteLogWhenCustomerIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });


    it("should notify when customer address is changed event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new WriteLogWhenCustomerAddressIsChangedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
      ).toMatchObject(eventHandler);

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: "123",
        name: "Customer 1",
        address: "57 Main St - Apt. 102 - Seattle, WA"
      });

      // Quando o notify for executado o WriteLogWhenCustomerAddressIsChangedHandler.handle() deve ser chamado
      eventDispatcher.notify(customerAddressChangedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  
});
