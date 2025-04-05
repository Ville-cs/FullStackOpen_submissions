import { EntryWithoutId } from '../types';
import {
  healthCheckSchema,
  hospitalSchema,
  occupationalHealthcareSchema,
} from './newPatientSchema';

export const parseEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('data missing');
  }
  if ('type' in object && object.type === 'Hospital') {
    return hospitalSchema.parse(object);
  } else if ('type' in object && object.type === 'HealthCheck') {
    return healthCheckSchema.parse(object);
  } else if ('type' in object && object.type === 'OccupationalHealthcare') {
    return occupationalHealthcareSchema.parse(object);
  }
  console.log('try');
  throw new Error('malformatted data for new entry');
};
