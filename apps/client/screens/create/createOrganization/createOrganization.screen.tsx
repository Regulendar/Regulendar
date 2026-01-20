import { Alert, Button, Input } from '@/components';
import { supabaseAuth, useCreateOrganizationMutation } from '@/libs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const CreateOrganizationScreen = memo(() => {
  const route = useRouter();
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationDescription, setOrganizationDescription] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isCreateOrganizationFailed, setIsCreateOrganizationFailed] = useState<boolean>(false); // TODO(@Milgam06): 추후에 실패했을 때 UI 변경 필요
  const [createOrganizationMutation] = useCreateOrganizationMutation();

  const handleChangeOrganizationName = useCallback((text: string) => {
    setOrganizationName(text);
  }, []);
  const handleChangeOrganizationDescription = useCallback((text: string) => {
    setOrganizationDescription(text);
  }, []);

  const handlePressCloseAlert = useCallback(() => {
    setIsCreateOrganizationFailed(false);
  }, []);

  const handlePressCreateOrganization = useCallback(async () => {
    setIsDisabled(true);
    if (!organizationName) {
      setIsCreateOrganizationFailed(true);
      setIsDisabled(false);
      return;
    }
    const {
      data: { user },
    } = await supabaseAuth.getUser();
    if (!user) {
      setIsCreateOrganizationFailed(true);
      setIsDisabled(false);
      return;
    }
    const { errors } = await createOrganizationMutation({
      variables: {
        input: {
          ownerUserId: user.id,
          organizationName,
          organizationDescription,
        },
      },
    });
    if (errors) {
      setIsCreateOrganizationFailed(true);
      setIsDisabled(false);
      return;
    }
    route.push('/participation/participation');
  }, [createOrganizationMutation, organizationDescription, organizationName, route]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      {isCreateOrganizationFailed && (
        <Alert isOpen={isCreateOrganizationFailed} onClose={handlePressCloseAlert} alertPadding="$size.x5">
          <Stack justify="center" items="center" gap="$size.x6" pt="$size.x3">
            <Stack justify="center" items="center" gap="$size.x2">
              <Image
                source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                alt="Crying Face"
                style={{ width: 140, aspectRatio: 1 }}
              />
              <Text fontSize="$5" fontWeight="$900">
                조직 생성에 실패했습니다.
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
      <Stack flex={1} width="$fluid" justify="space-between" px="$size.x5" pt="$size.x5" pb="$size.x10" gap="$size.x8">
        <Stack gap="$size.x2">
          <Stack gap="$size.x0_25">
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              새로 생성할{' '}
              <Text fontSize="$9" fontWeight="800" color="$colors.darkGreen">
                조직의
              </Text>
            </Text>
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              정보를 입력해주세요.
            </Text>
          </Stack>
          <Text fontSize="$5" fontWeight="$900" color="$colors.mediumGray">
            *는 필수 입력 항목입니다.
          </Text>
        </Stack>
        <Stack flex={1} justify="space-between">
          <Stack width="$fluid" gap="$size.x5">
            <Input
              value={organizationName}
              onChangeText={handleChangeOrganizationName}
              w="$fluid"
              placeholder="조직 이름을 입력하세요"
              labelContent="조직 이름 *"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
            />
            <Input
              value={organizationDescription}
              onChangeText={handleChangeOrganizationDescription}
              w="$fluid"
              placeholder="조직에 대한 설명을 입력하세요"
              labelContent="조직 설명"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
            />
          </Stack>
          <Button
            px="$size.x6"
            py="$size.x3"
            bg="$colors.primaryGreen"
            pressStyle={{ bg: '$colors.primaryGreen', scale: 0.99, opacity: 0.8 }}
            disabled={isDisabled}
            onPress={handlePressCreateOrganization}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              다음으로
            </Text>
          </Button>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
