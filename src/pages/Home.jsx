import { useEffect, useState } from 'react';
import FriendCard from '../components/FriendCard';
import { Plus, Users } from 'lucide-react';

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => {
        setFriends(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Banner */}
      <div className="bg-[#0A3D2B] text-white rounded-3xl p-12 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Friends to keep close in your life</h1>
        <p className="text-lg text-gray-300 mb-8">Nourish your relationships before they fade away</p>
        <button className="bg-[#10B981] hover:bg-emerald-600 px-8 py-4 rounded-2xl font-medium text-lg flex items-center gap-3 mx-auto transition">
          <Plus size={24} /> Add a Friend
        </button>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Users size={28} className="text-[#0A3D2B]" />
        <h2 className="text-3xl font-semibold text-[#0A3D2B]">Your Friends</h2>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xl">Loading friends...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;