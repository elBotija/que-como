import React, { createContext, useEffect, useState } from 'react';
import {getFood} from './service/getFood';

const ApplicationContext = createContext({
  foods: [],
  updateFoods: (a:any) => {},
  user: {},
  updateUser: (a:any) => {},
  editFood: {},
  updateEditFood: (a:any) => {},
})

const Application = (props:any) => {
  const [foods, setFoods] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [editFood, setEditFood] = useState<any>({});

  const updateFoods = (newFoods: any[]) => {
    setFoods(newFoods);
  }
  
  const updateUser = (user: any) => {
    setUser(user);
  }
  
  const updateEditFood = (food: any) => {
    if(food.id) window.scrollTo({top: 0, behavior: 'smooth'});
    setEditFood(food);
  }


  useEffect(() => {
    if(user && user.email){
      getFood(user.email, updateFoods)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ApplicationContext.Provider value={{ foods, updateFoods, user, updateUser, editFood, updateEditFood}}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export { Application, ApplicationContext };