import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { Home as HomeIcon, Clock, BarChart2, Phone, MessageSquare, Video, Info, Calendar, Target, Trash2, Archive, Moon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as ReTooltip } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

// --- Global Context for Timeline ---
const AppContext = createContext();

// --- Components ---
const Navbar = () => {
  const activeClass = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isActive ? 'bg-[#1D4D4F] text-white' : 'text-gray-600 hover:bg-gray-100'}`;
  
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white border-b sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-[#1D4D4F]">KeenKeeper</Link>
      <div className="flex gap-4">
        <NavLink to="/" className={activeClass}><HomeIcon size={18}/> Home</NavLink>
        <NavLink to="/timeline" className={activeClass}><Clock size={18}/> Timeline</NavLink>
        <NavLink to="/stats" className={activeClass}><BarChart2 size={18}/> Stats</NavLink>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#1D4D4F] text-white py-12 text-center mt-auto">
    <h2 className="text-3xl font-bold mb-4">KeenKeeper</h2>
    <p className="text-gray-300 max-w-md mx-auto mb-6">We assist in friendship upkeep to maintain connections throughout your life.</p>
    <div className="flex justify-center gap-4 text-sm text-gray-400">
      <span>Privacy Policy</span> <span>Privacy Policy</span> <span>Contact</span>
    </div>
  </footer>
);

// --- Pages ---
const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        setFriends(data);
        setTimeout(() => setLoading(false), 800);
      });
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl animate-bounce">Loading...</div>;

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Friends to keep close in your life</h1>
        <button className="bg-[#1D4D4F] text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto">
          + Add a Friend
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        {[ {label: 'Total Friends', val: friends.length}, {label: 'Recent Check-ins', val: 8}, {label: 'Upcoming Birthdays', val: 3}, {label: 'High Scores', val: 9} ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border text-center">
            <p className="text-2xl font-bold">{s.val}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {friends.map(friend => (
          <Link to={`/friend/${friend.id}`} key={friend.id} className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
            <img src={friend.picture} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-white shadow-md" alt="" />
            <h3 className="font-bold text-center mb-2">{friend.name}</h3>
            <p className="text-xs text-center text-gray-500 mb-3">{friend.days_since_contact} days since contact</p>
            <div className="flex justify-center gap-2 mb-4">
               {friend.tags.map(t => <span key={t} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">{t}</span>)}
            </div>
            <div className={`text-center py-1 rounded text-xs font-bold uppercase ${friend.status === 'overdue' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {friend.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FriendDetails = () => {
  const { id } = useParams();
  const { addLog } = useContext(AppContext);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => setFriend(data.find(f => f.id === parseInt(id))));
  }, [id]);

  if (!friend) return <div className="p-20 text-center">Friend not found!</div>;

  const handleAction = (type) => {
    addLog({ date: new Date().toLocaleDateString(), type, title: `${type} with ${friend.name}` });
    toast.success(`Logged ${type} with ${friend.name}`);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="bg-white p-8 rounded-3xl border text-center h-fit">
        <img src={friend.picture} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-50" alt="" />
        <h2 className="text-2xl font-bold">{friend.name}</h2>
        <span className="text-xs font-bold text-red-500 uppercase">{friend.status}</span>
        <div className="flex flex-wrap justify-center gap-2 my-4">
          {friend.tags.map(t => <span key={t} className="bg-gray-100 px-3 py-1 rounded-full text-xs">{t}</span>)}
        </div>
        <p className="text-gray-500 text-sm mb-6 italic">"{friend.bio}"</p>
        <div className="flex flex-col gap-2">
          <button className="w-full py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50"><Clock size={16}/> Snooze 2 Weeks</button>
          <button className="w-full py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50"><Archive size={16}/> Archive</button>
          <button className="w-full py-2 border rounded-lg text-sm text-red-500 flex items-center justify-center gap-2 hover:bg-red-50"><Trash2 size={16}/> Delete</button>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border text-center">
            <p className="font-bold">{friend.days_since_contact}</p>
            <p className="text-[10px] text-gray-400">Days Since Contact</p>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <p className="font-bold">{friend.goal}</p>
            <p className="text-[10px] text-gray-400">Goal (Days)</p>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <p className="font-bold text-xs">{friend.next_due_date}</p>
            <p className="text-[10px] text-gray-400">Next Due Date</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
           <h4 className="font-bold mb-4">Relationship Goal Card</h4>
           <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <span>Current Goal: {friend.goal} days</span>
              <button className="text-blue-600 text-sm font-bold">Edit</button>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <h4 className="font-bold mb-4">Quick Check-In</h4>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => handleAction('Call')} className="flex flex-col items-center p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition">
              <Phone size={24}/> <span className="text-xs mt-2 font-bold">Call</span>
            </button>
            <button onClick={() => handleAction('Text')} className="flex flex-col items-center p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition">
              <MessageSquare size={24}/> <span className="text-xs mt-2 font-bold">Text</span>
            </button>
            <button onClick={() => handleAction('Video')} className="flex flex-col items-center p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition">
              <Video size={24}/> <span className="text-xs mt-2 font-bold">Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelinePage = () => {
  const { logs } = useContext(AppContext);
  const [filter, setFilter] = useState('All');

  const filteredLogs = filter === 'All' ? logs : logs.filter(l => l.type === filter);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Timeline</h1>
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded-lg text-sm outline-none">
          <option value="All">All Interactions</option>
          <option value="Call">Calls</option>
          <option value="Text">Texts</option>
          <option value="Video">Videos</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredLogs.map((log, i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
            <div className="p-3 bg-gray-100 rounded-full">
              {log.type === 'Call' ? <Phone size={20}/> : log.type === 'Text' ? <MessageSquare size={20}/> : <Video size={20}/>}
            </div>
            <div>
              <p className="font-bold text-gray-800">{log.title}</p>
              <p className="text-xs text-gray-400">{log.date}</p>
            </div>
          </div>
        ))}
        {filteredLogs.length === 0 && <p className="text-center text-gray-400 mt-10">No history found.</p>}
      </div>
    </div>
  );
};

const StatsPage = () => {
  const { logs } = useContext(AppContext);
  const data = [
    { name: 'Call', value: logs.filter(l => l.type === 'Call').length },
    { name: 'Text', value: logs.filter(l => l.type === 'Text').length },
    { name: 'Video', value: logs.filter(l => l.type === 'Video').length },
  ];
  const COLORS = ['#1D4D4F', '#45A049', '#FFBB28'];

  return (
    <div className="p-10 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-10">Friendship Analytics</h1>
      <div className="bg-white p-10 rounded-3xl border flex flex-col items-center">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 font-bold text-2xl">Total Logs: {logs.length}</p>
      </div>
    </div>
  );
};

// --- Main App Function ---
export default function App() {
  const [logs, setLogs] = useState([]);
  const addLog = (newLog) => setLogs([newLog, ...logs]);

  return (
    <AppContext.Provider value={{ logs, addLog }}>
      <Router>
        <div className="min-h-screen bg-[#F9FBFA] flex flex-col font-sans">
          <Toaster />
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friend/:id" element={<FriendDetails />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="*" element={<div className="text-center p-20 text-4xl font-bold">404 - Not Found</div>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}