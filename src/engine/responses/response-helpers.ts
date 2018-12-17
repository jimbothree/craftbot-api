export function ResponseCodeToErrorMessage(area: number, code: number) {
  switch (area) {
    case 6:
    {
      switch (code) {
        case 5: return 'Request timed out';
        case 8: return 'Hit rate limit';

        default: return 'Area 6, unknown code';
      }
    }

    case 8:
    {
      switch (code) {
        case 1: return 'Not Connected to chat';
        case 2: return 'Bad request';

        default: return 'Area 8, unknown code';
      }
    }

    default: return 'Unknown area';
  }
}
