import React, { useEffect, useState } from 'react';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';

export type Customer = {
  id: number;
  name: string;
  industry: string;
}

const GET_DATA = gql`
{
  customers{
    id
    name
    industry
  }
}
`;

const MUTATE_DATA = gql`
mutation MUTATE_DATA($name: String!, $industry: String!){
  CreateCustomer(name: $name, industry: $industry){
    customer{
      id
      name
    }
  }
}
`;


function App() {
  const [name, setName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const {loading, error, data} = useQuery(GET_DATA);
  const [CreateCustomer,{loading: createCustomerLoading, error:createCustomerError, data:createCustomerData}, 
  ]= useMutation(MUTATE_DATA, {
    refetchQueries: [
      {query: GET_DATA},
    ],
  });

  useEffect(() => {
    console.log(loading, error, data);
    console.log(CreateCustomer,createCustomerLoading, createCustomerError, createCustomerData,);
  });

  return (
    <div className="App">
      {error ? <p>something went wrong</p> : null}
      {loading ? <p>loading...</p> : null}
      {data ? 
        data.customers.map((customer: Customer) => {
          return (
            <p key={customer.id}>{customer.id +'   '+ customer.name +'   '+ customer.industry}</p>
          );
        })  
      : null}
      <form onSubmit={(e) => {
        e.preventDefault();
        CreateCustomer({variables: {name: name, industry: industry}});
      }}>
        <div>
        <label htmlFor='name' >Name: </label>
        <input id='name' type='text' value={name} onChange={(e)=> {setName(e.target.value)}} />
        </div>
        <div>
        <label htmlFor='industry' >Indusrty: </label>
        <input id='industry' type='text' value={industry} onChange={(e)=> {setIndustry(e.target.value)}} />
        </div>
        <button>Add Customer</button>
      </form>
    </div>
  );
}

export default App;
