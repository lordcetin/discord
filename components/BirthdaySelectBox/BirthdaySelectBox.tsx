/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { Fragment, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

type Props = {
  setSelectedDay:any;
  setSelectedMonth:any;
  setSelectedYear:any;
  selectedDay:any;
  selectedMonth:any;
  selectedYear:any
}

const BirthdaySelectBox = ({setSelectedDay,setSelectedMonth,setSelectedYear,selectedDay,selectedMonth,selectedYear}: Props) => {

  const [openDay,setOpenDay] = useState(false)
  const [openMonth,setOpenMonth] = useState(false)
  const [openYear,setOpenYear] = useState(false)

  const day = [
    {value:"1"},
    {value:"2"},
    {value:"3"},
    {value:"4"},
    {value:"5"},
    {value:"6"},
    {value:"7"},
    {value:"8"},
    {value:"9"},
    {value:"10"},
    {value:"11"},
    {value:"12"},
    {value:"13"},
    {value:"14"},
    {value:"15"},
    {value:"16"},
    {value:"17"},
    {value:"18"},
    {value:"19"},
    {value:"20"},
    {value:"21"},
    {value:"22"},
    {value:"23"},
    {value:"24"},
    {value:"25"},
    {value:"26"},
    {value:"27"},
    {value:"28"},
    {value:"29"},
    {value:"30"},
    {value:"31"},
  ]

  const month = [
    {id:1,value:"January"},
    {id:2,value:"February"},
    {id:3,value:"March"},
    {id:4,value:"April"},
    {id:5,value:"May"},
    {id:6,value:"June"},
    {id:7,value:"July"},
    {id:8,value:"August"},
    {id:9,value:"September"},
    {id:10,value:"October"},
    {id:11,value:"November"},
    {id:12,value:"December"},
  ]

  const year = [
    {value:"1950"},
    {value:"1951"},
    {value:"1952"},
    {value:"1953"},
    {value:"1954"},
    {value:"1955"},
    {value:"1956"},
    {value:"1957"},
    {value:"1958"},
    {value:"1959"},
    {value:"1960"},
    {value:"1961"},
    {value:"1962"},
    {value:"1963"},
    {value:"1964"},
    {value:"1965"},
    {value:"1966"},
    {value:"1967"},
    {value:"1968"},
    {value:"1969"},
    {value:"1970"},
    {value:"1971"},
    {value:"1972"},
    {value:"1973"},
    {value:"1974"},
    {value:"1975"},
    {value:"1976"},
    {value:"1977"},
    {value:"1978"},
    {value:"1979"},
    {value:"1980"},
    {value:"1981"},
    {value:"1982"},
    {value:"1983"},
    {value:"1984"},
    {value:"1985"},
    {value:"1986"},
    {value:"1987"},
    {value:"1988"},
    {value:"1989"},
    {value:"1990"},
    {value:"1991"},
    {value:"1992"},
    {value:"1993"},
    {value:"1994"},
    {value:"1995"},
    {value:"1996"},
    {value:"1997"},
    {value:"1998"},
    {value:"1999"},
    {value:"2000"},
    {value:"2001"},
    {value:"2002"},
    {value:"2003"},
    {value:"2004"},
    {value:"2005"},
    {value:"2006"},
    {value:"2007"},
    {value:"2008"},
    {value:"2009"},
    {value:"2010"},
    {value:"2011"},
    {value:"2012"},
    {value:"2013"},
    {value:"2014"},
    {value:"2015"},
    {value:"2016"},
    {value:"2017"},
    {value:"2018"},
    {value:"2019"},
    {value:"2020"},
    {value:"2021"},
    {value:"2022"},
    {value:"2023"},
    {value:"2024"},
  ]


  return (
    <div className='flex items-center w-full gap-x-4'>

      <div onClick={() => setOpenDay(!openDay)} className='rounded-sm p-2 justify-between bg-black/35 mt-2 flex items-center relative w-[135px]'>
        <h1 className='text-sm text-neutral-400'>{selectedDay}</h1>
        <FaChevronDown className={openDay ? 'text-neutral-400 rotate-180 transition-all' : 'text-neutral-400 rotate-0 transition-all'}/>
      {openDay && 
      <div className='flex-col items-center w-[126px] h-52 overflow-x-hidden overflow-y-auto absolute top-10 left-0 bg-neutral-900 z-[999] p-1 rounded'>
      {day?.map((item:any,index:any) => (
        <Fragment key={index}>
          <div onClick={() => setSelectedDay(day[index]?.value)} className='cursor-pointer hover:bg-black/50 p-2 rounded text-neutral-400'>{item?.value}</div>
        </Fragment>
      ))}
      </div>}
      </div>

      <div onClick={() => setOpenMonth(!openMonth)} className='rounded-sm p-2 justify-between bg-black/35 mt-2 flex items-center relative w-[138px]'>
        <h1 className='text-sm text-neutral-400'>{selectedMonth !== 'Month' ?  month[selectedMonth - 1]?.value : selectedMonth}</h1>
        <FaChevronDown className={openMonth ? 'text-neutral-400 rotate-180 transition-all' : 'text-neutral-400 rotate-0 transition-all'}/>
      {openMonth && 
      <div className='flex-col items-center w-[138px] h-52 overflow-x-hidden overflow-y-auto absolute top-10 left-0 bg-neutral-900 z-[999] p-1 rounded'>
      {month?.map((item:any,index:any) => (
        <Fragment key={index}>
          <div onClick={() => setSelectedMonth(month[index]?.id)} className='cursor-pointer hover:bg-black/50 p-2 rounded text-neutral-400'>{item?.value}</div>
        </Fragment>
      ))}
      </div>}
      </div>

      <div onClick={() => setOpenYear(!openYear)} className='rounded-sm p-2 justify-between bg-black/35 mt-2 flex items-center relative w-[138px]'>
        <h1 className='text-sm text-neutral-400'>{selectedYear}</h1>
        <FaChevronDown className={openYear ? 'text-neutral-400 rotate-180 transition-all' : 'text-neutral-400 rotate-0 transition-all'}/>
      {openYear && 
      <div className='flex-col items-center w-[127px] h-52 overflow-x-hidden overflow-y-auto absolute top-10 left-0 bg-neutral-900 z-[999] p-1 rounded'>
      {year.reverse()?.map((item:any,index:any) => (
        <Fragment key={index}>
          <div onClick={() => setSelectedYear(year[index]?.value)} className='cursor-pointer hover:bg-black/50 p-2 rounded text-neutral-400'>{item?.value}</div>
        </Fragment>
      ))}
      </div>}
      </div>

    </div>
  )
}

export default BirthdaySelectBox