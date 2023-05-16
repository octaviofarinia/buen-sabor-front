import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIRouter } from '../API/APIRouter';
import { getRegister } from '../APIHandler';
import { CategoryDetail } from './CategoryDetail';

export const DetailRouter = () => {
  const { RequestedEndpoint } = useParams();

  
  const getRequiredDetail = () => {
    switch(RequestedEndpoint){
      case 'Categorias':
        return <CategoryDetail/>
      default:
        return <h1>Not Found</h1>
    }
  }
  return getRequiredDetail();
};
