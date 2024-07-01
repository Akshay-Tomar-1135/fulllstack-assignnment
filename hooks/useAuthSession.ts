import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  //  implement the logic here to check user session
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(clearAuth());
      }
    };

    fetchUserData();
  }, [token]);

  return user;
};

export default useAuthSession;
