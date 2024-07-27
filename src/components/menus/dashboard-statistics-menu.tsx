import React from 'react'
import ProgressChart from '../charts/progress-chart'

const DashboardStatisticMenu = () => {
    return (
        <div className='flex flex-col space-y-4'>
            <h1 className='text-[32px]'>Your Statistics</h1>
            <div className='flex flex-row space-x-12'>
                <button>
                    <p className='font-bold hover:bg-gray-50/30'>Learning Hours</p>
                </button>
                <button>
                    <p className='font-bold hover:bg-gray-50/30'>My Courses</p>
                </button>
                <select name='times' id='times' className='text-black bg-transparent font-bold'>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value={"anually"}>Annually</option>
                </select>
            </div>
            <ProgressChart/>
        </div>
    )
}

export default DashboardStatisticMenu
