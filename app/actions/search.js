// @flow
import type { GetState, Dispatch } from '../reducers/types';
import * as Zillow from '../api/zillow';
const parseString =  require('xml2js').parseString;

export const RECIEVE_SEARCH = 'RECIEVE_SEARCH';

export function search_success(property) {
  return {
    type: RECIEVE_SEARCH,
    property
  };
}

export function searchProperty(search_term) {
  return function(dispatch){
    return Zillow.getProperty(search_term)
      .then(response => {
        if(response){
          parseString(response, (err, res) => {
            console.log(res['Zestimate:zestimate']['response'][0])
            dispatch(search_success(res['Zestimate:zestimate']['response'][0]))
          })
      }
    })
  }
}