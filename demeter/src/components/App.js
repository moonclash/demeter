import React from 'react';
import FoodItem from './FoodItem';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchResults: [],
    }
  }

  componentDidMount() {
    fetch(`https://api.nutritionix.com/v1_1/search/${'bacon'}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=073caca0&appKey=b957d4a34fda847d4a77bcb860c5bcac`)
    .then(blob => blob.json().then(data => {
      const [...hits] = data.hits;
      this.setState({searchResults: hits});
    }));
  }

  handleChange() {
    const foodQuery = this.foodSearch.value.replace(/\s/gi,'%20');
    fetch(`https://api.nutritionix.com/v1_1/search/${foodQuery}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=073caca0&appKey=b957d4a34fda847d4a77bcb860c5bcac`)
    .then(blob => blob.json().then(data => {
      const [...hits] = data.hits;
      this.setState({searchResults: hits});
    })); 
  }

  render() {
    return (
          <div className='search-results'>
            <input onChange={this.handleChange} type="text" ref={(input) => this.foodSearch = input}/>
            {this.state.searchResults.map((result,i) => {
              const {
                 item_name: name,
                 nf_calories: calories, 
                 nf_total_fat: fat, 
                 nf_total_carbohydrate: carbs,
                 nf_protein: protein 
              } = result.fields;
              return <FoodItem 
              name={name}
              calories={calories} 
              fat={fat}
              protein={protein}
              carbs={carbs}
              key={i}/>
            })}
          </div>
      );
  }
}

export default App;