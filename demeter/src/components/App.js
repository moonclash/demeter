import React from 'react';
import FoodItem from './FoodItem';
import UserProfile from './UserProfile';
import SettingsPanel from './SettingsPanel';
import { queryManager } from '../helpers';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.calorieChange = this.calorieChange.bind(this);
    this.imageChange=this.imageChange.bind(this);
    this.handleFoodItem = this.handleFoodItem.bind(this);
    this.foodItemsUpdate = this.foodItemsUpdate.bind(this);
    this.setCalories = this.setCalories.bind(this);
    this.state = {
      searchResults: {},
      userFoods: {},
      userPicture: 'http://fillmurray.com/500/500',
      userName: 'Your name here',
      userCalories: 0,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0
    }
  }

  foodItemsUpdate(item) {
    const query = queryManager(item);
    fetch(query)
    .then(blob => blob.json().then(data => {
      const searchResult = {};
      let [...hits] = data.hits;
      hits.forEach(hit => {
        searchResult[hit._id] = hit.fields
      });
      this.setState({searchResults: searchResult});
    }));
  }

  componentDidMount() {
    this.foodItemsUpdate();
    const localState = JSON.parse(localStorage.getItem('user-data'));
    const { userFoods,
      userPicture,
      userName,
      userCalories,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat } = localState;
    this.setState({
      userFoods,
      userPicture,
      userName,
      userCalories,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    });
  }

  componentDidUpdate() {
    localStorage.setItem('user-data',JSON.stringify(this.state));
  }

  updateUserMacros() {
    const { userFoods } = this.state;
    const macros = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0
    };
    for (let prop in userFoods) {
      macros.totalCalories += userFoods[prop].nf_calories || 0;
      macros.totalProtein += userFoods[prop].nf_protein || 0;
      macros.totalCarbs += userFoods[prop].nf_total_carbohydrate || 0;
      macros.totalFat += userFoods[prop].nf_total_fat || 0;
    }
    this.setState({totalCalories : macros.totalCalories,
                   totalProtein: macros.totalProtein,
                   totalCarbs: macros.totalCarbs,
                   totalFat: macros.totalFat})
  }

  handleChange() {
    const foodQuery = this.foodSearch.value.replace(/\s/gi,'%20');
    this.foodItemsUpdate(foodQuery);
  }

  nameChange(e) {
    const userName = e.target.value;
    this.setState({ userName });
  }

  calorieChange(e) {
    const userCalories = e.target.value;
    this.setState({ userCalories });
  }

  imageChange(e) {
    const userPicture = window.URL.createObjectURL(e.target.files[0]);
    this.setState({ userPicture });
  }

  handleFoodItem(id) {
    let {searchResults,userFoods} = this.state;
    if(userFoods[id]) {
      delete userFoods[id];
    }else {
      userFoods[id] = searchResults[id];
    }
      this.updateUserMacros();
      this.setState({ userFoods });
  }

  setCalories(e) {
    const userCalories = e.target.value;
    this.setState(userCalories);
  }

  render() {
    const {userName,
      userPicture,
      userCalories,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      searchResults,
      userFoods} = this.state;
    return (
          <div className='app-wrap'>
            <div className='search-results'>
            <input onChange={this.handleChange} type="text" ref={(input) => this.foodSearch = input}/>
            {
              Object.keys(searchResults).map(key => {
                const {
                 item_name: name,
                 nf_calories: calories, 
                 nf_total_fat: fat, 
                 nf_total_carbohydrate: carbs,
                 nf_protein: protein 
              } = searchResults[key];
              return <FoodItem 
              name={name}
              calories={calories} 
              fat={fat}
              protein={protein}
              carbs={carbs}
              id={key}
              key={key}
              onClick={this.handleFoodItem}/>
              })
            }
          </div>
          <div className="user-wrap">
            <UserProfile 
            img={userPicture} 
            userName={userName} 
            userCalories={userCalories}
            totalCalories={totalCalories}
            protein={totalProtein}
            carbs={totalCarbs}
            fat={totalFat}
            >
            {
              Object.keys(userFoods).map(key => {
                const {
                 item_name: name,
                 nf_calories: calories, 
                 nf_total_fat: fat, 
                 nf_total_carbohydrate: carbs,
                 nf_protein: protein 
              } = userFoods[key];
              return <FoodItem 
              name={name}
              calories={calories} 
              fat={fat}
              protein={protein}
              carbs={carbs}
              id={key}
              key={key}
              onClick={this.handleFoodItem}/>
              })
            }
            </UserProfile>
            
          </div>
          <SettingsPanel
          nameChange={this.nameChange}
          calorieChange={this.calorieChange}
          imageChange={this.imageChange}
          />
          </div>
      );
  }
}

export default App;