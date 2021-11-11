import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReportIcon } from '../ReportIcon/ReportIcon';
import { CategoryItem, Text } from './ReportCategoryItem.styled';

export function ReportCategoryItem({ name, sum, icon }) {
  return (
    <CategoryItem>
      {/* <NavLink to={{ pathname: `/${icon}` }}> */}
      <Text>{sum}</Text>
      <ReportIcon name={icon} color="#071F41" size="56" />
      <Text>{name}</Text>
      {/* </NavLink> */}
    </CategoryItem>
  );
}
