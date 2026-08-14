import type { Diagnosis } from "./types";

export const extractAndSortCodes = (diagnoses: Diagnosis[]) => {
  const allCodes = new Set(
    diagnoses.map((diagnosis) => `${diagnosis.code} — ${diagnosis.name}`),
  );
  return [...allCodes].sort((a, b) => a.localeCompare(b));
};

export const extractCodes = (diagnoses: Diagnosis[]) => {
  return diagnoses.reduce<Record<string, string>>((obj, diagnosis) => {
    obj[diagnosis.code] = diagnosis.name;
    return obj;
  }, {});
};
