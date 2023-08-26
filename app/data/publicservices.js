import {Images} from '@config';
export async function getPublicServices() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/publicservices/list');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/publicservices/list');
      let data = await response.json();
      let publicServicesData = data.result;
      // console.log("Test Data : ",publicServicesData);
      return publicServicesData;
      
    } catch (error) {
      console.error('Error:', error);
    }
}