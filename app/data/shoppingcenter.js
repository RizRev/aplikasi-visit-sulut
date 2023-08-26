import {Images} from '@config';
export async function getShoppingCenter() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/shoppingcenter/listing_shoppingcenter');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/publicservices/list');
      let data = await response.json();
      let shoppingcenterData = data.results;
    //   console.log("Test Data Anjing: ",policestationData);
      return shoppingcenterData;
      
    } catch (error) {
      console.error('Error:', error);
    }
}