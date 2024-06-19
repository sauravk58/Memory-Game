import './App.css';
import {useState,useEffect} from 'react';
//for 4x4=>16 box.
const getNums=()=>{
  const array=[];
  for(let i=1;i<=8;i++){
    array.push(i);
    array.push(i);
  }
  return array;
}
function App() {
  const [nums,setNums]=useState(getNums())
  const [stage,setStage]=useState('initial');
  const [opened,setOpened]=useState([]);
  const [solvedList,setSolvedList] = useState([]);
  const randdomNums=()=>{
    const copyNums=[...nums];
    return copyNums.sort(()=>Math.random()-0.5);
  }
  const handleStart=()=>{
    setStage('start');
    setNums(randdomNums());
    setSolvedList([]);
  }
  const handleClick=(num,index)=>{
    if(opened.length===2)
    return
    setOpened((prev)=>[...prev,index])
  }

  useEffect(()=>{
    if(opened.length===2){
      //num equal
      setTimeout(()=>{
        const id1=opened[0];
        const id2=opened[1];
        if(nums[id1]===nums[id2]){//if equal then remove the cards.
          setSolvedList((prev)=>[...prev,nums[id1]])
          setOpened([]);
        }
        else{//if card is not equal
          setOpened([]);
        }
      },1000)
    }

  },[opened])
  //to show win statement
  useEffect(()=>{
    if(solvedList.length===8){
      setStage('win');
    }
  })
  //to hide the card 
  const getClassName=(num,index)=>{
    if(solvedList.includes(num)){
      return 'remove';
    }
    else if(opened.includes(index)){
      return 'show';
    }
    else return 'hide';
  }
  return (
    <div className="App">
      <h1>Memory Game</h1>
      {stage==='initial' && 
      <button onClick={handleStart}>Play Game</button>}
      {
        stage==='start' &&
        <div className='game'>
          <div className='cards'>
            {
              nums.map((num,i)=>(
                <div key={i} className={`card ${getClassName(num,i)}`}
                onClick={()=>handleClick(num,i)}>{num}
                  </div>
              ))
            }
          </div>
        </div>
      }
      {
      stage==='win' &&
      <div>
        <h1>You won the Game!</h1>
        <button onClick={handleStart}>Play Again</button>
      </div>
    }
    </div>
   
  );
}

export default App;
