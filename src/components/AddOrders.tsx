import { useState } from "react";

export type AppProps ={
    customerId: number;
}

export default function AddOrder({customerId}: AppProps){
    const [active, setActive] = useState(false);
    const [description, setDescription] = useState<string>('');
    const [totalInCents, setTotalInCents] = useState<number>(NaN);
    return (
        <div>
            {active ? null : <button onClick={() => {
                setActive(true);
            }}> + New Order</button>}
            {active ? 
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
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
                    <button  > + Add Order</button>
                </form>
            </div> : null}
        </div>
    );
}