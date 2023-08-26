import {Images} from '@config';
export async function getPublicTransport() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/publictransport/listing_publictransport');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/publicservices/list');
      let data = await response.json();
      let publictransportData = data.results;
    //   console.log("Test Data Anjing: ",policestationData);
      return publictransportData;
      
    } catch (error) {
      console.error('Error:', error);
    }
}