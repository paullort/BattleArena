/*import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Objects} from '../models';
import {ObjectRepository, HealObjectRepository, IncreaseObjectRepository, MovementObjectRepository, ProtectionObjectRepository} from '../repositories';
import {privateDecrypt} from 'crypto';

export class ObjectsController {
  constructor(
    @repository(ObjectRepository) private objectRepository : ObjectRepository,
    @repository(HealObjectRepository) private healRepository : HealObjectRepository,
    @repository(IncreaseObjectRepository) private increaseRepository : IncreaseObjectRepository,
    @repository(MovementObjectRepository) private movementRepository : MovementObjectRepository,
    @repository(ProtectionObjectRepository) private protectionRepository: ProtectionObjectRepository
  ) {}

  @post('/objects')
  @response(200, {
    description: 'Object model instance',
    content: {'application/json': {schema: getModelSchemaRef(Object)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Object, {
            title: 'NewObject',

          }),
        },
      },
    })
    object: Objects,
  ): Promise<Objects> {
    return this.objectRepository.create(object);
  }

  @get('/objects/count')
  @response(200, {
    description: 'Object model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Objects) where?: Where<Objects>,
  ): Promise<Count> {
    return this.objectRepository.count(where);
  }

  @get('/objects')
  @response(200, {
    description: 'Array of Object model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          //items: getModelSchemaRef(Objects, {includeRelations: true}),
        },
      },
    },
  })
  async findObjectsWithChildsInfo():Promise<any>{

    const objects = await this.objectRepository.find({
      include: [
        { relation: 'HealObjects' },
        { relation: 'MovementObjects' },
        { relation: 'IncreaseObjects' },
        { relation: 'ProtectionObjects' },
      ],});{}


    let finalObjects: any[] = [];

    objects.forEach(async(object) =>{

      console.log(object.type, object.object_ID);
      let typeInfo : any;
      switch (object.type){
        case "heal":
          //typeInfo = await this.healRepository.findById(object.object_ID);
          console.log("heal");
          break;

        case "increase":
          //typeInfo = await this.increaseRepository.findById(object.object_ID);
          console.log("increase");
          break;

        case "protection":
          //typeInfo = await this.protectionRepository.findById(object.object_ID);
          console.log("protection");
          break;

        case "movement":
          //typeInfo = await this.movementRepository.findById(object.object_ID);
          console.log("movement");
          break;

      }

      const combinedInfo = {
        objectInfo: object,
        childInfo: typeInfo,
      };

      finalObjects.push(combinedInfo);

    });

    return finalObjects; return objects;

  }




  @get('/objects/{id}')
  @response(200, {
    description: 'Object model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Objects, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Objects, {exclude: 'where'}) filter?: FilterExcludingWhere<Objects>
  ): Promise<Objects> {
    return this.objectRepository.findById(id, filter);
  }


}*/
