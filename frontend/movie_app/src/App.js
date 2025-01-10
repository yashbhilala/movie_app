import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router';


import './index.css';
import BaseScreen from './Components/BaseScreen';
import SearchResults from './SearchResults';
import ErrorBoundary from './ErrorBoundary';




const queryClient = new QueryClient()


function App() {


  return (

    <QueryClientProvider client = { queryClient } >

      <ErrorBoundary>

        <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SearchResults /> } />
          <Route path='/movie/:id' element={ <BaseScreen /> } />
          <Route path='*' element={ <h1> 404 - The Page you're looking for is not there </h1> } />
        </Routes>
        </BrowserRouter>

      {/* We will define only all of our Routes and Providers here  */}
      </ErrorBoundary>
    </QueryClientProvider>

  );


}

export default App;




// To do - 

// Questions 
// 1) This will be a majorly purely front end based project, am I correct ?                     - Yes
// 2) Could you please guide me on how to achieve sorting and filtering aspect of the project ? - Use Responsive Tables in React
// 3) Could you please explain how the api can be used for infinite scroll ? [ EXPLAIN API ]    - He will look into it 






























































