import { useState, useEffect } from 'react';
import { Clock, Phone, MessageCircle, Video } from 'lucide-react';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState('All');

  // এখনো ডেটা নেই, তাই ডামি ডেটা
  useEffect(() => {
    setTimeline([
      { id: 1, date: "Apr 18, 2026", type: "Call", title: "Call with Rahim Khan" },
      { id: 2, date: "Apr 17, 2026", type: "Text", title: "Text with Sadia Ahmed" },
      { id: 3, date: "Apr 16, 2026", type: "Video", title: "Video with Tanvir Hossain" },
    ]);
  }, []);

  const filteredTimeline = filter === 'All' 
    ? timeline 
    : timeline.filter(item => item.type === filter);

  const getIcon = (type) => {
    if (type === 'Call') return <Phone className="w-5 h-5 text-green-500" />;
    if (type === 'Text') return <MessageCircle className="w-5 h-5 text-blue-500" />;
    return <Video className="w-5 h-5 text-purple-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Timeline</h1>

      <div className="flex gap-3 mb-8">
        {['All', 'Call', 'Text', 'Video'].map(item => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-full text-sm font-medium ${filter === item ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTimeline.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl flex gap-4 items-start">
            <div className="mt-1">{getIcon(item.type)}</div>
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;