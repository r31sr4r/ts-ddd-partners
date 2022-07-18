import CustomerAddressChangedEvent from "../customer-address-changed.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class WriteLogWhenCustomerAddressIsChangedHandler 
implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: Id: ${event.eventData.id}, nome, ${event.eventData.name},  alterado para: 
        ${event.eventData.address}`);    
  }
}