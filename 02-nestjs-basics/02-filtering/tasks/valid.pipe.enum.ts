import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ParseEnumWithMessagePipe implements PipeTransform {
  constructor(
    private readonly enumType: object,
    private readonly options?: { optional?: boolean },
  ) {}

  transform(value: string, metadata: ArgumentMetadata) {
    if (this.options?.optional && (value === undefined || value === null)) {
      return value;
    }

    const enumValues = Object.values(this.enumType);
    if (value && !enumValues.includes(value)) {
      throw new BadRequestException(
        `Invalid value for status. Allowed values are: ${enumValues}`,
      );
    }

    return value as keyof typeof this.enumType;
  }
}
