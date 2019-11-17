// @flow
import type { GetState, Dispatch } from '../reducers/types';
import * as Zillow from '../api/zillow';
const xml2js =  require('xml2js')
const parser = new xml2js.Parser({'explicitArray': false})

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
            parser.parseString(response, (err, res) => {
              dispatch(search_success(res['Zestimate:zestimate']['response']))
          })
      }
    })
  }
}

function formatZillowResponse(raw_res) {
  let res = {}
  raw_res_address = raw_res['address'][0]
  res['address'] = {
    "city": raw_res_address['city'][0],
    "latitude": raw_res_address['latitude'][0],
    "longitude": raw_res_address['longitutde'][0],
    "state": raw_res_address['state'][0],
    "street": raw_res_address['street'][0],
    "zipcode": raw_res_address['zipcode'][0]
  }
}