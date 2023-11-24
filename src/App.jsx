import { useState , useEffect } from 'react';

//fetch was not functioning well for the api that's why i directly downloaded the json file of the restaurant api online 
// and read all of the data locally
import apiData from './restaurants';

function App() {

  
 
  const [findDuplicateState,setfindDuplicateState] = useState([]);
  const [stateName,setStateName] = useState([]);
  const [locatedRestaurant,setLocatedRestaurant] = useState([]);
  const [selectedLocation,setSelectedLocation] = useState('');


  const fetchRestaurantsData = () => {

    setfindDuplicateState(apiData);

  }

  useEffect(() => {

      fetchRestaurantsData();

      const result = findDuplicateState.reduce((newArray, currentArray) => {

            if(newArray.find((item) => item.state === currentArray.state)){

                return newArray
            }

            return newArray.concat([currentArray]);

      },[])

      setStateName(result);

  },[findDuplicateState])

 
  useEffect(() => {
    

     

        const filteredRestaurants = findDuplicateState.filter(item => item.state.indexOf(selectedLocation) !== -1)

        setLocatedRestaurant(filteredRestaurants);

      


  },[selectedLocation])
  
  
 return (
    <>
      <nav className="navbar bg-body-tertiary">
          <div className="container" >
            <a className="navbar-brand text-muted" href="#">Restaurant Finder</a>
          </div>
      </nav>
      <div className="container" style={{marginBottom: 500 + "px"}}>

        <div className="col-lg-6 col-sm-12 m-auto mt-5">
          <div className="alert alert-primary text-center" role="alert">
             Select state then the website will show list of all available restaurants on that specific state
          </div>
        </div>

          <div className="row">
          
            <div className="col-lg-3 col-sm-12 m-auto">
               <div className="col text-center">
                <h3 className='mt-5 text-muted m-auto mb-5'>Select State</h3>
               </div>
               <select className="form-select rounded-1" aria-label="Default select example" onChange={(e) => {setSelectedLocation(e.target.value)}}>
                 
                   
                            <option defaultValue>Select</option>
                      
                    {   

                          
                            stateName.map((data) => (
                              

                                  <option value={data.state}>{data.state}</option>  

                            
                              

                            ))
                          
                          
                    }
                   
                </select>
                  
                  
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-4 col-sm-12 m-auto">
                <ul className="list-group">

                      {

                        

                            locatedRestaurant.map((data, i) => (

                              <li className="list-group-item" key={i}>🍔 {data.restaurant_name}</li>

                            ))

                        
                          
                      }
                 
                
                </ul>
            </div>
          </div>
       </div>

       <section  className='bg-light'>
                
                <div className="container p-5">
                      <div className="row text-center">
                         <div className="col-lg-4 col-sm-12 m-auto mt-3">
                            <p className='text-muted'> created by cuarterolyndon06@gmail.com</p>
                         </div>
                      </div>
                </div>
                      
       </section>
    </>
  )
}

export default App
