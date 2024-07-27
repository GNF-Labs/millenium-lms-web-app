'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
    name: string;
    value: number;
}

const ProgressChart: React.FC = () => {
    const data: DataPoint[] = [
        { name: 'Mon', value: 12 },
        { name: 'Tue', value: 19 },
        { name: 'Wed', value: 3 },
        { name: 'Thu', value: 5 },
        { name: 'Fri', value: 2 },
        { name: 'Sat', value: 3 },
        { name: 'Sun', value: 10 },
    ];

    return (
        <div className='background1 w-full h-[300px]' >
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart
                    data={data}
                    margin={{
                        top: 30,
                        right: 50,
                        left: 10,
                        bottom: 10,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" style={{color: 'black', fontWeight:'bold'}} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="black"
                        dot={{ fill: 'black', stroke: 'black', strokeWidth: 2, r: 4 }}
                        activeDot={{ fill: 'black', stroke: 'black', strokeWidth: 2, r: 8 }}
                        name='Amount'
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProgressChart
