import type { Diagnosis } from "../../types";

import { extractCodes } from "../../utils";

type Props = {
  diagnosisCodes: string[];
  diagnoses: Diagnosis[];
};

const EntryCodes = ({ diagnosisCodes, diagnoses }: Props) => {
  const allCodes = extractCodes(diagnoses);
  if (!diagnosisCodes) return;
  return (
    <ul>
      {diagnosisCodes.map((code) => (
        <li key={code}>
          {code} {allCodes[code]}
        </li>
      ))}
    </ul>
  );
};

export default EntryCodes;
