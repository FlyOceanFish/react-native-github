

import {
  AsyncStorage
} from 'react-native'

import keys from '../res/data/keys.json'

export var FLAG_LANGUAGE={flag_language:'flag_language',flag_key:'flag_key'}

export default class LanguageDao{
  constructor(flag){
    this.flag = flag;
  }
  fetch(){
    return new Promise((reslove,reject)=>{
      AsyncStorage.getItem(this.flag,(error,result)=>{
        if(error){
          reject(error);
        }else {
          if (result) {
            try {
              reslove(JSON.parse(result));
            } catch (e) {
              reject(e);
            }
          }else{
            var data = this.flag===FLAG_LANGUAGE.flag_key?keys:null;
            this._save(data);
            reslove(data)
          }
        }
      })
    })
  }
  save(data){
    AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

    })
  }
}
