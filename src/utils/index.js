export * from './constants'

export const setItemInLocalStorege=(key,value)=>{
    if(!key || !value ){
        return console.error("Can Not store in L.S");

    }
    const valueToStore= typeof value !== 'string'? JSON.stringify(value):value;

    localStorage.setItem(key,valueToStore);
}
export const getItemInLocalStorege = (key) => {
  if (!key) {
    return console.error('Can Not the value from L.S');
  }
  return localStorage.getItem(key);
};

export const removeItemInLocalStorege = (key) => {
   if (!key) {
     return console.error('Can Not the value from L.S');
   }
  localStorage.removeItem(key);
};

export const getFormBody=(params)=>{
    let formBody=[];

    for (let property in params){
        let encodedKey =encodeURIComponent(property);  //user name ='user%20name'
        let encodedValue=encodeURIComponent(params[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}