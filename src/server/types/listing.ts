import { ownerType } from '../db/schema';

export type OwnerType = (typeof ownerType)['enumValues'][number];
