import { Alert, Button, Input } from '@/components';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Sheet, Stack, Text } from 'tamagui';
import { Platform } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { useCreateNewEventMutation } from '@/libs';
import { useUserStore } from '@/stores';

type IDateTimePickerProps = {
  type: 'date' | 'time';
  value: Date;
  isShow: boolean;
  onPressShow: () => void;
  onClose: () => void;
  onChangeUpdate: (event: DateTimePickerEvent, date?: Date) => void;
};

type ICreateEventScreenProps = {
  organizationId: string;
};

const DateTimePicker = memo<IDateTimePickerProps>(
  ({ type = 'time', value, isShow, onPressShow, onClose, onChangeUpdate }) => {
    const isPlatformAndroid = Platform.OS === 'android';
    const isTypeDate = type === 'date';
    const labelContent = isTypeDate ? '날짜' : '시간';
    const dateTimeContext = isTypeDate
      ? value.toLocaleDateString('ko-KR')
      : value.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    return (
      <Stack width="$fluid" justify="center" items="flex-start" gap="$size.x1">
        <Stack
          width="$fluid"
          flexDirection="row"
          justify="space-between"
          items="center"
          p="$size.x3"
          borderWidth={1}
          borderColor="$colors.lightGray"
          gap="$size.x3"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
          style={{ borderRadius: 12 }}>
          <Stack
            width="$fit"
            justify="center"
            items="center"
            aspectRatio={1}
            p="$size.x3"
            bg="$colors.primaryGreen"
            style={{ borderRadius: 16 }}>
            <FontAwesomeIcon size={30} icon={isTypeDate ? faCalendar : faClock} color="#EAF8F0" />
          </Stack>
          <Stack flex={1} justify="center">
            <Text fontSize="$4" fontWeight="$500" color="$colors.darkGray">
              {labelContent}
            </Text>
            <Text fontSize="$7" fontWeight="$700" color="$colors.darkGray">
              {dateTimeContext}
            </Text>
          </Stack>
          <Stack p="$size.x2" onPress={onPressShow}>
            <FontAwesomeIcon size={20} icon={faArrowRight} color="#888888" />
          </Stack>
        </Stack>
        {isPlatformAndroid ? (
          isShow && <RNDateTimePicker value={value} mode={type} display="spinner" onChange={onChangeUpdate} />
        ) : (
          <Sheet
            modal
            open={isShow}
            onOpenChange={(open: boolean) => !open && onClose()}
            snapPoints={[32]}
            dismissOnSnapToBottom
            animation="quick">
            <Sheet.Overlay
              animation="medium"
              enterStyle={{ opacity: 1 }}
              exitStyle={{ opacity: 0 }}
              bg="rgba(0,0,0,0.4)"
            />
            <Sheet.Frame
              p="$size.x4"
              items="center"
              justify="center"
              bg="$colors.softGreen"
              borderTopLeftRadius="$size.x3"
              borderTopRightRadius="$size.x3">
              {isShow && (
                <RNDateTimePicker
                  value={value}
                  mode={type}
                  display="spinner"
                  textColor="#3ABF67"
                  onChange={onChangeUpdate}
                />
              )}
            </Sheet.Frame>
          </Sheet>
        )}
      </Stack>
    );
  },
);

