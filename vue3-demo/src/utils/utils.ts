
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

  //日期转字符串
  dateToStringFormat(date: any, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }
}