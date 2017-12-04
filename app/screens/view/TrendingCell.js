
import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

import HTMLView from 'react-native-htmlview';

export default class TrendingCell extends Component{

  render(){
    var data = this.props.aa;
    return (
      <TouchableOpacity
      onPress={this.props.onSelect}
      style={styles.container}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.fullName}</Text>
          <HTMLView value={data.description}
                    stylesheet={styles}
                    onLinkPress={(url) => console.log('clicked link: ', url)}/>
          <Text style={styles.description}>{data.meta}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.description}>Build by:</Text>
              {data.contributors.map((result,i,arr)=>{
                return <Image
                  key={i}
                  style={{height:22,width:22,margin:2}}
                  source={{uri:result}}/>
              })
            }
            </View>

            <Image style={{width:22,height:22}} source={require('../../../img/ic_star.png')}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  title:{
    fontSize:16,
    marginBottom:2,
    color:'#212121'
  },
    a: {
    fontWeight: '300',
    color: '#2196F3', // make links coloured pink
  },
  description:{
    fontSize:14,
    marginBottom:2,
    color:'#757575',
    borderRadius:2
  },
  cell_container:{
    backgroundColor:'white',
    padding:10,
    marginHorizontal:5,
    marginVertical:3,
    borderWidth:0.5,
    borderColor:'#dddddd',
    shadowColor:'gray',
    shadowOffset:{width:0.5,height:0.5},
    shadowOpacity:0.4,
    shadowRadius:1,
    elevation:2
  }
})
