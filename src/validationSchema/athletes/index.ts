import * as yup from 'yup';

export const athleteValidationSchema = yup.object().shape({
  effort: yup.number().integer().required(),
  recovery: yup.number().integer().required(),
  sleep_quality: yup.number().integer().required(),
  training_perception: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  team_id: yup.string().nullable(),
});
