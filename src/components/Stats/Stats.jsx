import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

const Stats = () => {
    const [data, setData] = useState([]);

    useEffect(() => {

        const loadData = () => {
            const stored = JSON.parse(localStorage.getItem("timeline")) || [];

            const counts = {
                Call: 0,
                Text: 0,
                Video: 0,
            };

            stored.forEach((item) => {
                if (counts[item.type] !== undefined) {
                    counts[item.type]++;
                }
            });

            setData([
                { name: "Text", value: counts.Text },
                { name: "Call", value: counts.Call },
                { name: "Video", value: counts.Video },
            ]);
        };

        loadData();

        window.addEventListener("storage", loadData);

        return () => {
            window.removeEventListener("storage", loadData);
        };

    }, []);

    const COLORS = [
        "#7C3AED",
        "#244D3F",
        "#22C55E",
    ];

    return (
        <div className="bg-[#F8FAFC] py-10">
            <div className="max-w-[80%] mx-auto px-4">

                <h1 className="text-5xl font-bold text-[#1F2937] mb-6">
                    Friendship Analytics
                </h1>

                <div className="bg-white rounded-xl shadow-sm p-6">

                    <h3 className="text-[#244D3F] mb-4 font-medium text-xl">
                        By Interaction Type
                    </h3>

                    <div className="flex flex-col items-center justify-center">

                        <div className="w-110 h-110">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        innerRadius={110}
                                        outerRadius={160}
                                        paddingAngle={5}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex gap-6 mt-4 text-gray-500 text-2xl">

                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#7C3AED]"></span>
                                Text
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#244D3F]"></span>
                                Call
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#22C55E]"></span>
                                Video
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Stats;