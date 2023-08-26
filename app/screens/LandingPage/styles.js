import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_get_started:{
    marginTop: 40,
    width: 120,
    padding : 5,
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  content: {
    // position: 'absolute',
    // top: 280,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
});
