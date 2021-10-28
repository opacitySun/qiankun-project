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
import { ExampleService } from './example.service';
import { CreateExampleDTO } from './dto/create-example.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('example')
export class ExampleController {
  constructor(private exampleService: ExampleService) {

  }

  @Get('getExamples')
  async getExamples(@Res() res) {
    const examples = await this.exampleService.getExamples();
    return res.status(HttpStatus.OK).json(examples);
  }

  @Get('getExample')
  async getExample(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const example = await this.exampleService.getExample(id);
    if (!example) throw new NotFoundException('Example does not exist!');
    return res.status(HttpStatus.OK).json(example);
  }

  @Post('addExample')
  async addExample(@Res() res, @Body() createExampleDTO: CreateExampleDTO) {
    const newExample = await this.exampleService.addExample(createExampleDTO);
    return res.status(HttpStatus.OK).json({
      message: "Example has been submitted successfully!",
      data: newExample
    })
  }

  @Put('/editExample')
  async editExample(
    @Res() res,
    @Query('id', new ValidateObjectId()) id,
    @Body() createExampleDTO: CreateExampleDTO
  ) {
    const editedExample = await this.exampleService.editExample(id, createExampleDTO);
    if (!editedExample) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      data: editedExample
    })
  }

  @Delete('/deleteExample')
  async deleteExample(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const deletedExample = await this.exampleService.deleteExample(id);
    if (!deletedExample) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      data: deletedExample
    })
  }
}
