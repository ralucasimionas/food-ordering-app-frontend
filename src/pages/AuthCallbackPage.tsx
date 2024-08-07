//the page that we will redirect the user to
//because we cant use the auth0 hook to get the auth0token outside of auth0provider (from auth0ProviderWithNagivate)

import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//need auth0 token to secure the createUser endpoint
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  //user gets access to the logged in user
  const { user } = useAuth0();

  //whenever the component loads we want to create the user
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);
  

  return <>Loading</>;
};

export default AuthCallbackPage;
