import React from 'react';
import type { Activity } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className="activity-section">
      <h2>Recent Activity</h2>
      <p>Latest updates and changes</p>
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <span className="icon">📄</span>
            <div className="activity-details">
              <h4>{activity.patientName}</h4>
              <p>{activity.description}</p>
            </div>
            <div className="activity-time">
              <span>{formatDistanceToNow(activity.timestamp)} ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;