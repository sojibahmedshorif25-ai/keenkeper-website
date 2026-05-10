import { useParams } from "react-router-dom";
import { useState } from "react";
import {
    FaPhone,
    FaCommentDots,
    FaVideo,
    FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const Timeline = () => {
    const { id } = useParams();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const [data, setData] = useState(() => {
        return JSON.parse(localStorage.getItem("timeline")) || [];
    });

    const filteredData = data
        .filter((item) =>
            id ? String(item.friendId) === String(id) : true
        )
        .filter((item) =>
            filter === "All" ? true : item.type === filter
        )
        .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.type.toLowerCase().includes(search.toLowerCase())
        );

    const handleDelete = (deleteId) => {
        const updated = data.filter((item) => item.id !== deleteId);
        setData(updated);
        localStorage.setItem("timeline", JSON.stringify(updated));
        toast.error("Interaction deleted");
    };

    const getIcon = (type) => {
        if (type === "Call") return <FaPhone />;
        if (type === "Text") return <FaCommentDots />;
        if (type === "Video") return <FaVideo />;
        return null;
    };

    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto px-4">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Timeline
                </h1>

                <div className="mb-6 relative">
                    <input
                        type="text"
                        placeholder="Search interactions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black bg-white rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#244D3F]"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search/>
                    </span>
                </div>

                <div className="flex gap-3 mb-6">

                    <button
                        onClick={() => setFilter("All")}
                        className={`px-4 py-1 rounded-md text-sm transition duration-200 ${filter === "All"
                            ? "bg-[#244D3F] text-white"
                            : "bg-white text-black shadow-sm hover:bg-gray-100"
                            }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("Call")}
                        className={`px-4 py-1 rounded-md text-sm transition duration-200 ${filter === "Call"
                            ? "bg-[#244D3F] text-white"
                            : "bg-white text-black shadow-sm hover:bg-gray-100"
                            }`}
                    >
                        Call
                    </button>

                    <button
                        onClick={() => setFilter("Text")}
                        className={`px-4 py-1 rounded-md text-sm transition duration-200 ${filter === "Text"
                            ? "bg-[#244D3F] text-white"
                            : "bg-white text-black shadow-sm hover:bg-gray-100"
                            }`}
                    >
                        Text
                    </button>

                    <button
                        onClick={() => setFilter("Video")}
                        className={`px-4 py-1 rounded-md text-sm transition duration-200 ${filter === "Video"
                            ? "bg-[#244D3F] text-white"
                            : "bg-white text-black shadow-sm hover:bg-gray-100"
                            }`}
                    >
                        Video
                    </button>

                </div>

                <div className="flex flex-col gap-4">

                    {filteredData.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            No interactions yet
                        </p>
                    ) : (
                        filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 transition duration-200 hover:shadow-md hover:-translate-y-0.5"
                            >

                                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
                                    {getIcon(item.type)}
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {item.type} with{" "}
                                        <span className="font-semibold">
                                            {item.name}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {item.date}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 text-sm ml-auto transition duration-200 hover:text-red-700 hover:scale-110"
                                >
                                    <FaTrash />
                                </button>

                            </div>
                        ))
                    )}

                </div>
            </div>
        </div>
    );
};

export default Timeline;