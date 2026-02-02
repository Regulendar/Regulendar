import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AddUserInputDto = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type AddUserOutputDto = {
  __typename?: 'AddUserOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type CreateEventInputDto = {
  eventDuration: Scalars['Float']['input'];
  eventStartAt: Scalars['DateTime']['input'];
  eventTitle: Scalars['String']['input'];
  hostOrganizationId: Scalars['String']['input'];
  hostUserId: Scalars['String']['input'];
};

export type CreateEventOutputDto = {
  __typename?: 'CreateEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type CreateOrganizationInputDto = {
  organizationDescription?: InputMaybe<Scalars['String']['input']>;
  organizationName: Scalars['String']['input'];
  ownerUserId: Scalars['String']['input'];
};

export type CreateOrganizationOutputDto = {
  __typename?: 'CreateOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type DeleteEventInputDto = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeleteEventOutputDto = {
  __typename?: 'DeleteEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type DeleteOrganizationInputDto = {
  nameConfirmation: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeleteOrganizationOutputDto = {
  __typename?: 'DeleteOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type DeleteUserInputDto = {
  id: Scalars['String']['input'];
};

export type DeleteUserOutputDto = {
  __typename?: 'DeleteUserOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type EventDto = {
  __typename?: 'EventDto';
  eventDateDay: Scalars['Float']['output'];
  eventDateMonth: Scalars['Float']['output'];
  eventDateYear: Scalars['Float']['output'];
  eventDuration: Scalars['Float']['output'];
  eventId: Scalars['String']['output'];
  eventParticipations: Array<EventParticipationDto>;
  eventStartAt: Scalars['DateTime']['output'];
  eventStatus: EventStatus;
  eventTitle: Scalars['String']['output'];
  hostOrganizationId: Scalars['String']['output'];
};

export type EventParticipationDto = {
  __typename?: 'EventParticipationDto';
  eventId: Scalars['String']['output'];
  role: EventRole;
  userId: Scalars['String']['output'];
};

export enum EventRole {
  Host = 'HOST',
  Participant = 'PARTICIPANT'
}

export enum EventStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Processing = 'PROCESSING',
  Scheduled = 'SCHEDULED'
}

export type GetEventInputDto = {
  eventId: Scalars['String']['input'];
};

export type GetEventOutputDto = {
  __typename?: 'GetEventOutputDto';
  event: EventDto;
};

