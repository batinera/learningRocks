import {SetMetadata} from '@nestjs/common';
import { Token } from './token.enum';

export const Tokens = (...tokens: Token[]) => SetMetadata('tokens', tokens);