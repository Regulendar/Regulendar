import { Button, Input } from '@/components';
import { useGetOrganizationsLazyQuery, useJoinOrganizationMutation } from '@/libs';
import { useUserStore } from '@/stores';

import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { memo, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDidMount, useDidUpdate } from 'rooks';
import { Image as TamaguiImage, ScrollView, Stack, Text } from 'tamagui';

type IOrganizationCardComponent = {
  organizationId: string;
  organizationName: string;
  organizationDescription?: string | null;
  organizationMemberCount: number;
  organizationImageUrl: string;
  onPressOrganizationCard: () => void;
};
type IOrganization = {
  organizationId: string;
  organizationName: string;
  organizationDescription?: string | null;
  organizationMembers: {
    userId: string;
  }[];
};

type ISearchType = 'EXPLORE_ORGANIZATION' | 'MY_ORGANIZATION';

export const ParticipationScreen = memo(() => {
  const OrganizationCardComponent = memo<IOrganizationCardComponent>(
    ({
      organizationId,
      organizationName,
      organizationDescription,
      organizationMemberCount,
      organizationImageUrl,
      onPressOrganizationCard,
    }) => {
      return (
        <Stack
          key={organizationId}
          width="$fluid"
          height="$size.x30"
          flexDirection="row"
          justify="space-between"
          items="center"
          borderWidth="$size.x0_25"
          borderColor="$colors.lightGray"
          px="$size.x4"
          pressStyle={{ opacity: 0.6 }}
          style={{ borderRadius: 16 }}
          onPress={onPressOrganizationCard}>
          <Stack
            flex={1}
            height="$fluid"
            justify="space-between"
            py="$size.x4"
            gap="$size.x1_5"
            style={{ paddingRight: 8 }}>
            <Stack>
              <Text fontSize="$7" fontWeight="$800" numberOfLines={1} ellipsizeMode="tail">
                {organizationName}
              </Text>
              {organizationDescription && (
                <Text fontSize="$5" fontWeight="$500" color="$colors.mediumGray" numberOfLines={1} ellipsizeMode="tail">
                  {organizationDescription}
                </Text>
              )}
            </Stack>
            <Text fontSize="$4" color="$colors.darkGray">
              인원: {organizationMemberCount}
            </Text>
          </Stack>
          <TamaguiImage src={organizationImageUrl} width={80} aspectRatio={1} borderRadius="$size.x2" />
        </Stack>
      );
    },
  );

  const { userId } = useUserStore();
  const insets = useSafeAreaInsets();
  const route = useRouter();
  const [searchType, setSearchType] = useState<ISearchType>('MY_ORGANIZATION');
  const [exploreOrganizations, setExploreOrganizations] = useState<IOrganization[]>([]);
  const [myOrganizations, setMyOrganizations] = useState<IOrganization[]>([]);
  const [searchedOrganization, setSearchedOrganization] = useState<string>('');
  const [getOrganizationsQuery, { loading }] = useGetOrganizationsLazyQuery();
  const [joinOrganizationMutation] = useJoinOrganizationMutation();

  const organizationListTitle = useMemo(() => {
    const isSearchTypeMyOrganization = searchType === 'MY_ORGANIZATION';
    if (isSearchTypeMyOrganization) {
      return '내 조직';
    }
    return '조직 탐색';
  }, [searchType]);

  const filteredOrganizations = useMemo(() => {
    const sourceOrganizations = searchType === 'MY_ORGANIZATION' ? myOrganizations : exploreOrganizations;
    const trimmedSearch = searchedOrganization.trim().toLowerCase();
    const isSearchEmpty = trimmedSearch === '';
    if (isSearchEmpty) {
      return sourceOrganizations;
    }
    const filteredSourceOrganizations = sourceOrganizations.filter(({ organizationName }) =>
      organizationName.toLowerCase().includes(trimmedSearch),
    );
    return filteredSourceOrganizations;
  }, [searchType, searchedOrganization, myOrganizations, exploreOrganizations]);

  const getOrganizations = useCallback(async () => {
    const { data: myOrganizationsData } = await getOrganizationsQuery({
      variables: {
        input: {
          isUserJoined: true,
          userId: userId,
        },
      },
    });
    const { data: exploreOrganizationsData } = await getOrganizationsQuery({
      variables: {
        input: {
          isUserJoined: false,
          userId: userId,
        },
      },
    });
    const hasOrganizationsData = myOrganizationsData && exploreOrganizationsData;
    if (!hasOrganizationsData) {
      console.log('No organization data found for the user.');
      return;
    }
    const fetchedMyOrganizations = myOrganizationsData.getOrganizations.organizations;
    const fetchedExploreOrganizations = exploreOrganizationsData.getOrganizations.organizations;
    setExploreOrganizations(fetchedExploreOrganizations);
    setMyOrganizations(fetchedMyOrganizations);
  }, [getOrganizationsQuery, userId]);

  const joinOrganization = useCallback(
    async (organizationId: string) => {
      const { errors: joinErrors } = await joinOrganizationMutation({
        variables: {
          input: {
            organizationId: organizationId,
            userId: userId,
          },
        },
      });
      if (joinErrors) {
        console.log('조직 가입에 실패했습니다.', joinErrors);
        return;
      }
    },
    [joinOrganizationMutation, userId],
  );

  const handleChangeSearchOrganization = useCallback((text: string) => {
    setSearchedOrganization(text);
  }, []);

  const handlePressExploreOrganizationSearch = useCallback(() => {
    setSearchType('EXPLORE_ORGANIZATION');
  }, []);

  const handlePressMyOrganizationSearch = useCallback(() => {
    setSearchType('MY_ORGANIZATION');
  }, []);

  const handlePressOrganizationCard = useCallback(
    (organizationId: string) => async () => {
      switch (searchType) {
        case 'MY_ORGANIZATION': {
          route.navigate(`/organization/${organizationId}`);
          await AsyncStorage.setItem('lastOrganizationId', organizationId);
          return;
        }
        case 'EXPLORE_ORGANIZATION': {
          await joinOrganization(organizationId);
          route.navigate(`/organization/${organizationId}`);
          await AsyncStorage.setItem('lastOrganizationId', organizationId);
          return;
        }
      }
    },
    [joinOrganization, route, searchType],
  );

  const handlePressCreateOrganization = useCallback(() => {
    route.navigate('/create/createOrganization/createOrganization');
  }, [route]);

  useDidMount(async () => {
    await getOrganizations();
  });

  useDidUpdate(() => {
    setSearchedOrganization('');
  }, [searchType]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} px="$size.x5" py="$size.x4" gap="$size.x4">
        <Text fontSize="$9" fontWeight="800">
          내 조직
        </Text>
        <Stack width="$fluid" gap="$size.x2">
          <Input
            value={searchedOrganization}
            onChangeText={handleChangeSearchOrganization}
            w="$fluid"
            height="$size.x12"
            placeholder="검색"
            px="$size.x3"
            borderColor="$colors.lightGray"
            fontSize="$5"
            fontWeight="500"
            focusStyle={{ borderColor: '$colors.primaryGreen' }}
          />
          <Stack width="$fluid" flexDirection="row" justify="space-between" items="center" gap="$size.x2">
            <Button
              px="$size.x6"
              py="$size.x3"
              bg={searchType === 'MY_ORGANIZATION' ? '$colors.primaryGreen' : '$colors.lightGray'}
              onPress={handlePressMyOrganizationSearch}
              style={{ flex: 1 }}>
              <Stack width="$fluid" flexDirection="row" justify="center" items="center" gap="$size.x2">
                <FontAwesomeIcon color={searchType === 'MY_ORGANIZATION' ? '#fff' : '#424242'} icon={faList} />
                <Text
                  fontSize="$5"
                  fontWeight="900"
                  color={searchType === 'MY_ORGANIZATION' ? '$colors.white' : '$colors.darkGray'}>
                  내 조직
                </Text>
              </Stack>
            </Button>
            <Button
              px="$size.x6"
              py="$size.x3"
              bg={searchType === 'EXPLORE_ORGANIZATION' ? '$colors.primaryGreen' : '$colors.lightGray'}
              onPress={handlePressExploreOrganizationSearch}
              style={{ flex: 1 }}>
              <Stack width="$fluid" flexDirection="row" justify="center" items="center" gap="$size.x2">
                <FontAwesomeIcon color={searchType === 'EXPLORE_ORGANIZATION' ? '#fff' : '#424242'} icon={faSearch} />
                <Text
                  fontSize="$5"
                  fontWeight="900"
                  color={searchType === 'EXPLORE_ORGANIZATION' ? '$colors.white' : '$colors.darkGray'}>
                  탐색
                </Text>
              </Stack>
            </Button>
          </Stack>
        </Stack>
        {loading ? (
          <Stack flex={1} justify="center" items="center" gap="$size.x3">
            <ActivityIndicator size="large" color="#3ABF67" />
            <Text fontSize="$6" fontWeight="$800">
              로딩 중...
            </Text>
          </Stack>
        ) : (
          <Stack flex={1} width="$fluid" gap="$size.x1">
            <Text fontSize="$5" fontWeight="$600" color="$colors.mediumGray" px="$size.x2">
              {organizationListTitle}
            </Text>

            {filteredOrganizations.length === 0 ? (
              <Stack flex={1} justify="center" items="center" gap="$size.x3">
                <Image
                  source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Unamused%20Face.png"
                  alt="Unamused Face"
                  contentFit="contain"
                  style={{ width: 100, aspectRatio: 1 }}
                />
                <Text fontSize="$8" fontWeight="900">
                  검색된 조직이 없어요!
                </Text>
              </Stack>
            ) : (
              <ScrollView flex={1} width="$fluid">
                <Stack flex={1} width="$fluid" gap="$size.x2">
                  {filteredOrganizations.map(
                    ({ organizationId, organizationName, organizationDescription, organizationMembers }) => {
                      const memberCount = organizationMembers.length;
                      return (
                        <OrganizationCardComponent
                          key={organizationId}
                          organizationId={organizationId}
                          organizationName={organizationName}
                          organizationDescription={organizationDescription}
                          organizationMemberCount={memberCount}
                          organizationImageUrl="https://picsum.photos/200/300"
                          onPressOrganizationCard={handlePressOrganizationCard(organizationId)}
                        />
                      );
                    },
                  )}
                </Stack>
              </ScrollView>
            )}
          </Stack>
        )}
      </Stack>
      <Stack position="absolute" b={insets.bottom} r={insets.right} px="$size.x5" py="$size.x3" z="$zIndex.x10">
        <Stack
          width="$fit"
          p="$size.x3"
          bg="$colors.backgroundWhite"
          boxShadow="0 4px 12px rgba(0,0,0,0.2)"
          pressStyle={{ opacity: 0.8 }}
          onPress={handlePressCreateOrganization}
          style={{
            borderRadius: 48,
          }}>
          <FontAwesomeIcon size={32} icon={faPlus} color="#00B906" />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
