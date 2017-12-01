
import {
  AsyncStorage
} from 'react-native'

export default class DataRepository{

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
      fetch(url)
        .then(response=>response.json())
        .then(result=>{
          if (result) {
            resolve(result.items);
            this.saveRepository(url,result.items)
          }else {
            reject(new Error('数据为空'))
          }

        })
        .catch(error=>{
          reject(error);
        })
    })
  }

  saveRepository(url,items,callBack){
    if (!url||!items) return;
    let wrapData={items:items,update_date:new Date().getTime()};
    AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack)
  }
  checkData(longTime){
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime)
    if (cDate.getMonth()!=tDate.getMonth()) {
      return false;
    }
    if (cDate.getDay()!=tDate.getDay()) {
      return false;
    }
    if (cDate.getHours()-tDate.getHours()>4) {
      return false;
    }
    return true;
  }
}
