import { useState,useEffect } from 'react'
import { faEdit, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './components/Modal'
import ModalEdit from './components/ModalEdit'


const App = ()=>{

  
  const [todos,setTodos] = useState(()=>{
    const saveTodo = localStorage.getItem("todox")
    //console.log(JSON.parse(saveTodo))
    if(saveTodo){
      return JSON.parse(saveTodo)
    }else{
      return []
    }
    
  })

  const [current,setCurrent] = useState({})

  const [query,setQuery] = useState("")

  useEffect(()=>{

    localStorage.setItem("todox",JSON.stringify(todos))

  },[todos])


/*  */

  function onDelete(id){
    const trashItem = todos.filter(todo=>{
      return todo.id !== id
    })
    setTodos(trashItem)
  }


  const handleComplete = (e,todop,Id) => {
    console.log(todop.id)
    console.log(e.target.checked)
    
    const newTodo = todos.map(restodo=>{
      if(restodo.id === Id){
        return {...restodo,checkboxs: !restodo.checkboxs}
      }
      return restodo
    })
    setTodos(newTodo)
    
  };


  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  function handleEditModal(todox){
    setShowModalEdit(true)
    setCurrent({...todox})
  }


  return (
    <div className="justify-center flex w-full content-evenly py-8">
      <div className='border w-full' >
        <p className="text-center py-5 text-3xl font-bold text-sky-400">todolist</p>
        <div className="py-4 px-3 flex">
          <button type='button' className='
            text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 
            font-medium rounded-lg text-sm text-center inline-flex items-center 
            dark:focus:ring-[#1da1f2]/55 py-2 px-5 mr-5 ml-auto'
            onClick={()=>setShowModalCreate(true)}
          ><FontAwesomeIcon icon={faSquarePlus} className="mr-2" /> create</button>
          <input 
            className='
              bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 
              block w-full md:w-full lg:w-1/2 xl:w-1/3 p-2 mr-5' 
              placeholder='ค้นหา'
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 p-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
         {todos.filter((post)=>{
          if(query === ""){
            return post
          }else if(post.text.toLowerCase().includes(query.toLowerCase())){
            return post
          }else if(post.text2.toLowerCase().includes(query.toLowerCase())){
            return post
          }
         }).map((todo,index)=>(
          <div className='w-full rounded-2xl overflow-hidden shadow-2xl h-full bg-white border border-gray-200' key={index}>
            <ul className="flex flex-wrap p-4 font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
              <li className="">
                 <p className='text-xl'>หัวข้อ {todo.text}</p>
              </li>
              <li className="ml-auto">
                <input type={"checkbox"} className="w-6 h-6"
                    value={todo.checkboxs} 
                    onChange={(e)=>handleComplete(e,todo,todo.id)} 
                  defaultChecked={todo.checkboxs}
                />
              </li>
            </ul>
            <div className="w-full p-2 h-100">
              <div>
                <div className='h-full bg-gray-100' style={{height:"140px"}}>
                  <p className='text-gray-700 text-base'>
                  {todo.text2}
                  </p>
                </div>
        
                <div className='flex mt-2'>
                  <button type='buttom' 
                    className='ml-auto text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 
                    focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' 
                    onClick={()=>handleEditModal(todo)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> แก้ไข
                  </button>
                  <button type='buttom' 
                    className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 
                    focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' 
                    onClick={()=> onDelete(todo.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> ลบ
                  </button>
                </div>
              </div>
              
            </div>
          </div>
         ))}
        </div>
      </div>
      {showModalCreate ? <Modal setModalCreate={setShowModalCreate} setTodos={setTodos} todos={todos} /> : null}
      {showModalEdit ? <ModalEdit setModalEdit={setShowModalEdit} setCurrent={setCurrent} current={current} todos={todos} setTodos={setTodos} /> : null}
    </div>
  )
  
}

export default App
