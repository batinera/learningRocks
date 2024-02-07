import { SetMetadata } from '@nestjs/common';
import { Auth } from './auth.enum';

export const Auths = (...auths: Auth[]) => SetMetadata('auths', auths);