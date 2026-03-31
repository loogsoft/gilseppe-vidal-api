import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { MessageRequestDto } from '../dtos/request/message-request.dto';
import { MessageResponseDto } from '../dtos/response/message-response.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() dto: MessageRequestDto): Promise<MessageResponseDto> {
    return this.messagesService.create(dto);
  }

  @Get('find-all/:companyId')
  async findAll(@Param('companyId') companyId: string): Promise<MessageResponseDto[]> {
    return this.messagesService.findAll(companyId);
  }

  @Get('companyId/:companyId/:id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string
  ): Promise<MessageResponseDto> {
    return this.messagesService.findOne(companyId, id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: MessageRequestDto): Promise<MessageResponseDto> {
    return this.messagesService.update(id, dto);
  }

  @Delete('companyId/:companyId/:id')
  async remove(
    @Param('companyId') companyId: string,
    @Param('id') id: string
  ): Promise<string> {
    return this.messagesService.remove(id, companyId);
  }
}
