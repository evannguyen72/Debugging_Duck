import Image from "next/image";
import Card from "./Card";
import Link from "next/link";

interface ItemProps {
    item: {
      _id: number;
      title: string;
      description: string;
      url: string;
      likeCount: number;
    };
}

const Item = ({item}:ItemProps) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white p-4 transition hover:shadow-xl">
      <div className="w-full h-64 relative rounded-lg overflow-hidden">
        <Image
          src={item.url}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
  
      <div className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold text-teal-800">{item.title}</h2>
        <p className="text-sm text-gray-600">👍 {item.likeCount} Likes</p>
        <p className="text-sm text-gray-700 line-clamp-3">{item.description}</p>
  
        <Link
          href={`/show-item/${item._id}`}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full mt-3 transition"
        >
          View Full Document...
        </Link>
      </div>
    </Card>
  );
}
export default Item;