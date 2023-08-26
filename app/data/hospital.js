import {Images} from '@config';
export async function getHospital() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/hospital/listing_hospital');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/publicservices/list');
      let data = await response.json();
      let hospitalData = data.results;
    //   console.log("Test Data Anjing: ",policestationData);
      return hospitalData;
      
    } catch (error) {
      console.error('Error:', error);
    }
}