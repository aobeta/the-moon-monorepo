import { FlowWallet, Profile, User } from '@aobeta/db-model/prisma';

export type UserProfile = User & { profile: Profile; wallet?: FlowWallet };
