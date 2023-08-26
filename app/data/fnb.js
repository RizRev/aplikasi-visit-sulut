import {Images} from '@config';
export async function getFnb() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/fnb/list');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/fnb/list');
      let data = await response.json();
      let FnbData = data.result;
      return FnbData;
      // console.log("Test Data : ",data.result);
    } catch (error) {
      console.error('Error:', error);
    }
}
// export {FnbData};