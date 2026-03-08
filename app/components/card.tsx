export function Card({ name, amount, deadline }: { name: string, amount: string, deadline: string }) {
    return (
        <div className="w-[21vw] h-[26vh] bg-white rounded drop-shadow-xl flex flex-col gap-3 pt-3 pl-5">
            <div className="w-full text-2xl text-blue-700">{name}</div>
            <div className="w-full text-2xl text-black">{amount}</div>
            <div className="w-full text-2xl text-gray-800">deadline: {deadline}</div>
            <button className="w-[70%] text-2xl text-white bg-blue-700">View details</button>
        </div>
    )
}