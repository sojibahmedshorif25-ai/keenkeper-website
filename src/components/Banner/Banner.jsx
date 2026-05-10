import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

const Banner = ({ friends }) => {
    const [timeline, setTimeline] = useState([]);
    const total = friends.length;

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("timeline")) || [];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeline(stored);
    }, []);

    const onTrack = friends.filter(f => f.status === "On-Track").length;
    const almostDue = friends.filter(f => f.status === "Almost Due").length;
    const overdue = friends.filter(f => f.status === "Overdue").length;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyInteractions = timeline.filter((item) => {
        const date = new Date(item.date);
        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
    }).length;

    return (
        <div className="text-center py-12 px-4">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Friends to keep close in your life
            </h1>

            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>

            <button className="mt-6 bg-[#244D3F] text-white px-5 py-2 rounded-md flex items-center gap-2 mx-auto hover:bg-green-700 transition">
                <FaPlus /> Add a Friend
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-[80%] mx-auto">

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-3xl font-semibold text-[#244D3F]">{total}</h2>
                    <p className="text-gray-500 ">Total Friends</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-3xl font-semibold text-[#244D3F]">{onTrack}</h2>
                    <p className="text-gray-500 ">On Track</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-3xl font-semibold text-[#244D3F]">{almostDue + overdue}</h2>
                    <p className="text-gray-500 ">Need Attention</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-3xl font-semibold text-[#244D3F]">
                        {monthlyInteractions}
                    </h2>
                    <p className="text-gray-500 ">Interactions This Month</p>
                </div>
            </div>
            <div className="max-w-[80%] mx-auto mt-15 border-t border-gray-200 "></div>
        </div>
    );
};

export default Banner;