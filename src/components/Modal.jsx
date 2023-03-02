
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faPlus,faXmarkCircle,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

export default function Modal({...propts}) {

    const [value,setValue] = useState("")
    const [value2,setValue2] = useState("")
    function onSubmit(e){
        e.preventDefault()
        if((value&&value2) !== ""){
            propts.setTodos([
                ...propts.todos,
                {
                    id:propts.todos.length + 1,
                    text:value.trim(),
                    text2:value2.trim(),
                    checkboxs:false
                  }
            ])
            propts.setModalCreate(false)
        }
        setValue("")
        setValue2("")
    }
  return (
    <>
        <div 
            aria-hidden="true" tabIndex={-1}
            className='
                justify-center items-center flex overflow-x-hidden 
                overflow-auto fixed inset-0 z-50 outline-none focus:outline-none
                md:h-full md:inset-0 h-modal p-4 w-full fixed'
        >
            <div className="relative w-full my-6 mx-auto max-w-3xl h-full h-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">
                            <FontAwesomeIcon icon={faFileUpload} className="mr-2"/>
                            todo list
                        </h3>
                        <button
                            className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center"
                            onClick={()=>propts.setModalCreate(false)}
                        >
                            <FontAwesomeIcon icon={faXmarkCircle}/>
                        </button>
                    </div>
                    <div className="relative p-2 flex-auto">
                        <form 
                            className='bg-gray-200 shadow-md rounded px-4 pt-6 pb-8 w-full'
                            onSubmit={onSubmit}
                        >
                            <div>
                                <label className="block text-black text-sm font-bold mb-1">
                                หัวข้อ
                                </label>
                                <input 
                                    className='shadow appearance-none border rounded w-full py-2 px-1 text-black'
                                    placeholder='หัวข้อ' value={value} onChange={(e)=>setValue(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className='mt-4'>
                                <label className="block text-black text-sm font-bold mb-1">
                                  detail
                                </label>
                                <textarea 
                                    rows={4}
                                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='detail' value={value2} onChange={(e)=>setValue2(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button
                              className="mt-5 w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              type="submit"
                            >
                              บันทึก <FontAwesomeIcon icon={faFloppyDisk} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
