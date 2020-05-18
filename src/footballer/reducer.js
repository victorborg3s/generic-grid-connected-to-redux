import { crudReducerBuilder } from '../util';
import { default as footballerActions } from './actions';

export default crudReducerBuilder(footballerActions);
