import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { CoffeeShipmentsService } from './coffee-shipment.service';
import { CoffeeShipment } from './entities/coffee-shipment.entity';
import { UpdateHolderDto } from './dto/update-holder.dto';

@ApiTags('coffee-shipments')
@ApiBearerAuth()
@Controller({ version: '1', path: 'coffee-shipments' })
export class CoffeeShipmentsController {
  constructor(
    private readonly coffeeShipmentsService: CoffeeShipmentsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a coffee shipment' })
  @ApiResponse({
    status: 201,
    description: 'The coffee shipment has been created',
  })
  @ApiBody({
    type: CoffeeShipment,
    description: 'The coffee shipment to create',
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Body() shipment: Partial<CoffeeShipment>, @Request() { user }) {
    // generate uuid for shipment id
    shipment.shipmentId = uuidv4();
    shipment.currentHolderId = user.id;
    return this.coffeeShipmentsService.create(shipment);
  }

  @ApiOperation({ summary: 'Get all coffee shipments' })
  @ApiResponse({
    status: 200,
    description: 'The coffee shipments have been retrieved',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<CoffeeShipment[]> {
    return this.coffeeShipmentsService.findAll();
  }

  @ApiOperation({ summary: 'Update a coffee shipment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coffee shipment has been updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The coffee shipment with the given ID was not found',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the coffee shipment to update',
  })
  @ApiBody({
    type: CoffeeShipment,
    description: 'The updated coffee shipment details',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() shipment: Partial<CoffeeShipment>,
  ): Promise<CoffeeShipment> {
    return this.coffeeShipmentsService.update(id, shipment);
  }

  @ApiOperation({ summary: 'Delete a coffee shipment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coffee shipment has been deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The coffee shipment with the given ID was not found',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the coffee shipment to delete',
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.coffeeShipmentsService.delete(id);
  }

  @ApiOperation({
    summary: 'Update the holder and status of a coffee shipment by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The coffee shipment holder and status have been updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The coffee shipment with the given ID was not found',
  })
  @ApiParam({
    name: 'id',
    description:
      'The ID of the coffee shipment to update the holder and status',
  })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/holder')
  updateHolderAndStatus(
    @Param('id') id: number,
    @Body() updateHolderDto: UpdateHolderDto,
  ): Promise<CoffeeShipment> {
    return this.coffeeShipmentsService.updateHolderAndStatus(
      id,
      updateHolderDto.holderId,
      updateHolderDto.status,
    );
  }

  @ApiOperation({ summary: 'Search for coffee shipments' })
  @ApiResponse({
    status: 200,
    description: 'The search results have been retrieved',
  })
  @ApiQuery({
    name: 'where',
    required: false,
    description: 'Search conditions (e.g., where[origin]=Rwanda)',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Number of records to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Number of records to return for pagination',
  })
  @Get('search')
  @Get('search')
  search(
    @Query() options: FindManyOptions<CoffeeShipment>,
  ): Promise<CoffeeShipment[]> {
    return this.coffeeShipmentsService.search(options);
  }

  @ApiOperation({ summary: 'Get a coffee shipment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coffee shipment has been retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'The coffee shipment with the given ID was not found',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the coffee shipment to retrieve',
  })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<CoffeeShipment> {
    return this.coffeeShipmentsService.findOne(id);
  }
}
