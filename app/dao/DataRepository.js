
import {
  AsyncStorage
} from 'react-native'

import Trending from 'GitHubTrending'

export var FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending',flag_my:'my'}

export default class DataRepository{

  constructor(flag){
    this.flag = flag;
    if (flag===FLAG_STORAGE.flag_trending) {
      this.trending = new Trending();
    }
  }

  fetchRepository(url){
    return new Promise((resolve,reject)=>{
      //获取本地数据
      this.fetchLocalRepository(url)
          .then(result=>{
            if (result) {
              resolve(result);
            }else{
              this.fetchNewRepository(url)
              .then(result=>{
                resolve(result);
              })
              .catch(error=>{
                reject(error);
              })
            }
          })
    })
  }
  // 获取本地数据
  fetchLocalRepository(url){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(url,(error,result)=>{
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        }else{
          reject(error);
        }
      })
    })
  }
  //获取网络数据
  fetchNewRepository(url){
    return new Promise((resolve,reject)=>{
      if (this.flag===FLAG_STORAGE.flag_trending) {
        this.trending.fetchTrending(url)
            .then(result=>{
              if (!result) {
                reject(new Error('数据为空'));
              }else {
                this.saveRepository(url,result)
                resolve(result);
              }

            })
      }else {
        fetch(url)
          .then(response=>response.json())
          .then(result=>{
            if (result) {
              if (this.flag===FLAG_STORAGE.flag_my) {
                this.saveRepository(url,result)
                resolve(result);
              }else {
                this.saveRepository(url,result.items)
                resolve(result.items);
              }
            }else {
              reject(new Error('数据为空'))
            }

          })
          .catch(error=>{
            reject(error);
          })
      }
    })
  }

  saveRepository(url,items,callBack){
    if (!url||!items) return;
    let wrapData={items:items,update_date:new Date().getTime()};
    AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack)
  }

}
