import { ValueOf } from '@/utils/ValueOf';

export const ApiMethod = {
    GET: 'GET',
    POST: 'POST',
} as const;

export type ApiMethod = ValueOf<typeof ApiMethod>;
