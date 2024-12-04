import { useState,useEffect } from 'react'
import {Card, Typography, CardContent, Button,
Divider, RadioGroup, Radio,FormControlLabel,FormControl,CardActions,
Grid2,
 } from '@mui/material/';
import data from './data.json';
import './App.css'
import Swal from 'sweetalert2';
function App() {
  const [questions, setQuestions] = useState(data);
  useEffect(() => {setQuestions(data)},[])
  return (
    <Grid2 sx={{alignItems: 'left'}}>
        <Card variant="outlined" sx={{p: 2}}>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 18 }}>Quiz Meme</Typography>
          <Divider />
          <CardContent>
          <FormControl>
            {
              questions ? questions.map((a,k) => {
                return <div key={k} >
                    <Typography sx={{ color: 'text.primary', fontSize: 16}} align='left'> {a.question}</Typography>
                    <RadioGroup key={k}  row>
                    {
                      a.choices.map((b,i) => {
                        return     <FormControlLabel sx={{ color: 'text.secondary', fontSize: 12 }} key={i} 
                        value={b.choiceId} control={<Radio />} 
                        label={b.choice} 
                        onChange={(e: any) => {
                          
                          let value = e.target.value;
                          questions[k].answer = value;                          
                        }}
                       />
                      })
                    }
                   </RadioGroup>
                    <Divider sx={{ mb: 4,mt: 4 }}/>
                    </div>
              }) : null
            }
          </FormControl>
          <CardActions>
        <Button size="large" variant="contained" onClick={() => {
          if(questions.some(a => a.answer)){
            let totalQuestions = questions.length;
            let correctAnswers = 0;
            questions.map(a => {
              if(a.answer == a.choiceId){
                correctAnswers++
              }
            });
            if(correctAnswers <= 3){
              Swal.fire({
              title: "You need to review?",
              text: "Sources facebook, insta and X. Pwede din sa story ng friend mong chismosa.",
              icon: "error"
            });}
            if(correctAnswers >= 4){
              Swal.fire({
              title: "Certified chismosa!",
              text: correctAnswers + ' / ' + totalQuestions,
              icon: "success"
            });
            setTimeout(() => {
              window.location.reload();
            }, 5000)
            }
          }else{
            Swal.fire("Sagutan mo lahat beh.");
          }
        }}>Submit</Button>
      </CardActions>
          </CardContent>
          {/* <CardActionArea>
            <Button variant="contained">Submit</Button>
          </CardActionArea> */}
        </Card>
    </Grid2>
  )
}

export default App
