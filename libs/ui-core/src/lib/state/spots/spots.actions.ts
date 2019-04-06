import {Action} from '@ngrx/store';
import {LayerType} from '@slackmap/core';
import {LoadHashResponse} from '@slackmap/core/api';

export enum SpotsActionTypes {
  HASH_LOAD = '[Spots] Hash Load',
  HASH_LOADING = '[Spots] Hash Loading',
  HASH_STORAGE_SUCCESS = '[Spots] Hash Storage Success',
  HASH_REQUEST_SUCCESS = '[Spots] Hash Request Success',
  HASH_REQUEST_ERROR = '[Spots] Hash Request error',
  HASH_CLEAR = '[Spots] Hash Clear',
  HASH_NO_CONNECTION = '[Spots] Hash No Connection'
}

/**
 * fired to init the loading
 * not used for now
 */
export class HashLoadAction implements Action {
  readonly type = SpotsActionTypes.HASH_LOAD;
  constructor(public payload?: {hash: string, layer: LayerType}) {}
}

/**
 * fired to indicate that loading has started
 */
export class HashLoadingAction implements Action {
  readonly type = SpotsActionTypes.HASH_LOADING;
  constructor(public payload:  {hash: string, layer: LayerType, loading: boolean}) {}
}

/**
 * fired to indicate that loading has started
 */
export class HashClearAction implements Action {
  readonly type = SpotsActionTypes.HASH_CLEAR;
  constructor(public payload:  {hash: string, layer: LayerType}) {}
}

/**
 * fired by the case if it has the cached value
 */
export class HashStorageSuccessAction implements Action {
  readonly type = SpotsActionTypes.HASH_STORAGE_SUCCESS;
  constructor(public payload: LoadHashResponse) {}
}

/**
 * request loaded successfully
 */
export class HashRequestSuccessAction implements Action {
  readonly type = SpotsActionTypes.HASH_REQUEST_SUCCESS;
  constructor(public payload: LoadHashResponse) {}
}

/**
 * request load error
 */
export class HashRequestErrorAction implements Action {
  readonly type = SpotsActionTypes.HASH_REQUEST_ERROR;
  constructor(public payload: LoadHashResponse) {}
}

export type SpotsActions =
  HashLoadAction |
  HashLoadingAction |
  HashClearAction |
  HashStorageSuccessAction |
  HashRequestErrorAction |
  HashRequestSuccessAction;