export const CreateEventScreen = memo(({ organizationId }: ICreateEventScreenProps) => {
  const { userId } = useUserStore();
  const [eventTitle, setEventTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState<boolean>(false);
  const [isCreateEventError, setIsCreateEventError] = useState<boolean>(false);
  const [createNewEventMutation] = useCreateNewEventMutation();

  const handleChangeEventTitle = useCallback((text: string) => {
    setEventTitle(text);
  }, []);

  const handleShowDatePicker = useCallback(() => {
    setIsShowDatePicker(true);
  }, []);

  const handleShowTimePicker = useCallback(() => {
    setIsShowTimePicker(true);
  }, []);

  const handleCloseDatePicker = useCallback(() => {
    setIsShowDatePicker(false);
  }, []);

  const handleCloseTimePicker = useCallback(() => {
    setIsShowTimePicker(false);
  }, []);

  const handleDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setIsShowDatePicker(false);
    const isDateUpdated = event.type === 'set' && selectedDate;
    if (isDateUpdated) {
      setDateTime((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
        return newDate;
      });
    }
  }, []);

  const handleTimeChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setIsShowTimePicker(false);
    const isTimeUpdated = event.type === 'set' && selectedDate;
    if (isTimeUpdated) {
      setDateTime((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        return newDate;
      });
    }
  }, []);

  const handlePressCloseAlert = useCallback(() => {
    setIsCreateEventError(false);
  }, []);

  const handlePressCreateEvent = useCallback(async () => {
    const { errors: createEventErrors } = await createNewEventMutation({
      variables: {
        input: {
          eventTitle,
          eventStartAt: dateTime,
          eventDuration: 0,
          hostOrganizationId: organizationId,
          hostUserId: userId,
        },
      },
    });
    if (createEventErrors) {
      setIsCreateEventError(true);
      return;
    }
  }, [createNewEventMutation, dateTime, eventTitle, organizationId, userId]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" justify="space-between" px="$size.x5" pt="$size.x5" pb="$size.x10" gap="$size.x8">
        {isCreateEventError && (
          <Alert isOpen={isCreateEventError} onClose={handlePressCloseAlert} alertPadding="$size.x5">
            <Stack justify="center" items="center" gap="$size.x6" pt="$size.x3">
              <Stack justify="center" items="center" gap="$size.x2">
                <Image
                  source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                  alt="Crying Face"
                  style={{ width: 140, aspectRatio: 1 }}
                />
                <Text fontSize="$5" fontWeight="$900">
                  이벤트 생성에 실패했습니다.
                </Text>
              </Stack>
              <Button
                px="$size.x1"
                py="$size.x2"
                bg="$colors.errorRed"
                fontSize="$7"
                fontWeight="$600"
                color="$colors.backgroundWhite"
                pressStyle={{ bg: '$colors.errorRed', opacity: 0.8 }}
                onPress={handlePressCloseAlert}>
                확인했어요
              </Button>
            </Stack>
          </Alert>
        )}
        <Stack gap="$size.x1">
          <Stack gap="$size.x0_25">
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              열고 싶은{' '}
              <Text fontSize="$9" fontWeight="800" color="$colors.darkGreen">
                이벤트
              </Text>
              가
            </Text>
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              있으신가요?
            </Text>
          </Stack>
          <Text fontSize="$5" fontWeight="$900" color="$colors.mediumGray">
            *는 필수 입력 항목입니다.
          </Text>
        </Stack>
        <Stack flex={1} justify="space-between">
          <Stack width="$fluid" gap="$size.x5">
            <Stack
              width="$fluid"
              p="$size.x3"
              borderWidth={1}
              borderColor="$colors.lightGray"
              gap="$size.x3"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
              style={{ borderRadius: 12 }}>
              <Input
                value={eventTitle}
                onChangeText={handleChangeEventTitle}
                w="$fluid"
                placeholder="이벤트 이름을 입력하세요"
                labelContent="이벤트 이름 *"
                labelFontColor="$colors.mediumGray"
                size="$x12"
                fontSize="$8"
                px="$size.x2"
                borderWidth={0}
                fontWeight="500"
              />
            </Stack>
            <Stack width="$fluid" flexDirection="row" items="center" gap="$size.x2">
              <DateTimePicker
                value={dateTime}
                type="date"
                isShow={isShowDatePicker}
                onPressShow={handleShowDatePicker}
                onClose={handleCloseDatePicker}
                onChangeUpdate={handleDateChange}
              />
            </Stack>
            <Stack width="$fluid" flexDirection="row" items="center" gap="$size.x2">
              <DateTimePicker
                value={dateTime}
                type="time"
                isShow={isShowTimePicker}
                onPressShow={handleShowTimePicker}
                onClose={handleCloseTimePicker}
                onChangeUpdate={handleTimeChange}
              />
            </Stack>
          </Stack>
          <Button
            px="$size.x6"
            py="$size.x3"
            bg="$colors.primaryGreen"
            pressStyle={{ bg: '$colors.primaryGreen', scale: 0.99, opacity: 0.8 }}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              다음으로
            </Text>
          </Button>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
