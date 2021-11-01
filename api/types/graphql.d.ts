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
  country?: Maybe<Scalars['String']>;
  formattedAddress?: Maybe<Scalars['String']>;
  gPlaceId?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  premise?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Company = {
  __typename?: 'Company';
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<CompanyProfile>;
  shortName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyProfile = {
  __typename?: 'CompanyProfile';
  abn?: Maybe<Scalars['String']>;
  acn?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  companyId: Scalars['String'];
  crn?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  mayor?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  deleteCompany?: Maybe<Scalars['Boolean']>;
  deleteUserByEmail: Scalars['Boolean'];
  deleteUserById: Scalars['Boolean'];
  deleteUserByIssuer: Scalars['Boolean'];
  updateCompany: Company;
  updateCompanyProfile: CompanyProfile;
  updateUserProfile: UserProfile;
};


export type MutationCreateCompanyArgs = {
  data: UpdateCompany;
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['String'];
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
  data: UpdateCompany;
  id: Scalars['String'];
};


export type MutationUpdateCompanyProfileArgs = {
  companyId: Scalars['String'];
  data?: Maybe<UpdateCompanyProfile>;
};


export type MutationUpdateUserProfileArgs = {
  data: UpdateUserProfile;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAddressByCompanyProfileId: Address;
  getAddressByUserProfileId: Address;
  getCompanies: Array<Company>;
  getCompany: Company;
  getUserByEmail: User;
  getUserById: User;
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


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersByRoleArgs = {
  role: Role;
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type Role =
  | 'ADMIN'
  | 'CLIENT'
  | 'CUSTOMER'
  | 'USER';

export type UpdateAddress = {
  country?: Maybe<Scalars['String']>;
  formattedAddress?: Maybe<Scalars['String']>;
  gPlaceId?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  premise?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
};

export type UpdateCompany = {
  displayName?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type UpdateCompanyProfile = {
  abn?: Maybe<Scalars['String']>;
  acn?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateAddress>;
  crn?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  mayor?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type UpdateUserProfile = {
  address?: Maybe<UpdateAddress>;
  avatar?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  logOff?: Maybe<Scalars['DateTime']>;
  logOn: Scalars['DateTime'];
  profile: UserProfile;
  role: Role;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  address?: Maybe<Address>;
  avatar?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Company: ResolverTypeWrapper<Company>;
  CompanyProfile: ResolverTypeWrapper<CompanyProfile>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
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
  Boolean: Scalars['Boolean'];
  Company: Company;
  CompanyProfile: CompanyProfile;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  Redwood: Redwood;
  String: Scalars['String'];
  Time: Scalars['Time'];
  UpdateAddress: UpdateAddress;
  UpdateCompany: UpdateCompany;
  UpdateCompanyProfile: UpdateCompanyProfile;
  UpdateUserProfile: UpdateUserProfile;
  User: User;
  UserProfile: UserProfile;
};

export type RequireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type RequireAuthDirectiveResolver<Result, Parent, ContextType = any, Args = RequireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SkipAuthDirectiveArgs = { };

export type SkipAuthDirectiveResolver<Result, Parent, ContextType = any, Args = SkipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formattedAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gPlaceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  premise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suburb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['CompanyProfile']>, ParentType, ContextType>;
  shortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyProfile'] = ResolversParentTypes['CompanyProfile']> = {
  abn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  acn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  crn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mayor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'data'>>;
  deleteCompany?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteCompanyArgs, 'id'>>;
  deleteUserByEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserByEmailArgs, 'email'>>;
  deleteUserById?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserByIdArgs, 'id'>>;
  deleteUserByIssuer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserByIssuerArgs, 'issuer'>>;
  updateCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationUpdateCompanyArgs, 'data' | 'id'>>;
  updateCompanyProfile?: Resolver<ResolversTypes['CompanyProfile'], ParentType, ContextType, RequireFields<MutationUpdateCompanyProfileArgs, 'companyId'>>;
  updateUserProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'data' | 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAddressByCompanyProfileId?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryGetAddressByCompanyProfileIdArgs, 'companyProfileId'>>;
  getAddressByUserProfileId?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryGetAddressByUserProfileIdArgs, 'userProfileId'>>;
  getCompanies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  getCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryGetCompanyArgs, 'id'>>;
  getUserByEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsersByRole?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUsersByRoleArgs, 'role'>>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logOff?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  logOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type DirectiveResolvers<ContextType = any> = {
  requireAuth?: RequireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth?: SkipAuthDirectiveResolver<any, any, ContextType>;
};
