import { StyleSheet } from 'react-native';

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
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	},
	cellContent: {
		fontWeight: 'bold'
	}
});