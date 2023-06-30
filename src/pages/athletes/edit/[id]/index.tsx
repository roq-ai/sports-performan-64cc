import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAthleteById, updateAthleteById } from 'apiSdk/athletes';
import { Error } from 'components/error';
import { athleteValidationSchema } from 'validationSchema/athletes';
import { AthleteInterface } from 'interfaces/athlete';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';
import { getUsers } from 'apiSdk/users';
import { getTeams } from 'apiSdk/teams';

function AthleteEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AthleteInterface>(
    () => (id ? `/athletes/${id}` : null),
    () => getAthleteById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AthleteInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAthleteById(id, values);
      mutate(updated);
      resetForm();
      router.push('/athletes');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AthleteInterface>({
    initialValues: data,
    validationSchema: athleteValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Athlete
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="effort" mb="4" isInvalid={!!formik.errors?.effort}>
              <FormLabel>Effort</FormLabel>
              <NumberInput
                name="effort"
                value={formik.values?.effort}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('effort', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.effort && <FormErrorMessage>{formik.errors?.effort}</FormErrorMessage>}
            </FormControl>
            <FormControl id="recovery" mb="4" isInvalid={!!formik.errors?.recovery}>
              <FormLabel>Recovery</FormLabel>
              <NumberInput
                name="recovery"
                value={formik.values?.recovery}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('recovery', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.recovery && <FormErrorMessage>{formik.errors?.recovery}</FormErrorMessage>}
            </FormControl>
            <FormControl id="sleep_quality" mb="4" isInvalid={!!formik.errors?.sleep_quality}>
              <FormLabel>Sleep Quality</FormLabel>
              <NumberInput
                name="sleep_quality"
                value={formik.values?.sleep_quality}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('sleep_quality', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.sleep_quality && <FormErrorMessage>{formik.errors?.sleep_quality}</FormErrorMessage>}
            </FormControl>
            <FormControl id="training_perception" mb="4" isInvalid={!!formik.errors?.training_perception}>
              <FormLabel>Training Perception</FormLabel>
              <NumberInput
                name="training_perception"
                value={formik.values?.training_perception}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('training_perception', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.training_perception && (
                <FormErrorMessage>{formik.errors?.training_perception}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<TeamInterface>
              formik={formik}
              name={'team_id'}
              label={'Select Team'}
              placeholder={'Select Team'}
              fetcher={getTeams}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'athlete',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AthleteEditPage);
