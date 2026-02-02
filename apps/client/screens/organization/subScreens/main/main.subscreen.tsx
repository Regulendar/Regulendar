import { Button } from '@/components';
import { EventStatus, useGetEventsByMonthLazyQuery, useGetMyScheduledEventsLazyQuery } from '@/libs';
import { useUserStore } from '@/stores';
import { getScreenSize } from '@/utils';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDidMount } from 'rooks';
import { ScrollView, Stack, Text } from 'tamagui';
import { DAY_OF_WEEK } from '@/const';

type IOrganizationMainSubScreenProps = {
  organizationId: string;
};

type IScheduledEvent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventStartAt: Date;
  eventDateDay: number;
  eventStatus: EventStatus;
  eventParticipations: { userId: string }[];
};

type IParticipatedEventCardComponent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventStartAt: Date;
  eventDateDay: number;
  eventParticipations: { userId: string }[];
};

type IRecommendedEventCardComponent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventDateYear: number;
  eventDateMonth: number;
  eventDateDay: number;
};

export const OrganizationMainSubScreen = memo<IOrganizationMainSubScreenProps>(({ organizationId }) => {
  const { windowWidth } = getScreenSize();
  const { userId } = useUserStore();
  const [participationRate, setParticipationRate] = useState<number>(0);
  const [scheduledEvents, setScheduledEvents] = useState<IScheduledEvent[]>([]);
  const [getMyScheduledEventsQuery, { loading: isLoadingMyScheduledEvents }] = useGetMyScheduledEventsLazyQuery();
  const [getEventsByMonthQuery] = useGetEventsByMonthLazyQuery();
  const currentMonth = new Date().getMonth() + 1;

  const ParticipatedEventCardComponent = memo<IParticipatedEventCardComponent>(
    ({ eventId, eventTitle, eventDuration, eventDateDay, eventStartAt, eventParticipations }) => {
      const eventDate = new Date(eventStartAt);
      const eventDayOfWeek = DAY_OF_WEEK[eventDate.getDay()];
      console.log(eventDate.getDay());
      const eventStartAtHours = eventDate.getHours().toString().padStart(2, '0');
      const eventStartAtMinutes = eventDate.getMinutes().toString().padStart(2, '0');
      const eventStartTime = `${eventStartAtHours}:${eventStartAtMinutes}`;
      const handlePressDetails = useCallback(() => {
        // TODO(@Milgam06) Navigate to event details screen
        console.log('Details pressed for event:', eventId);
      }, [eventId]);
      return (
        <Stack width={windowWidth} justify="center" items="center" py="$size.x3" px="$size.x4">
          <Stack
            width="$fluid"
            flexDirection="row"
            justify="space-between"
            boxShadow="0 0 12px rgba(0, 0, 0, 0.2)"
            overflow="hidden"
            style={{ borderRadius: 12 }}>
            <Stack width="$fit" bg="$colors.fillGreen" items="center" px="$size.x4" py="$size.x3" gap="$size.x2">
              <Stack flex={1} justify="space-between" items="center">
                <Stack width="$fluid" justify="center" items="center">
                  <Text fontSize="$9" fontWeight="800" color="$colors.backgroundWhite">
                    {eventDateDay}
                  </Text>
                  <Text fontSize="$7" fontWeight="700" color="$colors.backgroundWhite">
                    {eventDayOfWeek}
                  </Text>
                </Stack>
                <Text fontSize="$4" fontWeight="$600" color="$colors.backgroundWhite">
                  {eventStartTime}
                </Text>
              </Stack>
            </Stack>
            <Stack flex={1} p="$size.x4" gap="$size.x3">
              <Stack width="$fluid" justify="center" gap="$size.x1">
                <Text
                  fontSize="$8"
                  fontWeight="900"
                  color="$colors.backgroundBlack"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {eventTitle}
                </Text>
                <Stack flexDirection="row" gap="$size.x1" items="center">
                  <FontAwesomeIcon icon={faUserGroup} color="#888888" />
                  <Text fontSize="$6" fontWeight="700" color="$colors.mediumGray">
                    {eventParticipations.length}명
                  </Text>
                </Stack>
              </Stack>
              <Button
                isFullWidth={false}
                px="$size.x3"
                py="$size.x1_5"
                bg="$colors.fillGreen"
                onPress={handlePressDetails}>
                <FontAwesomeIcon size={20} icon={faInfoCircle} color="#f5f5f5" />
                <Text fontSize="$6" fontWeight="800" color="$colors.backgroundWhite">
                  Details
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      );
    },
  );

  const RecommendedEventCardComponent = memo<IRecommendedEventCardComponent>(
    ({ eventId, eventTitle, eventDuration, eventDateYear, eventDateMonth, eventDateDay }) => {
      const handlePressRecommendedEventCard = useCallback(() => {
        // TODO(@Milgam06) Navigate to recommended event details screen
        console.log('Recommended Event Card pressed for event:', eventId);
      }, [eventId]);
      return (
        <Stack
          key={eventId}
          width="$fluid"
          p="$size.x2"
          flexDirection="row"
          borderWidth="$size.x0_5"
          borderColor="$colors.primaryGreen"
          bg="$colors.backgroundWhite"
          gap="$size.x2"
          pressStyle={{ opacity: 0.8 }}
          onPress={handlePressRecommendedEventCard}
          style={{ borderRadius: 8 }}>
          <Stack
            px="$size.x2"
            py="$size.x1"
            bg="$colors.primaryGreen"
            justify="center"
            items="center"
            style={{ borderRadius: 4 }}>
            <Text fontSize="$8" fontWeight="700" color="$colors.backgroundWhite">
              {eventDateDay}
            </Text>
            <Text fontSize="$8" fontWeight="700" color="$colors.backgroundWhite">
              Wed
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="$8" fontWeight="900" color="$colors.backgroundBlack">
              {eventTitle}
            </Text>
            <Text fontSize="$4" fontWeight="600" color="$colors.backgroundBlack">
              소요시간: {eventDuration}
            </Text>
          </Stack>
        </Stack>
      );
    },
  );

  const fetchMyScheduledEvents = useCallback(async () => {
    const { data: scheduledEventsData, error } = await getMyScheduledEventsQuery({
      variables: {
        input: {
          organizationId,
          eventDateMonth: currentMonth,
          eventStatus: EventStatus.Scheduled,
        },
      },
    });
    const hasScheduledEvents = scheduledEventsData && !error;
    if (!hasScheduledEvents) {
      console.log('No scheduled events found or error occurred:', error);
      return;
    }
    setScheduledEvents(scheduledEventsData.getEvents.events);
  }, [currentMonth, getMyScheduledEventsQuery, organizationId]);

  const calculateParticipationRate = useCallback(async () => {
    const { data: eventsInThisMonthData, error: eventsInThisMonthError } = await getEventsByMonthQuery({
      variables: {
        input: {
          eventDateMonth: currentMonth,
          organizationId,
        },
      },
    });
    if (!eventsInThisMonthData || eventsInThisMonthError) {
      setParticipationRate(0);
      return;
    }
    const totalEventsCount = eventsInThisMonthData.getEvents.events.length;
    if (totalEventsCount === 0) {
      setParticipationRate(0);
      return;
    }

    const { data: participatedEventsData, error: participatedError } = await getMyScheduledEventsQuery({
      variables: {
        input: {
          eventDateMonth: currentMonth,
          organizationId,
          userId,
        },
      },
    });

    if (!participatedEventsData || participatedError) {
      setParticipationRate(0);
      return;
    }

    const participatedEventsCount = participatedEventsData.getEvents.events.length;
    const rate = Math.round((participatedEventsCount / totalEventsCount) * 100);
    setParticipationRate(rate);
  }, [currentMonth, getEventsByMonthQuery, getMyScheduledEventsQuery, organizationId, userId]);

  useDidMount(async () => {
    await fetchMyScheduledEvents();
    await calculateParticipationRate();
  });

  return (
    <ScrollView flex={1} width="$fluid">
      <Stack flex={1} width="$fluid" py="$size.x2" gap="$size.x5">
        <Stack gap="$size.x2">
          <Stack px="$size.x5" flexDirection="row" gap="$size.x2" items="flex-end">
            <Text fontSize="$6" fontWeight="900">
              이번 달 참여 이벤트
            </Text>
            {scheduledEvents.length > 0 && (
              <Text fontSize="$4" fontWeight="700" color="$colors.primaryGreen">
                {scheduledEvents.length}개 예정
              </Text>
            )}
          </Stack>
          {isLoadingMyScheduledEvents ? (
            <Stack width={windowWidth} justify="center" items="center" px="$size.x4">
              <Stack
                width="$fluid"
                justify="center"
                items="center"
                py="$size.x6"
                borderWidth={1}
                borderColor="$colors.mediumGray"
                gap="$size.x4"
                style={{ borderRadius: 12 }}>
                <ActivityIndicator size="small" color="#3ABF67" />
                <Text fontSize="$5" fontWeight="$800">
                  로딩 중...
                </Text>
              </Stack>
            </Stack>
          ) : scheduledEvents.length > 0 ? (
            <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {scheduledEvents.map((event) => {
                console.log('Rendering scheduled event:', event);
                return (
                  <ParticipatedEventCardComponent
                    key={event.eventId}
                    eventDateDay={event.eventDateDay}
                    eventStartAt={event.eventStartAt}
                    eventDuration={event.eventDuration}
                    eventId={event.eventId}
                    eventTitle={event.eventTitle}
                    eventParticipations={event.eventParticipations}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              <Stack width={windowWidth} justify="center" items="center" px="$size.x4" py="$size.x3">
                <Stack
                  width="$fluid"
                  justify="center"
                  items="center"
                  py="$size.x5"
                  gap="$size.x3"
                  bg="$colors.lightGray"
                  boxShadow="0 0 12px rgba(0,0,0,0.2)"
                  style={{ borderRadius: 12 }}>
                  <FontAwesomeIcon icon={faPlus} />
                  <Text fontSize="$5" fontWeight="$600">
                    예정된 참여 이벤트가 없어요.
                  </Text>
                </Stack>
              </Stack>
            </ScrollView>
          )}
        </Stack>
        <Stack gap="$size.x2" justify="center" items="center">
          <Stack width="$fluid" px="$size.x5">
            <Text fontSize="$6" fontWeight="900">
              활동
            </Text>
          </Stack>
          <Stack width="$fluid" flexDirection="row" justify="space-between" px="$size.x3" gap="$size.x2">
            {/* <Stack
              flex={1}
              aspectRatio={1}
              justify="center"
              items="center"
              py="$size.x3"
              bg="$colors.primaryGreen"
              gap="$size.x0_5"
              style={{ borderRadius: 12 }}>
              <Text fontSize="$13" fontWeight="700" color="$colors.backgroundWhite">
                80%
              </Text>
              <Text fontSize="$6" fontWeight="900" color="$colors.backgroundWhite">
                이번 달 참여율
              </Text>
            </Stack> */}
            <Stack></Stack>
            <Stack
              flex={1}
              aspectRatio={1}
              justify="center"
              items="center"
              py="$size.x3"
              bg="$colors.backgroundWhite"
              gap="$size.x3"
              borderWidth={1}
              borderColor="$colors.primaryGreen"
              style={{ borderRadius: 12 }}>
              <Image
                source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thinking%20Face.png"
                alt="Thinking Face"
                contentFit="contain"
                style={{ width: 100, aspectRatio: 1 }}
              />
              <Text fontSize="$5" fontWeight="900" color="$colors.primaryGreen">
                아직 게시물이 없어요!
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap="$size.x2">
          <Stack px="$size.x5">
            <Text fontSize="$6" fontWeight="900">
              이런 이벤트는 어때요?
            </Text>
          </Stack>

          <Stack px="$size.x3" gap="$size.x2">
            <RecommendedEventCardComponent
              eventDateDay={25}
              eventDateMonth={9}
              eventDateYear={2025}
              eventDuration={45}
              eventTitle="환경 보호 캠페인"
              eventId="101"
            />
          </Stack>
        </Stack>
      </Stack>
    </ScrollView>
  );
});
