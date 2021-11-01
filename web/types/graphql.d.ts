export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type GetUserByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserById = { __typename?: 'Query', user: { __typename?: 'User', id: string, role: Role, email: string, logOn: string, logOff?: string | null | undefined, createdAt: string, profile: { __typename?: 'UserProfile', id: string, avatar?: string | null | undefined, fullName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, mobile?: string | null | undefined, phone?: string | null | undefined, companyId?: string | null | undefined, updatedAt?: string | null | undefined, address?: { __typename?: 'Address', lat?: string | null | undefined, lng?: string | null | undefined, gPlaceId?: string | null | undefined, premise?: string | null | undefined, state?: string | null | undefined, street?: string | null | undefined, suburb?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, updatedAt?: string | null | undefined, formattedAddress?: string | null | undefined } | null | undefined } } };

export type GetCompanyVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCompany = { __typename?: 'Query', company: { __typename?: 'Company', id: string, name?: string | null | undefined, logo?: string | null | undefined, shortName?: string | null | undefined, displayName?: string | null | undefined, website?: string | null | undefined, updatedAt?: string | null | undefined, createdAt: string, profile?: { __typename?: 'CompanyProfile', id: string, companyId: string, phone?: string | null | undefined, fax?: string | null | undefined, mobile?: string | null | undefined, fullName?: string | null | undefined, email?: string | null | undefined, abn?: string | null | undefined, acn?: string | null | undefined, crn?: string | null | undefined, owner?: string | null | undefined, mayor?: string | null | undefined, updatedAt?: string | null | undefined, address?: { __typename?: 'Address', lat?: string | null | undefined, lng?: string | null | undefined, gPlaceId?: string | null | undefined, premise?: string | null | undefined, state?: string | null | undefined, street?: string | null | undefined, suburb?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, updatedAt?: string | null | undefined, formattedAddress?: string | null | undefined } | null | undefined } | null | undefined } };

export type UpdateCompanyVariables = Exact<{
  id: Scalars['String'];
  data: UpdateCompany;
}>;


export type UpdateCompany = { __typename?: 'Mutation', company: { __typename?: 'Company', id: string, name?: string | null | undefined, logo?: string | null | undefined, displayName?: string | null | undefined, shortName?: string | null | undefined, website?: string | null | undefined, updatedAt?: string | null | undefined, createdAt: string } };

export type UpdateCompanyProfileVariables = Exact<{
  companyId: Scalars['String'];
  data: UpdateCompanyProfile;
}>;


export type UpdateCompanyProfile = { __typename?: 'Mutation', companyProfile: { __typename?: 'CompanyProfile', id: string, companyId: string, phone?: string | null | undefined, fax?: string | null | undefined, mobile?: string | null | undefined, fullName?: string | null | undefined, email?: string | null | undefined, abn?: string | null | undefined, acn?: string | null | undefined, crn?: string | null | undefined, owner?: string | null | undefined, mayor?: string | null | undefined, updatedAt?: string | null | undefined, address?: { __typename?: 'Address', lat?: string | null | undefined, lng?: string | null | undefined, gPlaceId?: string | null | undefined, premise?: string | null | undefined, state?: string | null | undefined, street?: string | null | undefined, suburb?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, updatedAt?: string | null | undefined, formattedAddress?: string | null | undefined } | null | undefined } };

export type UpdateUserProfileVariables = Exact<{
  userId: Scalars['String'];
  data: UpdateUserProfile;
}>;


export type UpdateUserProfile = { __typename?: 'Mutation', userProfile: { __typename?: 'UserProfile', id: string, avatar?: string | null | undefined, fullName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, mobile?: string | null | undefined, phone?: string | null | undefined, companyId?: string | null | undefined, updatedAt?: string | null | undefined, address?: { __typename?: 'Address', lat?: string | null | undefined, lng?: string | null | undefined, gPlaceId?: string | null | undefined, premise?: string | null | undefined, state?: string | null | undefined, street?: string | null | undefined, suburb?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, updatedAt?: string | null | undefined, formattedAddress?: string | null | undefined } | null | undefined } };
