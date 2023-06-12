import React from 'react'

const FormField = ({lableName, placeholder, inputType,
     value, handleChange, isTextArea }) => {

  return (
    <>
    <label className='flex-1 w-full flex flex-col'>
        {/* condition rendering in form elements for dinamic use */}
        {/* condition render for lableName */}
        {lableName &&(
        <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>
            {lableName}
        </span>
        )}
        {/* condition render for textArea 
        if is not then input with the type and set value */}
        {isTextArea ? (
            <textarea 
            required
            value={value}
            onChange={handleChange}
            rows={10}
            placeholder={placeholder}
            className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px]
            border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px]
            placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[320px]'
            />
        ) : (
            <input 
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            step={0.1}
            placeholder={placeholder}
            className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px]
            border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px]
            placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[320px]'
            />
        )} 
    </label>
    </>
  )
}

export default FormField