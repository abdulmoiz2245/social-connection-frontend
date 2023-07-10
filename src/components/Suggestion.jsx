import React from "react";
import { Card, Button } from "flowbite-react";
import { useState } from "react";
import { get, post } from "../services";
import { useEffect } from "react";

const Suggestion = () => {
  const [data, setData] = useState([]);
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
      const res = await get(`user/suggestions/?page=${page}`);
      setLastPage(res.data.data.suggestions.last_page);

      setData([...data, ...res.data.data.suggestions.data]);
    } catch (error) {}
  };

  const handleClick = async (id) => {
    const body = {
      receiver_id: id,
    };
    try {
      const res = await post("/request", body);
      console.log(res);
      if (res.data.success) {
        setData(data.filter((user) => user.id !== id));
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
              <h5 className="text-[#fff]">
                {item?.name} {item?.id}
              </h5>
              <Button
                onClick={() => handleClick(item.id)}
                className="bg-[#156ef1] text-[#fff] rounded-md hover:bg-[#156ef1]"
              >
                Connect
              </Button>
            </div>
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

export default Suggestion;
