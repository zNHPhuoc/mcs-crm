import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
@Injectable()
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string): boolean {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    console.log('Validating password:', password);
    console.log({ hasUpper, hasLower, hasNumber, hasSpecial });

    return (
      typeof password === 'string' &&
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSpecial
    );
  }

  defaultMessage(): string {
    return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStrongPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsStrongPasswordConstraint,
    });
  };
}
