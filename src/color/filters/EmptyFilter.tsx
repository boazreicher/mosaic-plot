import { Filter } from './Filter';

export class EmptyFilter extends Filter {
  constructor() {
    super('empty');
  }
  toString(): string {
    return '';
  }
}
