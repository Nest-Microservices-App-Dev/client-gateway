import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();
    console.log(rpcError);
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError) {
      console.log('entro if');
      const status = rpcError.status || HttpStatus.BAD_REQUEST;
      response.status(status).json(rpcError);
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,  
      message: rpcError['message'] || 'Bad Request',
    });
  }
}