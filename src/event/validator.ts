import { ClientEvent } from './type';

export function isClientEventValid(event: any): event is ClientEvent {
  // TODO: this dynamic type checker
  return true;
}
