import React from "react";

import { Card, Button } from "flowbite-react";
import { useState } from "react";
import { get, deleted, post } from "../services";
import { useEffect } from "react";

const Connection = () => {
  const [data, setData] = useState([]);
  const [commonConnections, setCommonConections] = useState([]);
  const [key, setkey] = useState(0);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = async (loadMore = false) => {
    if (loadMore) {
      setPage(page + 1);
    }
    try {
      const res = await get(`connection/?page=${page}`);
      setLastPage(res.data.data.connections.last_page);

      setData([...data, ...res.data.data.connections.data]);
    } catch (error) {}
  };

  const RemoveConection = async (id) => {
    try {

      const res = await deleted(`/connection/${id}`);
      if (res.data.success) {
        setData(data.filter((user) => user.id !== id));
      } else {
        alert(res.data.message);
      }
    } catch (error) {}
  };

  const ConnectionInCommon = async (id , key=1) => {
    
    
    try {
      const res = await get(`/connection/${id}`);
      console.log(res.data.success  ,'asd');
      if (res.data.success) {
        
        setCommonConections(res.data.data.connectionsInCommon);
        setkey(key);
        console.log(key , 'key');
      } else {
        alert(res.data.message);
      }
    } catch (error) {}
  };

  return (
    <>
    <div className="p-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex p-3  bg-bg-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col"
        >
            <div className="flex justify-between items-center">
              <h5 className="text-white">
                {item?.user?.name} {item?.user?.id}
              </h5>
              <div className="flex items-center">
                {item?.common_connections_count > 0 ? (
                <Button className="mr-2 bg-[#156ef1] text-[#fff] rounded-md hover:bg-[#156ef1]"
                onClick={() => ConnectionInCommon(item?.user?.id , index)} >
                  Connection in common ({item?.common_connections_count})
                </Button>
                ) : 
                null}
                <Button color="failure" onClick={() => RemoveConection(item?.id )} >Remove Connection</Button>
              </div>
            </div>
            {key==index ? commonConnections?.map((commonConnection, con_key) => (
              <div
                key={con_key}
                className="flex p-3  bg-bg-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col"
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-white">
                    {commonConnection?.user?.name} {commonConnection?.user?.id}
                  </h5>
                </div>
                    
              </div>
            )):''}
        </div>
      ))}

      {page <= lastPage ? (
        // Show the button
        <Button
          className="mx-auto mt-10 bg-[#156ef1]"
          onClick={() => fetchData(true)}
        >
          Load More
        </Button>
      ) : // Don't show anything
      null}
      </div>
    </>
  );
};

export default Connection;
