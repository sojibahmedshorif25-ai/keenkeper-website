import { useNavigate } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === 'overdue') return 'bg-overdue text-white';
    if (status === 'almost') return 'bg-almost text-white';
    return 'bg-ontrack text-white';
  };

  return (
    <div 
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="card-hover bg-white rounded-2xl shadow-sm border border-gray-100 p-5 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img 
          src={friend.picture} 
          alt={friend.name}
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{friend.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail size={14} /> {friend.email}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-gray-600">{friend.days_since_contact} days ago</span>
        </div>
        
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(friend.status)}`}>
          {friend.status === 'overdue' ? 'Overdue' : 
           friend.status === 'almost' ? 'Almost Due' : 'On Track'}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {friend.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FriendCard;