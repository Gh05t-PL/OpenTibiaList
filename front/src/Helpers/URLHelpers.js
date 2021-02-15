export const objectToQueryParam = (obj) => {
  let queryString = new URLSearchParams();
  for(let key in obj){
    if(!obj.hasOwnProperty(key)) {
      continue;
    }
    queryString.append(key, obj[key])
  }
  return "?"+queryString.toString();
}
