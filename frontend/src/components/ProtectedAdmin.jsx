import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { checkAuth } from '../features/authentication/authApi';
import { useDispatch } from 'react-redux';

function ProtectedAdmin({ children }) {
  const {userInfo} = useSelector(store => store.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if(!userInfo){
    return navigate('/login')
  }
 


  return children;
}

export default ProtectedAdmin;
