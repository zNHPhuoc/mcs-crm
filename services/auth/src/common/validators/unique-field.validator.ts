import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { UserInterfaceRepository } from '../../repositories/user/user.interface.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUserFieldConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('UserInterfaceRepository')
    private readonly userRepository: UserInterfaceRepository,
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [field] = args.constraints;
    const exists = await this.userRepository.findByField(field, value);
    return !exists;
  }

  defaultMessage(args: ValidationArguments): string {
    const [field] = args.constraints;
    return `${field} ${args.value} is already in use`;
  }
}

function IsUserFieldUnique(
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUserFieldUnique',
      target: object.constructor,
      propertyName,
      constraints: [field],
      options: validationOptions,
      validator: UniqueUserFieldConstraint,
    });
  };
}

// Specific decorators
export const IsEmailUnique = (options?: ValidationOptions) =>
  IsUserFieldUnique('email', options);

export const IsUsernameUnique = (options?: ValidationOptions) =>
  IsUserFieldUnique('username', options);

export const IsPhoneNumberUnique = (options?: ValidationOptions) =>
  IsUserFieldUnique('phoneNumber', options);