export type GetEventsInputDto = {
  eventDateDay?: InputMaybe<Scalars['Float']['input']>;
  eventDateMonth?: InputMaybe<Scalars['Float']['input']>;
  eventDateYear?: InputMaybe<Scalars['Float']['input']>;
  eventStatus?: InputMaybe<EventStatus>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetEventsOutputDto = {
  __typename?: 'GetEventsOutputDto';
  events: Array<EventDto>;
};

export type GetOrganizationInputDto = {
  organizationId: Scalars['String']['input'];
};

export type GetOrganizationOutputDto = {
  __typename?: 'GetOrganizationOutputDto';
  organization: OrganizationDto;
};

export type GetOrganizationsInputDto = {
  isUserJoined: Scalars['Boolean']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};

export type GetOrganizationsOutputDto = {
  __typename?: 'GetOrganizationsOutputDto';
  organizations: Array<OrganizationDto>;
};

export type GetUserInputDto = {
  id: Scalars['String']['input'];
};

export type GetUserOutputDto = {
  __typename?: 'GetUserOutputDto';
  user: UserDto;
};

export type GetUsersInputDto = {
  eventId?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetUsersOutputDto = {
  __typename?: 'GetUsersOutputDto';
  users: Array<UserDto>;
};

export type JoinEventInputDto = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type JoinEventOutputDto = {
  __typename?: 'JoinEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type JoinOrganizationInputDto = {
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type JoinOrganizationOutputDto = {
  __typename?: 'JoinOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: AddUserOutputDto;
  createEvent: CreateEventOutputDto;
  createOrganization: CreateOrganizationOutputDto;
  deleteEvent: DeleteEventOutputDto;
  deleteOrganization: DeleteOrganizationOutputDto;
  deleteUser: DeleteUserOutputDto;
  joinEvent: JoinEventOutputDto;
  joinOrganization: JoinOrganizationOutputDto;
  unJoinEvent: UnJoinEventOutputDto;
  unJoinOrganization: UnJoinOrganizationOutputDto;
  updateEvent: UpdateEventOutputDto;
};


export type MutationAddUserArgs = {
  input: AddUserInputDto;
};


export type MutationCreateEventArgs = {
  input: CreateEventInputDto;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInputDto;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInputDto;
};


export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInputDto;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInputDto;
};


export type MutationJoinEventArgs = {
  input: JoinEventInputDto;
};


export type MutationJoinOrganizationArgs = {
  input: JoinOrganizationInputDto;
};


export type MutationUnJoinEventArgs = {
  input: UnJoinEventInputDto;
};


export type MutationUnJoinOrganizationArgs = {
  input: UnJoinOrganizationInputDto;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInputDto;
};

export type OrganizationDto = {
  __typename?: 'OrganizationDto';
  events: Array<EventDto>;
  organizationDescription?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  organizationMembers: Array<OrganizationMemberDto>;
  organizationName: Scalars['String']['output'];
};

export type OrganizationMemberDto = {
  __typename?: 'OrganizationMemberDto';
  organizationId: Scalars['String']['output'];
  role: OrganizationRole;
  userId: Scalars['String']['output'];
};

export enum OrganizationRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type Query = {
  __typename?: 'Query';
  getEvent: GetEventOutputDto;
  getEvents: GetEventsOutputDto;
  getOrganization: GetOrganizationOutputDto;
  getOrganizations: GetOrganizationsOutputDto;
  getUser: GetUserOutputDto;
  getUsers: GetUsersOutputDto;
};


export type QueryGetEventArgs = {
  input: GetEventInputDto;
};


export type QueryGetEventsArgs = {
  input: GetEventsInputDto;
};


export type QueryGetOrganizationArgs = {
  input: GetOrganizationInputDto;
};


export type QueryGetOrganizationsArgs = {
  input: GetOrganizationsInputDto;
};


export type QueryGetUserArgs = {
  input: GetUserInputDto;
};


export type QueryGetUsersArgs = {
  input: GetUsersInputDto;
};

export type UnJoinEventInputDto = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UnJoinEventOutputDto = {
  __typename?: 'UnJoinEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type UnJoinOrganizationInputDto = {
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UnJoinOrganizationOutputDto = {
  __typename?: 'UnJoinOrganizationOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type UpdateEventInputDto = {
  eventDuration?: InputMaybe<Scalars['Float']['input']>;
  eventId: Scalars['String']['input'];
  eventStartAt?: InputMaybe<Scalars['DateTime']['input']>;
  eventStatus?: InputMaybe<EventStatus>;
  eventTitle?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventOutputDto = {
  __typename?: 'UpdateEventOutputDto';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  eventParticipations: Array<EventParticipationDto>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizationMembers: Array<OrganizationMemberDto>;
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type CreateNewEventMutationVariables = Exact<{
  input: CreateEventInputDto;
}>;


export type CreateNewEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'CreateEventOutputDto', message: string, status: number } };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInputDto;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'CreateOrganizationOutputDto', message: string, status: number } };

export type GetOrganizationQueryVariables = Exact<{
  input: GetOrganizationInputDto;
}>;


export type GetOrganizationQuery = { __typename?: 'Query', getOrganization: { __typename?: 'GetOrganizationOutputDto', organization: { __typename?: 'OrganizationDto', organizationId: string, organizationName: string } } };

export type CheckIsOrganizationAdminQueryVariables = Exact<{
  input: GetUserInputDto;
}>;


export type CheckIsOrganizationAdminQuery = { __typename?: 'Query', getUser: { __typename?: 'GetUserOutputDto', user: { __typename?: 'UserDto', organizationMembers: Array<{ __typename?: 'OrganizationMemberDto', organizationId: string, role: OrganizationRole }> } } };

export type GetMyScheduledEventsQueryVariables = Exact<{
  input: GetEventsInputDto;
}>;


export type GetMyScheduledEventsQuery = { __typename?: 'Query', getEvents: { __typename?: 'GetEventsOutputDto', events: Array<{ __typename?: 'EventDto', eventId: string, eventTitle: string, eventDateDay: number, eventStartAt: any, eventDuration: number, eventStatus: EventStatus, eventParticipations: Array<{ __typename?: 'EventParticipationDto', userId: string }> }> } };

export type GetEventsByMonthQueryVariables = Exact<{
  input: GetEventsInputDto;
}>;


export type GetEventsByMonthQuery = { __typename?: 'Query', getEvents: { __typename?: 'GetEventsOutputDto', events: Array<{ __typename?: 'EventDto', eventId: string, eventParticipations: Array<{ __typename?: 'EventParticipationDto', userId: string }> }> } };

export type GetOrganizationsQueryVariables = Exact<{
  input: GetOrganizationsInputDto;
}>;


export type GetOrganizationsQuery = { __typename?: 'Query', getOrganizations: { __typename?: 'GetOrganizationsOutputDto', organizations: Array<{ __typename?: 'OrganizationDto', organizationId: string, organizationName: string, organizationDescription?: string | null, organizationMembers: Array<{ __typename?: 'OrganizationMemberDto', userId: string }> }> } };

export type JoinOrganizationMutationVariables = Exact<{
  input: JoinOrganizationInputDto;
}>;


export type JoinOrganizationMutation = { __typename?: 'Mutation', joinOrganization: { __typename?: 'JoinOrganizationOutputDto', message: string, status: number } };

export type SignUpUserMutationVariables = Exact<{
  input: AddUserInputDto;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'AddUserOutputDto', status: number, message: string } };


