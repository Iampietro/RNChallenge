import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
  },
	contentContainer: {
		flex:1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignContent: 'center',
		width: 150
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
	},
	btn: {
		width: 200
	}
});