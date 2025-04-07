'use client'
import { useState } from 'react';
import { HotelData } from '@/data/index'
import FreeCancelation from './FreeCancelation'

const RoomChoices = () => {
    const [activeTab, setActiveTab] = useState('free-cancellation');

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <h2 className="lg:text-5xl md:text-3xl tet-2xl font-bold">Room Choices</h2>

            {/* Tab Buttons */}
            <div className="flex gap-6 my-8 mb-16">
                <button
                    className={`px-4 py-2 rounded-full font-medium ${activeTab === 'free-cancellation'
                        ? 'bg-orange text-white'
                        : 'border border-gray2 text-gray2'
                        }`}
                    onClick={() => setActiveTab('free-cancellation')}
                >
                    Free Cancellation
                </button>
                <button
                    className={`px-4 py-2 rounded-full font-medium ${activeTab === 'breakfast-included'
                        ? 'bg-orange text-white'
                        : 'border border-gray2 text-gray2'
                        }`}
                    onClick={() => setActiveTab('breakfast-included')}
                >
                    Breakfast Included
                </button>
            </div>

            {/* Tab Content */}
            <div className="text-center w-full">
                {activeTab === 'free-cancellation' && (
                    <div className='w-full'>
                        <FreeCancelation data={HotelData} />
                    </div>
                )}
                {activeTab === 'breakfast-included' && (
                    <div className='w-full'>
                    <FreeCancelation data={HotelData} />
                </div>
                )}
            </div>
        </div>
    );
};

export default RoomChoices;
