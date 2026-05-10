import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Phone, MessageCircle, Video, Clock, Edit, Archive, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch('/src/data/friends.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(f => f.id === parseInt(id));
        setFriend(found);
      });
  }, [id]);

  const handleQuickCheckIn = (type) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      type: type,
      title: `${type} with ${friend?.name}`,
    };

    setTimeline([newEntry, ...timeline]);
    toast.success(`${type} logged successfully!`, {
      icon: type === 'Call' ? '📞' : type === 'Text' ? '💬' : '🎥'
    });
  };

  if (!friend) return <div className="text-center py-20">Loading...</div>;

  const statusColor = friend.status === 'overdue' ? 'text-overdue' : 
                      friend.status === 'almost' ? 'text-almost' : 'text-ontrack';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 text-sm flex items-center gap-2 text-gray-500 hover:text-primary"
      >
        ← Back to Home
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Friend Info */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <img 
            src={friend.picture} 
            alt={friend.name}
            className="w-32 h-32 rounded-2xl object-cover mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-center">{friend.name}</h1>
          
          <div className={`text-center mt-2 font-medium ${statusColor}`}>
            {friend.status.toUpperCase()}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {friend.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-xs px-4 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>

          <p className="mt-8 text-gray-600 text-center">{friend.bio}</p>
          <p className="text-center text-sm mt-4 text-gray-500">{friend.email}</p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-2xl">
              <Clock className="w-6 h-6 text-gray-400" />
              <span className="text-xs">Snooze 2 Weeks</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-2xl">
              <Archive className="w-6 h-6 text-gray-400" />
              <span className="text-xs">Archive</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-2xl text-red-500">
              <Trash2 className="w-6 h-6" />
              <span className="text-xs">Delete</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl text-center">
              <p className="text-3xl font-bold">{friend.days_since_contact}</p>
              <p className="text-sm text-gray-500">Days Since Contact</p>
            </div>
            <div className="bg-white p-5 rounded-2xl text-center">
              <p className="text-3xl font-bold">{friend.goal}</p>
              <p className="text-sm text-gray-500">Goal (Days)</p>
            </div>
            <div className="bg-white p-5 rounded-2xl text-center">
              <p className="text-sm font-medium">{friend.next_due_date}</p>
              <p className="text-sm text-gray-500">Next Due</p>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white rounded-3xl p-8">
            <h3 className="font-semibold mb-5">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleQuickCheckIn('Call')} className="flex flex-col items-center gap-3 p-6 hover:bg-emerald-50 rounded-2xl transition">
                <Phone className="w-8 h-8 text-accent" />
                <span>Call</span>
              </button>
              <button onClick={() => handleQuickCheckIn('Text')} className="flex flex-col items-center gap-3 p-6 hover:bg-emerald-50 rounded-2xl transition">
                <MessageCircle className="w-8 h-8 text-accent" />
                <span>Text</span>
              </button>
              <button onClick={() => handleQuickCheckIn('Video')} className="flex flex-col items-center gap-3 p-6 hover:bg-emerald-50 rounded-2xl transition">
                <Video className="w-8 h-8 text-accent" />
                <span>Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;