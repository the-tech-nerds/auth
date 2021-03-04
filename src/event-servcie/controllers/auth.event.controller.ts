import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { json } from 'express';

interface IKafkaMessage<T> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}

@Controller()
export class AuthEventController {
  @MessagePattern('get.posts.list')
  getPosts() {
    // return this.postsService.getList();
    return 'ok';
  }

  @MessagePattern('add.new.post')
  addPost(@Payload() message: IKafkaMessage<any>) {
    console.log(message);
    // return this.postsService.addPost(message.value);

    return JSON.stringify(message);
  }
}
