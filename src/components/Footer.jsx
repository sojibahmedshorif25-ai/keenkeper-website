import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-2xl font-bold">KeenKeeper</h2>
        </div>
        <p className="text-gray-400 mb-2">Keep Your Friendships Alive</p>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500" /> for Programming Hero Assignment
        </p>
      </div>
    </footer>
  );
};

export default Footer;