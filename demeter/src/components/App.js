import React from 'react';
import FoodItem from './FoodItem';
import UserProfile from './UserProfile';
import SettingsPanel from './SettingsPanel';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.calorieChange = this.calorieChange.bind(this);
    this.imageChange=this.imageChange.bind(this);
    this.handleFoodItem = this.handleFoodItem.bind(this);
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

  componentDidMount() {
    fetch(`https://api.nutritionix.com/v1_1/search/${'bacon'}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=073caca0&appKey=b957d4a34fda847d4a77bcb860c5bcac`)
    .then(blob => blob.json().then(data => {
      let [...hits] = data.hits;
      hits = hits.map(hit => hit.fields);
      this.setState({searchResults: hits});
    }));
  }

  handleChange() {
    // const foodQuery = this.foodSearch.value.replace(/\s/gi,'%20');
    // fetch(`https://api.nutritionix.com/v1_1/search/${foodQuery}?fields=item_name%2Citem_ida%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=073caca0&appKey=b957d4a34fda847d4a77bcb860c5bcac`)
    // .then(blob => blob.json().then(data => {
    //   const [...hits] = data.hits;
    //   this.setState({searchResults: hits});
    // })); 
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
    this.setState({userFoods});
  }

  render() {
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
            <UserProfile img={this.state.userPicture} userName={this.state.userName}>
              {this.state.userFoods.map(item => {
                console.log(item);
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
              onClick={this.handleFoodItem}/>

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