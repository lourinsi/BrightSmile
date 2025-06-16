// src/components/ActivityList.tsx
import React from 'react';
import type { Activity } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    // Replaced 'activity-section' with Tailwind classes for padding, border-radius, margin-top, and shadow
    <div className="p-4 rounded-xl mt-6 shadow-sm bg-white">
      {/* Make header bold as per Dashboard.png */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h2>
      <p className="text-sm text-gray-500 mb-4">Latest updates and changes</p>
      {/* Replaced 'activity-list' with flex column if needed, otherwise no explicit styling necessary here */}
      <div className="flex flex-col">
        {activities.map(activity => (
          // Replaced 'activity-item' with Tailwind flex, justify-between, align-center, padding and border
          <div key={activity.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
            {/* 'icon' div with Tailwind for font size and margin */}
            <span className="text-xl mr-3 text-gray-600">📄</span>
            {/* 'activity-details' with Tailwind flex-grow, text color and size */}
            <div className="flex-grow text-gray-800">
              <h4 className="text-base font-medium">{activity.patientName}</h4>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            {/* 'activity-time' with Tailwind text color and size */}
            <div className="text-right ml-4"> {/* Added ml-4 for spacing */}
              <span className="text-sm text-gray-500">{formatDistanceToNow(activity.timestamp)} ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
