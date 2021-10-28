import { 
  Controller, 
  Get, 
  Res, 
  HttpStatus, 
  Param, 
  NotFoundException, 
  Post, 
  Body, 
  Query, 
  Put, 
  Delete  
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreateDataDTO } from './dto/create-data.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {

  }

  @Get('getDatas')
  async getDatas(@Res() res) {
    const datas = await this.planService.getDatas();
    return res.status(HttpStatus.OK).json(datas);
  }

  @Get('getDataById')
  async getData(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const data = await this.planService.getData(id);
    if (!data) throw new NotFoundException('data does not exist!');
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('addData')
  async addData(@Res() res, @Body() createDataDTO: CreateDataDTO) {
    const newData = await this.planService.addData(createDataDTO);
    return res.status(HttpStatus.OK).json({
      message: "data has been submitted successfully!",
      data: newData
    })
  }

  @Put('/editData')
  async editData(
    @Res() res,
    @Query('id', new ValidateObjectId()) id,
    @Body() createDataDTO: CreateDataDTO
  ) {
    const editedData = await this.planService.editData(id, createDataDTO);
    if (!editedData) throw new NotFoundException('data does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'data has been successfully updated',
      data: editedData
    })
  }

  @Delete('/deleteData')
  async deleteData(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const deleteData = await this.planService.deleteData(id);
    if (!deleteData) throw new NotFoundException('data does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'data has been deleted!',
      data: deleteData
    })
  }
}
