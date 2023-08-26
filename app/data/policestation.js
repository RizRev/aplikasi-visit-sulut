import {Images} from '@config';
export async function getPoliceStation() {
    try {
      let response = await fetch('http://b.visit-northsulawesi.com/api/policestation/listing_policestation');
      // let response = await fetch('https://be.visit-northsulawesi.com/api/publicservices/list');
      let data = await response.json();
      let policestationData = data.results;
    //   console.log("Test Data Anjing: ",policestationData);
      return policestationData;
      
    } catch (error) {
      console.error('Error:', error);
    }
}