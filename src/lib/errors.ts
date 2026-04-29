export type ReportErrorCode = 'INVALID_DATE_FORMAT' | 'INVALID_DATE_VALUE' | 'INVALID_DATE_RANGE';

export class ReportInputError extends Error {
  code: ReportErrorCode;
  field: 'birthDate' | 'predictDate';

  constructor(code: ReportErrorCode, field: 'birthDate' | 'predictDate', message: string) {
    super(message);
    this.code = code;
    this.field = field;
    this.name = 'ReportInputError';
  }
}
