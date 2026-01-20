import { Button, Input } from '@/components';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Label, Sheet, Stack, Text } from 'tamagui';
import { Platform } from 'react-native';

type IDateTimePickerProps = {
  type: 'date' | 'time';
  value: Date;
  isShow: boolean;
  onPressShow: () => void;
  onClose: () => void;
  onChangeUpdate: (event: DateTimePickerEvent, date?: Date) => void;
};

const DateTimePicker = memo<IDateTimePickerProps>(
  ({ type = 'time', value, isShow, onPressShow, onClose, onChangeUpdate }) => {
    const isPlatformAndroid = Platform.OS === 'android';

    const labelContent = type === 'date' ? '날짜 선택' : '시간 선택';
    const dateTimeContent =
      type === 'date'
        ? value.toLocaleDateString('ko-KR')
        : value.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

    return (
      <Stack width="$fluid" justify="center" items="flex-start" gap="$size.x1">
        <Label width="$fit" px="$size.x2" fontSize="$4" fontWeight="$600" lineHeight="$1">
          {labelContent} *
        </Label>
        <Stack width="$fluid" items="center" flexDirection="row" justify="space-between" gap="$size.x5">
          <Stack
            flex={1}
            width="$fluid"
            px="$size.x3"
            py="$size.x2"
            bg="$colors.backgroundWhite"
            borderWidth={1}
            borderColor="$colors.mediumGray"
            style={{ borderRadius: 8 }}>
            <Text fontSize="$5" fontWeight="700" color="$colors.darkGray">
              {dateTimeContent}
            </Text>
          </Stack>
          <Button
            isFullWidth={false}
            px="$size.x6"
            py="$size.x2"
            bg="$colors.primaryGreen"
            pressStyle={{ bg: '$colors.primaryGreen', scale: 0.99, opacity: 0.8 }}
            onPress={onPressShow}>
            <Text fontSize="$5" fontWeight="700" color="$colors.white">
              선택
            </Text>
          </Button>
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

export const CreateEventScreen = memo(() => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState<boolean>(false);

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
    if (event.type === 'set' && selectedDate) {
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
    if (event.type === 'set' && selectedDate) {
      setDateTime((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        return newDate;
      });
    }
  }, []);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" justify="space-between" px="$size.x5" pt="$size.x5" pb="$size.x10" gap="$size.x8">
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
            <Input
              value={eventTitle}
              onChangeText={handleChangeEventTitle}
              w="$fluid"
              placeholder="이벤트 이름을 입력하세요"
              labelContent="이벤트 이름 *"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
            />
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
