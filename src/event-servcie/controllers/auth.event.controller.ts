import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

// interface IKafkaMessage<T> {
//   topic: string;
//   partition: number;
//   timestamp: string;
//   size: number;
//   attributes: number;
//   offset: string;
//   key: any;
//   value: T;
//   headers: Record<string, any>;
// }

@Controller()
export class AuthEventController {
  @MessagePattern('get.products.list')
  getPosts(@Payload() data: number[], @Ctx() context: RmqContext) {
    const message = context.getMessage();
    console.log(message.content.toString());
    return message;
  }

  // @MessagePattern('add.new.post')
  // addPost(@Payload() message: IKafkaMessage<any>) {
  //   console.log(message);
  //   // return this.postsService.addPost(message.value);

  //   return JSON.stringify(message);
  // }
}
