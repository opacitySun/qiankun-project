
export class UtilsService {
  //判断是否是数组
  isArray(val:any) {
    return Object.prototype.toString.call(val)== '[object Array]';
  }

  //字符串转base64
  stringToBase64(str:string) {
    // 对字符串进行编码
    const encode = encodeURI(str);
    // 对编码的字符串转化base64
    const base64 = btoa(encode);
    return base64;
  }
}