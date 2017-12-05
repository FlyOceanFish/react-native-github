
import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component{

  constructor(props){
    super(props);
    this.state={
      isFavorite:props.data.isFavorite,
      favoriteIcon:props.data.isFavorite?require('../../../img/ic_star.png'):require('../../../img/ic_unstar_transparent.png')
    }
  }
  setFavoriteState(isFavorite){
    this.setState({
      isFavorite:isFavorite,
      favoriteIcon:isFavorite?require('../../../img/ic_star.png'):require('../../../img/ic_unstar_transparent.png')
    })
  }
  _onPressFavorite(){
    this.setFavoriteState(!this.state.isFavorite);
    this.props.onFavorite(this.props.data.item,!this.state.isFavorite);
  }
  componentWillReceiveProps(nextProps){
    this.setFavoriteState(nextProps.data.isFavorite);
  }
  render(){
    let data  = this.props.data.item;
    let favoriteButton = <TouchableOpacity
      onPress={()=>{
        this._onPressFavorite();
      }}
    >
      <Image style={{width:22,height:22,tintColor:'#2196F3'}}
             source={this.state.favoriteIcon}/>
    </TouchableOpacity>
    return (
      <TouchableOpacity
      onPress={this.props.onSelect}
      style={styles.container}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.full_name}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text>Author:</Text>
              <Image
                style={{height:22,width:22}}
                source={{uri:data.owner.avatar_url}}/>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text>Stars:</Text>
              <Text>{data.stargazers_count}</Text>
            </View>
            {favoriteButton}
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
