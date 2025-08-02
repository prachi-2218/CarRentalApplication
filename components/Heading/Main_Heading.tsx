import React from 'react'

type MainHeadingProps = {
    heading: string;
  };
  

const Main_Heading : React.FC<MainHeadingProps> = ({heading}) => {
  return (
    <>
    <h1 className="text-3xl mt-[50px] mx-3 h-14 font-bold leading-none tracking-tight text-gray-900 lg:text-4xl">{heading}</h1>
    </>
  )
}

export default Main_Heading