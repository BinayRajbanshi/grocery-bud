import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

// notice the data is obtained from the localstorage before the app
const getLocalStorage = () =>{
  let list = localStorage.getItem('hello there');
  if(list){
    return JSON.parse(localStorage.getItem('hello there'))
  }
  else{
    return []
  }
}


function App() {
  const[name, setName] = useState('')
  const[list, setList] = useState(getLocalStorage())
  const[isEditing,setIsEditing] = useState(false)
  const[editId , setEditId]= useState(null)
  const[alert, setAlert]=useState({show:false , msg:'' , type:''})

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name) //thsi means if name is false i.e. if the name is empty
    {
      // display alert
     showAlert(true ,'danger' , 'please input some value' )
    }
    else if(name && isEditing){
     setList(list.map((item)=>{
       if(item.id===editId){
         return {...item , title:name}
       }
       return item;
     }))
     setName('')
     setEditId(null)
     setIsEditing(false)
     showAlert(true , 'success' , 'item edited')
    }
    else{
      // show alert
      const newItem = {id: Math.random()*1000 , title:name};
      setList([...list , newItem])
      setName('')
      showAlert(true , 'success' , 'Item added to your list')
    }
  }
// this is making function to set alert values so that I dont have to write multiple times 
  const showAlert = (show=false , type='' , msg='')=>{ //after equals to those are the default vlaues if no data is input
    setAlert({show,type,msg})
  }

// functionality for clear all the items
   const clearList = () =>{
     showAlert(true , 'danger' , 'All items Deleted')
     setList([])
   }

  //  functionality to remove individual item from the list
   const removeItem = (id) =>{
     showAlert(true , 'danger' , 'item removed')
     setList(list.filter((item)=>item.id !== id))
   }
  //  functionality for the localStorage
  useEffect(()=>{
    localStorage.setItem('hello there' , JSON.stringify(list))
  },[list])

  // setting the edit functionality
  const editItem = (id) =>{
    const eachItem = list.find((item)=>{
      return item.id === id
    })
    setName(eachItem.title)
    setIsEditing(true)
    setEditId(id)
  }

  return <section className='section-center'>
   
      <form onSubmit={handleSubmit} className='grocery-form'>
        {alert.show && <Alert list={list} alert={alert} removeAlert={showAlert} setAlert={setAlert}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g. eggs'
          value={name} onChange={(e)=> setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            { isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length>0 && <div className="gorcery-container">
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className='clear-btn' onClick={clearList}>
        Clear Items
      </button>
    </div>}
      
  </section>
}

export default App