import React from "react";
import { Card, Tabs } from "flowbite-react";
import { tabs } from "../utils/contants";
import Suggestion from "../components/Suggestion";
import SentRequest from "../components/SentRequest";
import ReceivedRequest from "../components/ReceivedRequest";
import Connection from "../components/Connection";

const Home = () => {
  
  return (
    <div className="bg-[#202427] ">
      <div className=" bg-[#202427] mx-auto p-4">
        <h5 className="text-2xl   tracking-tight py-5 text-white">
          <p>Coding Challenge - Network connections</p>
        </h5>
        <Tabs.Group aria-label="Full width tabs" style="fullWidth">
          <Tabs.Item active title="Suggestions" className="bg-transparent">
            <hr className="bg-gray-600"></hr>
            <Suggestion  />
          </Tabs.Item>
          <Tabs.Item title="Sent Requests" className="bg-transparent" >
            <hr className="bg-gray-600"></hr>
            <SentRequest />
          </Tabs.Item>
          <Tabs.Item title="Received Requests" className="bg-transparent">
          <hr className="bg-gray-600"></hr>
            
            <ReceivedRequest />
          </Tabs.Item>
          <Tabs.Item title="Connections" className="bg-transparent">
          <hr className="bg-gray-600"></hr>

            <Connection />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default Home;
