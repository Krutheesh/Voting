import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';

function Protected({ children }) {
  const {userInfo} = useSelector(store => store.auth);
 console.log(userInfo)
  if (!userInfo) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
 
  return children;
}

export default Protected;
