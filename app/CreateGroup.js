import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state =  { text: '' };
  }

  static navigationOptions = {
    title: ({state}) => (state.params.title)
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Text style={styles.button}>Create Group:</Text>
        <TextInput
          style={{fontSize: 18}}
          onChangeText={(text) => this.setState({text})}
          placeholder='Insert Group Name'
          value={this.state.text}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneNumber: {
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    // width: 53,
    // height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});