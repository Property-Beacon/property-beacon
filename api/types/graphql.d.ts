import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type Address = {
  __typename?: 'Address';
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  profile?: Maybe<CompanyProfile>;
};

export type CompanyProfile = {
  __typename?: 'CompanyProfile';
  id: Scalars['String'];
  companyId: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  abn?: Maybe<Scalars['String']>;
  acn?: Maybe<Scalars['String']>;
  crn?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  mayor?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
};





export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  createCompanyProfile: CompanyProfile;
  deleteUserByEmail: Scalars['Boolean'];
  deleteUserById: Scalars['Boolean'];
  deleteUserByIssuer: Scalars['Boolean'];
  updateCompany: Company;
  updateCompanyProfile: CompanyProfile;
  updateUserProfileById: UserProfile;
};


export type MutationCreateCompanyArgs = {
  data?: Maybe<UpdateCompany>;
};


export type MutationCreateCompanyProfileArgs = {
  companyId: Scalars['String'];
  data?: Maybe<UpdateCompanyProfile>;
};


export type MutationDeleteUserByEmailArgs = {
  email: Scalars['String'];
};


export type MutationDeleteUserByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserByIssuerArgs = {
  issuer: Scalars['String'];
};


export type MutationUpdateCompanyArgs = {
  id: Scalars['String'];
  data?: Maybe<UpdateCompany>;
};


export type MutationUpdateCompanyProfileArgs = {
  companyId: Scalars['String'];
  data?: Maybe<UpdateCompanyProfile>;
};


export type MutationUpdateUserProfileByIdArgs = {
  userId: Scalars['String'];
  data: UpdateUserProfile;
};

export type Query = {
  __typename?: 'Query';
  getAddressByCompanyProfileId: Address;
  getAddressByUserProfileId: Address;
  getCompanies: Array<Company>;
  getCompany: Company;
  getCompanyProfile?: Maybe<CompanyProfile>;
  getUserByEmail: User;
  getUserById: User;
  getUserByIssuer: User;
  getUsersByRole: Array<User>;
  redwood?: Maybe<Redwood>;
};


export type QueryGetAddressByCompanyProfileIdArgs = {
  companyProfileId: Scalars['String'];
};


export type QueryGetAddressByUserProfileIdArgs = {
  userProfileId: Scalars['String'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['String'];
};


export type QueryGetCompanyProfileArgs = {
  companyId: Scalars['String'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIssuerArgs = {
  issuer: Scalars['String'];
};


export type QueryGetUsersByRoleArgs = {
  role: Role;
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};

export type Role =
  | 'USER'
  | 'ADMIN'
  | 'CLIENT'
  | 'CUSTOMER';


export type UpdateAddress = {
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type UpdateCompany = {
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  profile?: Maybe<UpdateCompanyProfile>;
};

export type UpdateCompanyProfile = {
  phone?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  abn?: Maybe<Scalars['String']>;
  acn?: Maybe<Scalars['String']>;
  crn?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  mayor?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateAddress>;
};

export type UpdateUserProfile = {
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  modified?: Maybe<Scalars['DateTime']>;
  address?: Maybe<UpdateAddress>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  role: Role;
  email: Scalars['String'];
  issuer: Scalars['String'];
  logOn: Scalars['DateTime'];
  logOff?: Maybe<Scalars['DateTime']>;
  profile: UserProfile;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  fullName?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Company: ResolverTypeWrapper<Company>;
  CompanyProfile: ResolverTypeWrapper<CompanyProfile>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Role: Role;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateAddress: UpdateAddress;
  UpdateCompany: UpdateCompany;
  UpdateCompanyProfile: UpdateCompanyProfile;
  UpdateUserProfile: UpdateUserProfile;
  User: ResolverTypeWrapper<User>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  String: Scalars['String'];
  Company: Company;
  CompanyProfile: CompanyProfile;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
  Redwood: Redwood;
  Time: Scalars['Time'];
  UpdateAddress: UpdateAddress;
  UpdateCompany: UpdateCompany;
  UpdateCompanyProfile: UpdateCompanyProfile;
  UpdateUserProfile: UpdateUserProfile;
  User: User;
  UserProfile: UserProfile;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suburb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['CompanyProfile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyProfile'] = ResolversParentTypes['CompanyProfile']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  abn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  acn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mayor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, never>>;
  createCompanyProfile?: Resolver<ResolversTypes['CompanyProfile'], ParentType, ContextType, RequireFields<MutationCreateCompanyProfileArgs, 'companyId'>>;
  deleteUserByEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserByEmailArgs, 'email'>>;
  deleteUserById?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserByIdArgs, 'id'>>;
  deleteUserByIssuer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserByIssuerArgs, 'issuer'>>;
  updateCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationUpdateCompanyArgs, 'id'>>;
  updateCompanyProfile?: Resolver<ResolversTypes['CompanyProfile'], ParentType, ContextType, RequireFields<MutationUpdateCompanyProfileArgs, 'companyId'>>;
  updateUserProfileById?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileByIdArgs, 'userId' | 'data'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAddressByCompanyProfileId?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryGetAddressByCompanyProfileIdArgs, 'companyProfileId'>>;
  getAddressByUserProfileId?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryGetAddressByUserProfileIdArgs, 'userProfileId'>>;
  getCompanies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  getCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryGetCompanyArgs, 'id'>>;
  getCompanyProfile?: Resolver<Maybe<ResolversTypes['CompanyProfile']>, ParentType, ContextType, RequireFields<QueryGetCompanyProfileArgs, 'companyId'>>;
  getUserByEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUserByIssuer?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIssuerArgs, 'issuer'>>;
  getUsersByRole?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUsersByRoleArgs, 'role'>>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  logOff?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanyProfile?: CompanyProfileResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Time?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
