
export default class Utils{
  // 检查该item有没有被收藏过
  static checkFavorite(item,items) {
      for (var i = 0, len = items.length; i < len; i++) {
          let id=item.id? item.id:item.fullName;
          if (id.toString() === items[i]) {
              return true;
          }
      }
      return false;
  }
}
