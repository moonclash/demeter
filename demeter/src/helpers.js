export function queryManager(arg) {
  return arg ?
  `https://api.nutritionix.com/v1_1/search/${arg}?fields=item_name%2Citem_ida%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=073caca0&appKey=b957d4a34fda847d4a77bcb860c5bcac` :
  `https://api.nutritionix.com/v1_1/search/pizza?fields=item_name%2Citem_ida%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=073caca0&appKey=b957d4a34fda847d4a77bcb860c5bcac`;
}