import { useNavigate } from "react-router-dom";

const FriendCard = ({ friend }) => {
    const navigate = useNavigate();

    const { id, name, picture, days_since_contact, status, tags } = friend;

    const statusColor =
        status === "Overdue"
            ? "bg-red-500 text-white"
            : status === "Almost Due"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-[#244D3F] text-white";

    return (
        <div
            onClick={() => navigate(`/friend/${id}`)}
            className="bg-white p-5 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition"
        >
            <img
                src={picture}
                alt={name}
                className="w-16 h-16 rounded-full mx-auto"
            />

            <h3 className="mt-3 font-semibold text-[#1F2937] text-xl">{name}</h3>

            <p className="text-sm text-gray-500">
                {days_since_contact}d ago
            </p>

            <div className="flex justify-center gap-2 mt-2 flex-wrap">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs bg-[#CBFADB] px-2 py-1 rounded-2xl text-[#244D3F]"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-3">
                <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
                    {status}
                </span>
            </div>

        </div>
    );
};

export default FriendCard;