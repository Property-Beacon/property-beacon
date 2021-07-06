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
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  profile?: Maybe<CompanyProfile>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
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
  id: Scalars['String'];
  data: UpdateCompany;
};


export type MutationUpdateCompanyProfileArgs = {
  companyId: Scalars['String'];
  data?: Maybe<UpdateCompanyProfile>;
};


export type MutationUpdateUserProfileArgs = {
  userId: Scalars['String'];
  data: UpdateUserProfile;
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
  logo?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
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
  companyId?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateAddress>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  role: Role;
  email: Scalars['String'];
  logOn: Scalars['DateTime'];
  logOff?: Maybe<Scalars['DateTime']>;
  profile: UserProfile;
  createdAt: Scalars['DateTime'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  fullName?: Maybe<Scalars['String']>;
};

export type GetUserByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserById = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'role' | 'email' | 'logOn' | 'logOff' | 'createdAt'>
    & { profile: (
      { __typename?: 'UserProfile' }
      & Pick<UserProfile, 'id' | 'avatar' | 'fullName' | 'firstName' | 'lastName' | 'mobile' | 'phone' | 'companyId' | 'updatedAt'>
      & { address?: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'name' | 'state' | 'street' | 'suburb' | 'country' | 'postalCode' | 'updatedAt'>
      )> }
    ) }
  ) }
);

export type GetCompanyVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCompany = (
  { __typename?: 'Query' }
  & { company: (
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'name' | 'logo' | 'shortName' | 'displayName' | 'website' | 'updatedAt' | 'createdAt'>
    & { profile?: Maybe<(
      { __typename?: 'CompanyProfile' }
      & Pick<CompanyProfile, 'id' | 'companyId' | 'phone' | 'fax' | 'mobile' | 'fullName' | 'email' | 'abn' | 'acn' | 'crn' | 'owner' | 'mayor' | 'updatedAt'>
      & { address?: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'name' | 'state' | 'street' | 'suburb' | 'country' | 'postalCode' | 'updatedAt'>
      )> }
    )> }
  ) }
);

export type UpdateCompanyVariables = Exact<{
  id: Scalars['String'];
  data: UpdateCompany;
}>;


export type UpdateCompany = (
  { __typename?: 'Mutation' }
  & { company: (
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'name' | 'logo' | 'displayName' | 'shortName' | 'website' | 'updatedAt' | 'createdAt'>
  ) }
);

export type UpdateCompanyProfileVariables = Exact<{
  companyId: Scalars['String'];
  data: UpdateCompanyProfile;
}>;


export type UpdateCompanyProfile = (
  { __typename?: 'Mutation' }
  & { companyProfile: (
    { __typename?: 'CompanyProfile' }
    & Pick<CompanyProfile, 'id' | 'companyId' | 'phone' | 'fax' | 'mobile' | 'fullName' | 'email' | 'abn' | 'acn' | 'crn' | 'owner' | 'mayor' | 'updatedAt'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'name' | 'state' | 'street' | 'suburb' | 'country' | 'postalCode' | 'updatedAt'>
    )> }
  ) }
);

export type UpdateUserProfileVariables = Exact<{
  userId: Scalars['String'];
  data: UpdateUserProfile;
}>;


export type UpdateUserProfile = (
  { __typename?: 'Mutation' }
  & { userProfile: (
    { __typename?: 'UserProfile' }
    & Pick<UserProfile, 'id' | 'avatar' | 'fullName' | 'firstName' | 'lastName' | 'mobile' | 'phone' | 'companyId' | 'updatedAt'>
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'name' | 'state' | 'street' | 'suburb' | 'country' | 'postalCode' | 'updatedAt'>
    )> }
  ) }
);
