"use client"

import { useState, useEffect } from "react";
import { Card } from "./components/card";

type ScholarshipType = {
  name: string
  amount: string
  deadline: string
  country: string
  stream: string
  level: string
}

type FilterType = {
  country: string[]
  stream: string[]
  level: string[]
  deadline: string
}

export default function Home() {

  const [data, setData] = useState<ScholarshipType[] | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [filter, setFilter] = useState<FilterType>({
    country: [],
    stream: [],
    level: [],
    deadline: ""
  });

  const handleCheckbox = (
    category: "country" | "stream" | "level",
    value: string
  ) => {
    setFilter(prev => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value]
      };
    });
  };

  const handleDeadline = (value: string) => {
    setFilter(prev => ({
      ...prev,
      deadline: value
    }));
  };

  const filteredData = data?.filter(item => {

    if (filter.country.length && !filter.country.includes(item.country))
      return false;

    if (filter.stream.length && !filter.stream.includes(item.stream))
      return false;

    if (filter.level.length && !filter.level.includes(item.level))
      return false;

    if (filter.deadline && !item.deadline.toLowerCase().includes(filter.deadline.toLowerCase()))
      return false;

    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetch-data`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setData(null);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="w-screen bg-slate-100 flex flex-col">
      <p className="w-screen p-3 text-3xl flex justify-center text-blue-400 border-b border-gray-200"><span><span className="font-bold text-blue-600">GradPilots </span>Scholarship Finder</span></p>
      <div className="w-full h-full flex gap-2 p-12">
        <div className="w-[20vw] drop-shadow-xl">
          <div className="w-full h-[vh] p-2 bg-white rounded flex flex-col gap-4">
            <div className="border-b border-slate-200 text-blue-900 font-bold text-3xl">FILTERS</div>
            <div className="border-b border-slate-200 text-blue-900 text-2xl flex flex-col items-start gap-2">
              <span className="font-bold">Country</span>
              <label className="text-xl" htmlFor="usa"><input onClick={() => { }} type="checkbox" onChange={() => handleCheckbox("country", "USA")} value="usa" id="usa" />USA</label>
              <label className="text-xl" htmlFor="uk"><input type="checkbox" onChange={() => handleCheckbox("country", "UK")} value="uk" id="uk" />UK</label>
              <label className="text-xl" htmlFor="canada"><input type="checkbox" onChange={() => handleCheckbox("country", "Canada")} value="canada" id="canada" />Canada</label>
              <label className="text-xl" htmlFor="germany"><input type="checkbox" onChange={() => handleCheckbox("country", "Germany")} value="germany" id="germany" />Germany</label>
            </div>
            <div className="border-b border-slate-200 text-blue-900 text-2xl flex flex-col items-start gap-2">
              <span className="font-bold">Stream</span>
              <label className="text-xl" htmlFor="business"><input type="checkbox" onChange={() => handleCheckbox("stream", "Business")} value="business" id="business" />Business</label>
              <label className="text-xl" htmlFor="law"><input type="checkbox" onChange={() => handleCheckbox("stream", "Law")} value="law" id="law" />Law</label>
              <label className="text-xl" htmlFor="ir"><input type="checkbox" onChange={() => handleCheckbox("stream", "IR")} value="ir" id="ir" />IR</label>
              <label className="text-xl" htmlFor="system"><input type="checkbox" onChange={() => handleCheckbox("stream", "System")} value="system" id="system" />System</label>
            </div>
            <div className="border-b border-slate-200 text-blue-900 text-2xl flex flex-col items-start gap-2">
              <span className="font-bold">Level</span>
              <label className="text-xl" htmlFor="ug"><input type="checkbox" onChange={() => handleCheckbox("level", "UG")} value="ug" id="ug" />UG</label>
              <label className="text-xl" htmlFor="pg"><input type="checkbox" onChange={() => handleCheckbox("level", "PG")} value="pg" id="pg" />PG</label>
              <label className="text-xl" htmlFor="phd"><input type="checkbox" onChange={() => handleCheckbox("level", "PhD")} value="phd" id="phd" />PhD</label>
            </div>
            <div className="border-b border-slate-200 text-blue-900 text-2xl flex flex-col items-start gap-2">
              <span className="font-bold">Deadline</span>
              <label htmlFor="month">Choose a deadline:</label>
              <select id="month" name="month" onChange={(e) => handleDeadline(e.target.value)} className="w-full border border-slate-200 rounded">
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
              </select>
            </div>
            <div className="text-xl flex items-start gap-2">
              <button onClick={() =>
                setFilter({
                  country: [],
                  stream: [],
                  level: [],
                  deadline: ""
                })
              } className="w-full bg-slate-300 text-blue-500 rounded">Reset Filters</button>
            </div>
          </div>
        </div>
        <div className="w-[80vw] h-full flex flex-col gap-10 items-center overflow-y-auto">
          <div className="bg-white rounded w-[67vw] flex p-5 gap-4">
            <span className="text-2xl bg-blue-200 p-6 rounded text-blue-950">{data?.length} Scholarships</span>
            <span className="text-2xl bg-blue-200 p-6 rounded text-blue-950">45 Full Funding</span>
            <span className="text-2xl bg-blue-200 p-6 rounded text-blue-950">12 Deadlines this quarter</span>
          </div>
          <div className="w-full flex justify-center flex-wrap gap-10">
            {filteredData?.slice(0, visibleCount).map((value, index) => { return <Card key={index} name={value.name} amount={value.amount} deadline={value.deadline} /> })}
          </div>
          {data && visibleCount < data.length && (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}