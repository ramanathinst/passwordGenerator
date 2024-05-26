import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if(numAllowed) str += '0123456789'
      if(charAllowed) str += '@#${*^!%)'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()
        * str.length + 1);

      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numAllowed, passwordGenerator])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password]) 
  

  return (
    <>
      <div className="max-w-md mx-auto bg-gray-800 text-orange-700 py-2 px-5 rounded-xl shadow mt-5">
        <h1 className='text-white text-center mb-4 font-bold'>Password Generator</h1>

        <div className='flex rounded overflow-hidden mb-6'>
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className='w-full py-1 px-1 outline-none'
            placeholder='password' />
          <button 
          onClick={copyPasswordToClipboard}
          className='text-white font-bold bg-blue-800 py-1 px-2 hover:bg-indigo-950 hover:text-blue-400'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-3'>
          <div className='flex text-center gap-x-1'>
            <input type="range"
              value={length}
              min={6}
              max={15}
              onChange={(e) => {
                setLength(e.target.value)
              }}
              className='cursor-pointer' />
            <label htmlFor="">Length:{length} </label>
          </div>

          <div className='flex text-center gap-x-1'>
            <input type="checkbox"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
              className='cursor-pointer' />
            <label htmlFor="">Number</label>
          </div>

          <div className='flex text-center gap-x-1'>
            <input type="checkbox"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              className='cursor-pointer' />
            <label htmlFor="">Characters</label>
          </div>
        </div>


      </div>
  
    </>
  )
}

export default App
