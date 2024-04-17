import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FilterPipe implements PipeTransform {
  private readonly logger: Logger = new Logger(FilterPipe.name);
  constructor(private filterValue: any[]) {
    this.filterValue = filterValue;
  }

  async transform(value: any) {
    const filteredObject = this.filterValue.reduce((obj, key) => {
      if (value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
      return obj;
    }, {});

    return filteredObject;
  }

  getAttributeNames<T>(obj: T): string[] {
    return Object.keys(obj);
  }
}
