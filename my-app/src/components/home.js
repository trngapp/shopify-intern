import React,{useState} from "react"
import "react-bootstrap"
import TextField from '@mui/material/TextField';
import {Form} from "react-bootstrap";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import "bootstrap"
const Home=()=>{
    const ColorButton = styled(Button)(({ theme }) => ({
        //color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "blue",
        '&:hover': {
         backgroundColor:  "blue",
       },
      }));

//const [promp,addpromp]=useState([])
const [resp,addresponse]=useState([])





      const [message,sendmessage]=useState("");
      const [respons,getresponse]=useState("");


      let handlefunction=(event)=>{

          sendmessage(event.currentTarget.prompt.value);
        // console.log(message);
        // addpromp(promp=>[...promp,message]);

         event.preventDefault();
      }





      const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY

      //const openai = new OpenAI(OPENAI_API_KEY);
let callback=()=>{
    addresponse(resp=>[...resp,{prompt:message,response:respons}]);
}

      let submit=async ()=>{
       // console.log(message);

        const data = {
            prompt: message,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
           };
          // console.log(data);

        await  fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },

            body: JSON.stringify(data),
           }).then(response => response.json())
           .then(data => getresponse(data.choices[0].text.split('.'))).then(()=>callback());



      }


      let print=(response,prompt)=>{
               return(
                   <>
                 <center> <div  class="container"style={{backgroundColor:"#E8E8E8",width:"50%"}}>
<div class="row"><div class="col"><h3>Prompt:&nbsp;&nbsp;&nbsp;</h3> </div>
<div class="col"><h4>{prompt}</h4></div></div>


<div class="row"><div class="col"><h3>Response:&nbsp;&nbsp;&nbsp;</h3></div>
<div class="col"><h4>{response}</h4></div> </div>
                   </div></center>
                   </>
               )
      }









    return (

        <>
        <div class="container">
            <div class="row">
                <div class="col">

                <h1 style={{marginRight:"57%"}}>Fun with AI</h1>
            <Form onSubmit={handlefunction}> <center>  <div >
       <TextField
       style={{width:"1000px"}}
          id="outlined-multiline-static"
        label="enter the prompt"
          multiline
          rows={10}
          name="prompt"
          //onChange={handlefunction}

         //fullWidth
        />

        </div>

        </center>
        <br/>
        <ColorButton variant="contained"  type="submit" onClick={submit} style={{marginRight:"-63%"}}>Submit</ColorButton>

        </Form>
                </div>
            </div>
            <div class="row">
                <div class="col">
                <h1 style={{marginRight:"57%"}}>Responses</h1>
               {/*<div>
                   {respons}
               </div>
          <div style={{backgroundColor:"grey"}}>
                 <h1> {promp.map((val)=>{
                  return val

                   })}</h1>
                   <br/>
          </div>*/}

       {/*{resp.map((val)=>{
                  return print(val.response,val.prompt);

                   })}*/}
                   {
                       resp.slice().reverse().map((val)=>{
                           return print(val.response,val.prompt);
                       })
                   }



                </div>
            </div>
        </div>

        </>

    )
}
export default Home