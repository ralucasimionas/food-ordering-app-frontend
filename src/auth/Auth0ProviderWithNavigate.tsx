import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTO0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initiate auth;");
  }

  const onRedirectCallback = () => {
    //function that is called when user is redirected back to the app, after auth
    //can call the useAuth hook here, because we are outside of Auth0Provider. will use auth0 hook in authCallbackPage
    //need to secure the createUserEndpoint that why we need the auth0provider token
    // console.log("USER", user);

    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage" // This line is important
      useRefreshTokens={true} // Enable refresh tokens
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
