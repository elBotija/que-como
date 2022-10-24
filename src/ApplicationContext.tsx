import React, { createContext, useEffect, useState } from 'react';
import { getFood } from './service/getFood';
import { getSharedFood } from './service/getSharedFood';

const ApplicationContext = createContext({
  foods: [],
  updateFoods: (a: any) => { },
  user: {},
  updateUser: (a: any) => { },
  editFood: {},
  updateEditFood: (a: any) => { },
  lastWeight: {},
  updateLastWeight: (a: any) => { },
  sharedFood: [],
  updateSharedFood: (a: any) => { },
})

const Application = (props: any) => {
  const [foods, setFoods] = useState<any>([]);
  const [sharedFood, setSharedFood] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [editFood, setEditFood] = useState<any>({});
  const [lastWeight, setLastWeight] = useState<any>({ peso: "-", day: "" });

  const updateFoods = (newFoods: any[]) => {
    setFoods(newFoods);
  }

  const updateUser = (user: any) => {
    setUser(user);
  }

  const updateLastWeight = (day: any) => {
    setLastWeight(day);
  }

  const updateEditFood = (food: any) => {
    if (food.id) window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditFood(food);
  }

  const updateSharedFood = (sharedFoods: any[]) => {
    setSharedFood(sharedFoods);
  }


  useEffect(() => {
    if (user && user.email) {
      getFood(user.email, updateFoods)
      getSharedFood(user.email, updateSharedFood)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ApplicationContext.Provider value={{ foods, updateFoods, user, updateUser, editFood, updateEditFood, lastWeight, updateLastWeight, sharedFood, updateSharedFood }}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export { Application, ApplicationContext };
