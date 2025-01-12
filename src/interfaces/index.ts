export interface ErrorResponse {
  response?: {
    data: {
      messages?: { [key: string]: string };
      message?: string;
    };
  };
}
