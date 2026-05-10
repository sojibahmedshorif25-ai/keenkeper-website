import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Friends from "../Friends/Friends";

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("/friends.json")
            .then(res => res.json())
            .then(data => {
                setFriends(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
            </div>
        );
    }

    return (
        <div>
            <Banner friends={friends} />
            <Friends friends={friends} />
        </div>
    );
};

export default Home;