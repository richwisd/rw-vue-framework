
/* 坐标系转换 */
const x_pi = (3.14159265358979324 * 3000.0) / 180.0

export function gcj02ToBd09(lng: number, lat: number) {
  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_pi)
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_pi)
  var bd_lng = z * Math.cos(theta) + 0.0065
  var bd_lat = z * Math.sin(theta) + 0.006
  return [bd_lng, bd_lat]
}


export function bd09ToGcj02(bd_lon: number, bd_lat: number) {
  var x = bd_lon - 0.0065
  var y = bd_lat - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  var gg_lng = z * Math.cos(theta)
  var gg_lat = z * Math.sin(theta)
  return [gg_lng, gg_lat]
}
