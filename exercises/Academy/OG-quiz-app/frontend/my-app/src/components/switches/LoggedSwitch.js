import React, { useContext, useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { CategoriesContext } from '../contexts/CategoriesContext.js';
import { AuthContext } from '../contexts/AuthContext.js';
import TeachersSwitch from './usersSwitches/TeachersSwitch.js';
import StudentsSwitch from './usersSwitches/StudentsSwitch.js';
import useAuthorizedRequest from '../../custom-hooks/useAuthorizedFetch.js';

const LoggedSwitch = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const fetchFunc = useAuthorizedRequest();
  useEffect(() => {
    const func = async () => {
      try {
        const temp = await fetchFunc('/categories');
        setCategories(temp);
      } catch (error) {
        alert(error.message);
      }
    };

    func();
  }, []);
  return (
    <Switch>
      <CategoriesContext.Provider
        value={{
          categoriesCont: categories,
          setCategoriesState: setCategories,
        }}
      >
        {user.role === 'teacher' ? <TeachersSwitch /> : <StudentsSwitch />}
      </CategoriesContext.Provider>
    </Switch>
  );
};

export default LoggedSwitch;
