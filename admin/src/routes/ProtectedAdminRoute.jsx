import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const ProtectedAdminRoute = ({ children }) => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false); 

  useEffect(() => {
    if (!accessToken) {
      navigate("/"); 
    } else {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded.role !== 'admin') {
          navigate("/");
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/");
      }
    }
  }, [accessToken, navigate]); 

  return isAuthorized ? children : null;
};

ProtectedAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAdminRoute;