export const CreateNewEventDocument = gql`
    mutation CreateNewEvent($input: CreateEventInputDto!) {
  createEvent(input: $input) {
    message
    status
  }
}
    `;
export type CreateNewEventMutationFn = Apollo.MutationFunction<CreateNewEventMutation, CreateNewEventMutationVariables>;

/**
 * __useCreateNewEventMutation__
 *
 * To run a mutation, you first call `useCreateNewEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewEventMutation, { data, loading, error }] = useCreateNewEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewEventMutation, CreateNewEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewEventMutation, CreateNewEventMutationVariables>(CreateNewEventDocument, options);
      }
export type CreateNewEventMutationHookResult = ReturnType<typeof useCreateNewEventMutation>;
export type CreateNewEventMutationResult = Apollo.MutationResult<CreateNewEventMutation>;
export type CreateNewEventMutationOptions = Apollo.BaseMutationOptions<CreateNewEventMutation, CreateNewEventMutationVariables>;
export const CreateOrganizationDocument = gql`
    mutation createOrganization($input: CreateOrganizationInputDto!) {
  createOrganization(input: $input) {
    message
    status
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const GetOrganizationDocument = gql`
    query getOrganization($input: GetOrganizationInputDto!) {
  getOrganization(input: $input) {
    organization {
      organizationId
      organizationName
    }
  }
}
    `;

/**
 * __useGetOrganizationQuery__
 *
 * To run a query within a React component, call `useGetOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrganizationQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables> & ({ variables: GetOrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
      }
export function useGetOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
// @ts-ignore
export function useGetOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<GetOrganizationQuery, GetOrganizationQueryVariables>;
export function useGetOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<GetOrganizationQuery | undefined, GetOrganizationQueryVariables>;
export function useGetOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
export type GetOrganizationQueryHookResult = ReturnType<typeof useGetOrganizationQuery>;
export type GetOrganizationLazyQueryHookResult = ReturnType<typeof useGetOrganizationLazyQuery>;
export type GetOrganizationSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationSuspenseQuery>;
export type GetOrganizationQueryResult = Apollo.QueryResult<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const CheckIsOrganizationAdminDocument = gql`
    query checkIsOrganizationAdmin($input: GetUserInputDto!) {
  getUser(input: $input) {
    user {
      organizationMembers {
        organizationId
        role
      }
    }
  }
}
    `;

/**
 * __useCheckIsOrganizationAdminQuery__
 *
 * To run a query within a React component, call `useCheckIsOrganizationAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIsOrganizationAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIsOrganizationAdminQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckIsOrganizationAdminQuery(baseOptions: Apollo.QueryHookOptions<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables> & ({ variables: CheckIsOrganizationAdminQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>(CheckIsOrganizationAdminDocument, options);
      }
export function useCheckIsOrganizationAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>(CheckIsOrganizationAdminDocument, options);
        }
// @ts-ignore
export function useCheckIsOrganizationAdminSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>): Apollo.UseSuspenseQueryResult<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>;
export function useCheckIsOrganizationAdminSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>): Apollo.UseSuspenseQueryResult<CheckIsOrganizationAdminQuery | undefined, CheckIsOrganizationAdminQueryVariables>;
export function useCheckIsOrganizationAdminSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>(CheckIsOrganizationAdminDocument, options);
        }
export type CheckIsOrganizationAdminQueryHookResult = ReturnType<typeof useCheckIsOrganizationAdminQuery>;
export type CheckIsOrganizationAdminLazyQueryHookResult = ReturnType<typeof useCheckIsOrganizationAdminLazyQuery>;
export type CheckIsOrganizationAdminSuspenseQueryHookResult = ReturnType<typeof useCheckIsOrganizationAdminSuspenseQuery>;
export type CheckIsOrganizationAdminQueryResult = Apollo.QueryResult<CheckIsOrganizationAdminQuery, CheckIsOrganizationAdminQueryVariables>;
export const GetMyScheduledEventsDocument = gql`
    query getMyScheduledEvents($input: GetEventsInputDto!) {
  getEvents(input: $input) {
    events {
      eventId
      eventTitle
      eventDateDay
      eventStartAt
      eventDuration
      eventStatus
      eventParticipations {
        userId
      }
    }
  }
}
    `;

/**
 * __useGetMyScheduledEventsQuery__
 *
 * To run a query within a React component, call `useGetMyScheduledEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyScheduledEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyScheduledEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyScheduledEventsQuery(baseOptions: Apollo.QueryHookOptions<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables> & ({ variables: GetMyScheduledEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>(GetMyScheduledEventsDocument, options);
      }
export function useGetMyScheduledEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>(GetMyScheduledEventsDocument, options);
        }
// @ts-ignore
export function useGetMyScheduledEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>;
export function useGetMyScheduledEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyScheduledEventsQuery | undefined, GetMyScheduledEventsQueryVariables>;
export function useGetMyScheduledEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>(GetMyScheduledEventsDocument, options);
        }
export type GetMyScheduledEventsQueryHookResult = ReturnType<typeof useGetMyScheduledEventsQuery>;
export type GetMyScheduledEventsLazyQueryHookResult = ReturnType<typeof useGetMyScheduledEventsLazyQuery>;
export type GetMyScheduledEventsSuspenseQueryHookResult = ReturnType<typeof useGetMyScheduledEventsSuspenseQuery>;
export type GetMyScheduledEventsQueryResult = Apollo.QueryResult<GetMyScheduledEventsQuery, GetMyScheduledEventsQueryVariables>;
export const GetEventsByMonthDocument = gql`
    query getEventsByMonth($input: GetEventsInputDto!) {
  getEvents(input: $input) {
    events {
      eventId
      eventParticipations {
        userId
      }
    }
  }
}
    `;

/**
 * __useGetEventsByMonthQuery__
 *
 * To run a query within a React component, call `useGetEventsByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsByMonthQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventsByMonthQuery(baseOptions: Apollo.QueryHookOptions<GetEventsByMonthQuery, GetEventsByMonthQueryVariables> & ({ variables: GetEventsByMonthQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>(GetEventsByMonthDocument, options);
      }
export function useGetEventsByMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>(GetEventsByMonthDocument, options);
        }
// @ts-ignore
export function useGetEventsByMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>): Apollo.UseSuspenseQueryResult<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>;
export function useGetEventsByMonthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>): Apollo.UseSuspenseQueryResult<GetEventsByMonthQuery | undefined, GetEventsByMonthQueryVariables>;
export function useGetEventsByMonthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>(GetEventsByMonthDocument, options);
        }
export type GetEventsByMonthQueryHookResult = ReturnType<typeof useGetEventsByMonthQuery>;
export type GetEventsByMonthLazyQueryHookResult = ReturnType<typeof useGetEventsByMonthLazyQuery>;
export type GetEventsByMonthSuspenseQueryHookResult = ReturnType<typeof useGetEventsByMonthSuspenseQuery>;
export type GetEventsByMonthQueryResult = Apollo.QueryResult<GetEventsByMonthQuery, GetEventsByMonthQueryVariables>;
export const GetOrganizationsDocument = gql`
    query getOrganizations($input: GetOrganizationsInputDto!) {
  getOrganizations(input: $input) {
    organizations {
      organizationId
      organizationName
      organizationDescription
      organizationMembers {
        userId
      }
    }
  }
}
    `;

/**
 * __useGetOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrganizationsQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables> & ({ variables: GetOrganizationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
      }
export function useGetOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
        }
// @ts-ignore
export function useGetOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>): Apollo.UseSuspenseQueryResult<GetOrganizationsQuery, GetOrganizationsQueryVariables>;
export function useGetOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>): Apollo.UseSuspenseQueryResult<GetOrganizationsQuery | undefined, GetOrganizationsQueryVariables>;
export function useGetOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
        }
export type GetOrganizationsQueryHookResult = ReturnType<typeof useGetOrganizationsQuery>;
export type GetOrganizationsLazyQueryHookResult = ReturnType<typeof useGetOrganizationsLazyQuery>;
export type GetOrganizationsSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationsSuspenseQuery>;
export type GetOrganizationsQueryResult = Apollo.QueryResult<GetOrganizationsQuery, GetOrganizationsQueryVariables>;
export const JoinOrganizationDocument = gql`
    mutation joinOrganization($input: JoinOrganizationInputDto!) {
  joinOrganization(input: $input) {
    message
    status
  }
}
    `;
export type JoinOrganizationMutationFn = Apollo.MutationFunction<JoinOrganizationMutation, JoinOrganizationMutationVariables>;

/**
 * __useJoinOrganizationMutation__
 *
 * To run a mutation, you first call `useJoinOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinOrganizationMutation, { data, loading, error }] = useJoinOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<JoinOrganizationMutation, JoinOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinOrganizationMutation, JoinOrganizationMutationVariables>(JoinOrganizationDocument, options);
      }
export type JoinOrganizationMutationHookResult = ReturnType<typeof useJoinOrganizationMutation>;
export type JoinOrganizationMutationResult = Apollo.MutationResult<JoinOrganizationMutation>;
export type JoinOrganizationMutationOptions = Apollo.BaseMutationOptions<JoinOrganizationMutation, JoinOrganizationMutationVariables>;
export const SignUpUserDocument = gql`
    mutation SignUpUser($input: AddUserInputDto!) {
  addUser(input: $input) {
    status
    message
  }
}
    `;
export type SignUpUserMutationFn = Apollo.MutationFunction<SignUpUserMutation, SignUpUserMutationVariables>;

/**
 * __useSignUpUserMutation__
 *
 * To run a mutation, you first call `useSignUpUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpUserMutation, { data, loading, error }] = useSignUpUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpUserMutation(baseOptions?: Apollo.MutationHookOptions<SignUpUserMutation, SignUpUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpUserMutation, SignUpUserMutationVariables>(SignUpUserDocument, options);
      }
export type SignUpUserMutationHookResult = ReturnType<typeof useSignUpUserMutation>;
export type SignUpUserMutationResult = Apollo.MutationResult<SignUpUserMutation>;
export type SignUpUserMutationOptions = Apollo.BaseMutationOptions<SignUpUserMutation, SignUpUserMutationVariables>;