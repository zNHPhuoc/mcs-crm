import { Provider } from '@nestjs/common';
import { UniqueUserFieldConstraint } from '../validators/unique-field.validator';
import { MatchConstraint } from '../validators/match.decorator';
import { IsStrongPasswordConstraint } from '../validators/strong-password.validator';

export const validatedAuthProvider: Provider[] = [
  UniqueUserFieldConstraint,
  MatchConstraint,
  IsStrongPasswordConstraint,
];
