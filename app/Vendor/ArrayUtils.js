
export default class ArrayUtils{

  static updateArray(array,item){
    for (let i = 0,len = array.length; i < len; i++) {
      var temp = array[i];
      if (temp===item) {
        array.splice(i,1);
        return;
      }
    }
    array.push(item);
  }
  // 克隆一个数组
  static clone(from){
    if (!from) {
      return [];
    }else{
      let newArray = [];
      for (var i = 0; i < from.length; i++) {
        newArray[i]=from[i]
      }
      return newArray;
    }
  }
  // 判断两个数组是否相等
  static isEqual(arr1,arr2){
    if (!(arr1&&arr2)) return false;
    if(arr1.length!==arr2.length)return false;
    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i]!==arr2[i]) {
        return false;
      }
    }
    return true;
  }
  // 将指定元素移除
  static remove(arr,item){
    if(!arr)return;
    for (var i = 0; i < arr.length; i++) {
      if (item===arr[i]) {
        arr.splice(i,1);
      }
    }
  }
}
