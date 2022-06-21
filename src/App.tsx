import { ChakraProvider } from '@chakra-ui/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import Home from './components/Home';
import { SelectCharProvider } from './context/SelectCharProvider';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <SelectCharProvider>
            <Home />
          </SelectCharProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
