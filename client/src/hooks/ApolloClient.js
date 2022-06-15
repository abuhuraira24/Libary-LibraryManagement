import {
    HttpLink ,
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
  import { setContext } from '@apollo/client/link/context';
  const httpLink = new HttpLink({
    uri: "http://localhost:5000"
    // Additional options
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwtToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


  export default client