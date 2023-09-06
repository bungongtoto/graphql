import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export type AppProps ={
    customerId: number;
}

const GET_DATA = gql`
{
  customers{
    id
    name
    industry
    orders {
      id 
      description
      totalInCents
    }
  }
}
`;

const MUTATE_DATA = gql`
mutation MUTATE_DATA($description: String!, $totalInCents: Int!,$customer: ID! ) {
    createOrder(customer:$customer, description: $description, totalInCents: $totalInCents){
      order{
        id
        customer{
          id
        }
        description
        totalInCents
      }
    }
  }
`;

export default function AddOrder({customerId}: AppProps){
    const [active, setActive] = useState(false);
    const [description, setDescription] = useState<string>('');
    const [totalInCents, setTotalInCents] = useState<number>(NaN);
    const [CreateOrder,{loading, error, data,}, 
    ]= useMutation(MUTATE_DATA, {
        refetchQueries: [
            {query: GET_DATA},
        ],
    });

    useEffect(() => {
        if (data){
            console.log(data);
            setDescription('');
            setTotalInCents(NaN);
        }
    },[data]);

    return (
        <div>
            {active ? null : <button onClick={() => {
                setActive(true);
            }}> + New Order</button>}
            {active ? 
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    CreateOrder({variables: {customer: customerId, description: description, totalInCents: totalInCents*100,}})
                    console.log(customerId, description, totalInCents);
                }}>
                    <div>
                    <label htmlFor='description' > Description: </label>
                    <input id='description' type='text' value={description} onChange={(e)=> {setDescription(e.target.value)}} />
                    </div>
                    <br />
                    <div>
                    <label htmlFor='cost' > TotalInCents: </label>
                    <input id='cost' type='number' value={isNaN(totalInCents) ? '' : totalInCents} onChange={(e)=> {setTotalInCents(parseFloat(e.target.value))}} />
                    </div>
                    <br />
                    <button disabled={loading? true: false} > + Add Order</button>
                </form>
                {error? <p>Something went wrong</p> : null}
            </div> : null}
        </div>
    );
}