import { updateFood } from "./updateFood"

export const deleteFood = async (id, date, foods) => {
  try {
    const foodsByDay = foods.find(f => f.day === date)
    const keyToDelete = foodsByDay.id;
    const removedFood = foodsByDay.foods.filter(f => f.id !== id)
    await updateFood(keyToDelete, { foods: removedFood, user:foodsByDay.user })
  } catch (error) {
    alert(error)
  }
}