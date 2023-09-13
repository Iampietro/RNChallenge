import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
	contentContainer: {
		flex:1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center'
	},
	cell: {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	}
});