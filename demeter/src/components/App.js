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
      searchResults: [],
      userFoods: [],
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
      let [...hits] = data.hits;
      hits = hits.map(hit => hit.fields);
      this.setState({searchResults: hits});
    }));
  }

  componentDidMount() {
    this.foodItemsUpdate();
  }

  updateUserMacros() {
    const { userFoods } = this.state;
    if (userFoods.length) {
      const macrosTaken = userFoods.reduce((prev,next) => {
      return {
        nf_calories: prev.nf_calories + next.nf_calories,
        nf_protein: prev.nf_protein + next.nf_protein,
        nf_total_carbohydrate: prev.nf_total_carbohydrate + next.nf_total_carbohydrate,
        nf_total_fat: prev.nf_total_fat + next.nf_total_fat
      }
    });
    this.setState({
      totalCalories: macrosTaken.nf_calories,
      totalProtein: macrosTaken.nf_protein,
      totalCarbs: macrosTaken.nf_total_carbohydrate,
      totalFat: macrosTaken.nf_total_fat
    }) 
    }
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
    this.setState({userCalories});
  }

  imageChange(e) {
    const userPicture = window.URL.createObjectURL(e.target.files[0]);
    this.setState({ userPicture });
  }

  handleFoodItem(id) {
    const { userFoods, searchResults } = this.state;
    let [a] = searchResults.filter(result => result.item_id === id);
    userFoods.push(a);
    this.updateUserMacros();
    this.setState({userFoods});
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
      totalFat} = this.state
    return (
          <div className='app-wrap'>
            <div className='search-results'>
            <input onChange={this.handleChange} type="text" ref={(input) => this.foodSearch = input}/>
            {this.state.searchResults.map((result) => {
              const {
                 item_id: id,
                 item_name: name,
                 nf_calories: calories, 
                 nf_total_fat: fat, 
                 nf_total_carbohydrate: carbs,
                 nf_protein: protein 
              } = result;
              return <FoodItem 
              name={name}
              calories={calories} 
              fat={fat}
              protein={protein}
              carbs={carbs}
              id={id}
              key={id}
              onClick={this.handleFoodItem}/>
            })}
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
              {this.state.userFoods.map((item)=> {
                const {
                 item_id: id,
                 item_name: name,
                 nf_calories: calories, 
                 nf_total_fat: fat, 
                 nf_total_carbohydrate: carbs,
                 nf_protein: protein 
                } = item;
              return <FoodItem 
              name={name}
              calories={calories} 
              fat={fat}
              protein={protein}
              carbs={carbs}
              id={id}
              key={id}
              onClick={this.handleFoodItem}
              calorieChange={this.update}/>
              })}
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