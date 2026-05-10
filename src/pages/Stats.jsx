import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Stats = () => {
  const data = [
    { name: 'Call', value: 12, color: '#10B981' },
    { name: 'Text', value: 8, color: '#3B82F6' },
    { name: 'Video', value: 5, color: '#8B5CF6' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">Friendship Analytics</h1>

      <div className="bg-white p-10 rounded-3xl shadow-sm">
        <h2 className="text-xl font-semibold mb-8 text-center">Interaction Types</h2>
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Stats;