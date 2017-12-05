
export default class Utils{
  // 检查该item有没有被收藏过
  static checkFavorite(item,items){
    for (var i = 0; i < items.length; i++) {
      let id = item.id?item.id.toString():item.fullName;
      if (id===items[i]) {
        return true;
      }
    }
    return false;
  }
}
