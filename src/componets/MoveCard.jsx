import React, { useEffect, useState } from "react";
import ArrowRight from "../componets/icons/ArrowRight";
import axios from "axios";
import { axiosConfig } from "../utils/axiosConfig";

const colorsForChangeType = {
  status: "bg-sky-300",
  place: "bg-pink-300",
  splace: "bg-teal-300",
};

const MoveCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [changes, setChanges] = useState([]);

  const showDateTime = (date) => {
    const t = new Date(date);
    return t.toLocaleString();
  };

  useEffect(()=>{
    axios.get(`https://inventory.dev.web.kameya.if.ua/app/change?order=timestamp&reverse&filter=item=${item.id}`, axiosConfig).then((res)=>{
      console.log(res)
      if (res.status === 200) {
        setChanges(res.data)
      }
    })
  },[])

  return (
    <div
      className=" border border-red-950 rounded-xl cursor-pointer bg-yellow-100 w-[320px] shadow-md relative"
      onClick={() => setModalVisible(!modalVisible)}
    >
      <div>
        <p className="text-md whitespace-nowrap text-red-950 leading-4 px-2 py-2">
          <strong>{item.name}</strong>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className="px-2 my-1 ml-2 inline-block bg-yellow-300 text-gray-800 rounded-lg ">
          {item.place}
        </span>

        <p className="text-sm px-2">
          {/* {showDateTime(item.changes[0].timestamp)} */}
          {showDateTime(item.lastChange)}
        </p>
      </div>

      <div
        className={`${
          modalVisible ? "block" : "hidden"
        } border border-red-950 absolute w-full rounded-lg mt-1 z-10 p-2 bg-yellow-100`}
      >
        {changes?.map((change, indx) => (
          <div className="border border-red-950 p-2 my-1 rounded-lg">
            <div className="flex items-center">
              <div className="w-2/5 text-center line-clamp-1">
                {change.from}
              </div>
              <div className="w-1/5 text-center flex flex-col">
                <span
                  className={`${colorsForChangeType[change.type]} px-1 rounded-lg`}
                >
                  {change.type}
                </span>
                <span className="flex justify-center">
                  <ArrowRight />
                </span>
              </div>
              <div className="w-2/5 text-center line-clamp-1">{change.to}</div>
            </div>
            <div className="border-b-[1px] my-2 border-red-950"></div>
            <div className="text-center bg-amber-200 rounded-lg px-2">
              {showDateTime(change.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveCard;
