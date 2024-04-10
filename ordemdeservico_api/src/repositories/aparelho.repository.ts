import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Aparelho, AparelhoRelations} from '../models';

export class AparelhoRepository extends DefaultCrudRepository<
  Aparelho,
  typeof Aparelho.prototype.id,
  AparelhoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Aparelho, dataSource);
  }
}
