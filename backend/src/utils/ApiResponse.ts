interface Props<T> {
  statusCode: number;
  message: string;
  data: T;
}
class ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;

  constructor(props: Props<T>) {
    this.statusCode = props.statusCode;
    this.message = props.message;
    this.data = props.data;
    this.success = props.statusCode < 400;
  }
}

export { ApiResponse };
