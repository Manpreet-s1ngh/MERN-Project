import React,{useState,useEffect} from 'react';

const Home=()=>{

   const[name,setName]=useState('');
   const [show,setShow]=useState(false);

    const changeHomeName=async()=>{
       
      try {
          const res = await fetch("/checkUserName", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            Credential: "include",
          });
        console.log(res);
        const data =await res.json();
        console.log(data);

        if(res.status === 201){
             setName(data.fullname);
             setShow(true);
        }else{
          console.log(data);
        }
        
      } catch (err) {
        console.log(err);
      }

    }

    useEffect(() => {
            changeHomeName();
    }, []);

    
    return (
      <>
        <div className="outer_home">
          <h4>Welcome</h4>

          {show ? (
            <>
              <h1>
                <span>Manpreet singh</span>
              </h1>
              <br/>
              <h1>
                Happy to see back ..😃🙌
              </h1>
            </>
          ) : (
            <h1>
              We Are the <span>MERN</span> Developer
            </h1>
          )}
        </div>
      </>
    );
}

export default Home;