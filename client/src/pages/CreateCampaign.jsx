import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {ethers} from 'ethers'

import { useStateContext } from '../context'

import { CustomButton, FormField, Loader } from '../components'
import { checkIfImage } from '../utils'
import { money } from '../assets'



const CreateCampaign = () => {

  // 1) initializating the useNavigate hook with const datatype name navigate
  const navigate = useNavigate();

  // 2) declaring the state variable initially set to "false "
  const [isLoading, setIsLoading] = useState(false);

  const { createCampaign } = useStateContext();
  // 3) declaring empty state variable object for integrating form elements
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  })
  
  
  
  //  this function takes the value of field and save them in 
  //  an array,( first of all, spread the form values and traget the 
  //  valuable data)
  const handleFormFieldChange = (fieldName, e) => {
    // setForm is an function which update the state variable
    setForm({ ...form, [fieldName]: e.target.value})
  }

  // 6) creating and function that submit form 
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })

    console.log(form)
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader/>}
      {/* 4) creating and heading that intitute start campaign */}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a Campaign
        </h1>
      </div>
      {/* 5) creating a form to start campaign */}
      <form 
      onSubmit={handleSubmit}
      className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          {/* 7) making and reusable field component that is used multiple times  */}
          <FormField 
          lableName = 'Your Name*'
          placeholder = "Ex-Jaiprakash"
          inputType = 'text'
          value ={form.name}
          handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
          lableName = 'Campaign Title*'
          placeholder = "Write a Title"
          inputType = 'text'
          value ={form.title}
          handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
          lableName = 'Story*'
          placeholder = "Write your Story"
          isTextArea
          value ={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

          <div className='w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
            <img src={money} alt='money' className='w-[40px] h-[40] object-contain '/>
            <h4 className='font-epilogue font-bold text-white text-[25px] ml-[20px]'>
              You will get 100% of the raised amount
            </h4>
          </div>

          <div className='flex flex-wrap gap-[40px]'>
          {/* 7) making and reusable field component that is used multiple times  */}
          <FormField 
          lableName = 'Goal*'
          placeholder = "ETH 0.50"
          inputType = 'text'
          value ={form.target}
          handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
          lableName = 'End Date*'
          placeholder = "End Date"
          inputType = 'date'
          value ={form.deadline}
          handleChange={(e) => handleFormFieldChange('deadline' , e)}
          />
        </div>

        <FormField 
          lableName = 'Campaign Image *'
          placeholder = "Place image URL of your campaign"
          inputType = 'url'
          value ={form.image}
          handleChange={(e) => handleFormFieldChange('image' , e)}
        />

        <div className='flex justify-center items-center mt-[20px]'>
            <CustomButton 
            btnType="submit"
            title='Submit new campaign'
            styles={`bg-[#1dc071]`}
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign