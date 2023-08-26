import {Images} from '@config';
export async function getPark() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/park/listing_park');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/publicservices/list');
      let data = await response.json();
      let parkData = data.results;
    //   console.log("Test Data Anjing: ",policestationData);
      return parkData;
      
    } catch (error) {
      console.error('Error:', error);
    }
}