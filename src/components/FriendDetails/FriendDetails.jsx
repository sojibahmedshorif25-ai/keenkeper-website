import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaPhone,
    FaCommentDots,
    FaVideo,
    FaClock,
    FaArchive,
    FaTrash,
    FaHistory,
} from "react-icons/fa";
import { toast } from "react-toastify";

const FriendDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [friend, setFriend] = useState(null);
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        fetch("/friends.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((f) => Number(f.id) === Number(id));
                setFriend(found || null);
            });
    }, [id]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("timeline")) || [];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeline(stored);
    }, []);

    const handleInteraction = (type) => {
        if (!friend) return;

        const newEntry = {
            id: Date.now(),
            type,
            name: friend.name,
            friendId: friend.id,
            date: new Date().toLocaleDateString(),
        };

        const existing = JSON.parse(localStorage.getItem("timeline")) || [];

        const updated = [newEntry, ...existing];

        localStorage.setItem("timeline", JSON.stringify(updated));

        setTimeline(updated);

        toast.success(`${type} added!`);
    };

    const handleDelete = (id) => {
        const updated = timeline.filter((item) => item.id !== id);
        setTimeline(updated);
        localStorage.setItem("timeline", JSON.stringify(updated));
        toast.error("Interaction deleted");
    };

    if (!friend) {
        return (
            <span className="loading loading-spinner loading-xl"></span>
        );
    }

    const {
        name,
        picture,
        email,
        status,
        tags,
        bio,
        days_since_contact,
        goal,
        next_due_date,
    } = friend;

    const statusColor =
        status === "Overdue"
            ? "bg-red-500 text-white"
            : status === "Almost Due"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-[#244D3F] text-white";

    const filteredTimeline = timeline.filter(
        (item) => item.friendId === friend.id
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">

                <div className="flex flex-col gap-4">

                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">

                        <img
                            src={picture}
                            alt={name}
                            className="w-20 h-20 rounded-full mx-auto"
                        />

                        <h2 className="mt-4 text-lg font-semibold text-gray-800">
                            {name}
                        </h2>

                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${statusColor}`}>
                            {status}
                        </span>

                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="bg-[#E6F4EA] text-[#244D3F] px-2 py-1 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="mt-3 text-sm text-gray-500 italic leading-relaxed">
                            "{bio}"
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                            Preferred: {email}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm flex flex-col gap-3">

                        <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            <FaClock className="text-gray-500" />
                            Snooze 2 Weeks
                        </button>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm flex flex-col gap-3">

                        <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            <FaArchive className="text-gray-500" />
                            Archive
                        </button>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 border border-red-300 py-3 rounded-lg text-red-500 hover:bg-red-50 transition">
                            <FaTrash className="text-red-500" />
                            Delete
                        </button>
                    </div>

                </div>


                <div className="md:col-span-2 space-y-5">

                    <div className="grid grid-cols-3 gap-4">

                        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                            <h3 className="text-3xl font-semibold text-[#244D3F]">
                                {days_since_contact}
                            </h3>
                            <p className="text-sm text-[#64748B]">
                                Days Since Contact
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                            <h3 className="text-3xl font-semibold text-[#244D3F]">
                                {goal}
                            </h3>
                            <p className="text-sm text-[#64748B]">
                                Goal (Days)
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                            <h3 className="text-3xl font-semibold text-[#244D3F]">
                                {next_due_date}
                            </h3>
                            <p className="text-sm text-[#64748B]">
                                Next Due
                            </p>
                        </div>

                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-gray-700">
                                Relationship Goal
                            </h3>
                            <p className="text-sm text-gray-500">
                                Connect every {goal} days
                            </p>
                        </div>
                        <button className=" px-4 py-1 rounded-md text-sm btn bg-gray-200 text-black border-none">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h3 className="font-semibold mb-4 text-[#244D3F]">
                            Quick Check-In
                        </h3>

                        <div className="grid grid-cols-3 gap-4">

                            <button
                                onClick={() => handleInteraction("Call")}
                                className="flex flex-col items-center justify-center gap-2 border border-gray-200 py-6 rounded-xl bg-[#F8FAFC] hover:bg-gray-100 transition"
                            >
                                <FaPhone className="text-xl text-gray-600" />
                                <span className="text-sm text-gray-700">Call</span>
                            </button>

                            <button
                                onClick={() => handleInteraction("Text")}
                                className="flex flex-col items-center justify-center gap-2 border border-gray-200 py-6 rounded-xl bg-[#F8FAFC] hover:bg-gray-100 transition"
                            >
                                <FaCommentDots className="text-xl text-gray-600" />
                                <span className="text-sm text-gray-700">Text</span>
                            </button>

                            <button
                                onClick={() => handleInteraction("Video")}
                                className="flex flex-col items-center justify-center gap-2 border border-gray-200 py-6 rounded-xl bg-[#F8FAFC] hover:bg-gray-100 transition"
                            >
                                <FaVideo className="text-xl text-gray-600" />
                                <span className="text-sm text-gray-700">Video</span>
                            </button>

                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-700">
                                Recent Interactions
                            </h3>
                            <button
                                onClick={() => navigate(`/timeline/${friend.id}`)}
                                className="text-sm border px-3 py-1 rounded-md flex items-center gap-2 text-gray-600 hover:bg-gray-100"
                            >
                                <FaHistory /> Full History
                            </button>
                        </div>

                        {filteredTimeline.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No interactions yet
                            </p>
                        ) : (
                            filteredTimeline.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center py-3 border-b last:border-none"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-500">
                                            {item.type === "Call" && <FaPhone />}
                                            {item.type === "Text" && <FaCommentDots />}
                                            {item.type === "Video" && <FaVideo />}
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {item.type} with {item.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Interaction recorded
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-400">
                                            {item.date}
                                        </span>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 text-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FriendDetails;