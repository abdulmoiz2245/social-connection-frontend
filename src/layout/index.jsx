import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../utils/common";
import { useEffect, useState } from "react";
import { get } from "../services";

const Layout = () => {
  // Get the current location
  const location = useLocation();
  const tokenExist = getToken();
  const history = useNavigate();
  const [totalConection, setTotalConnection] = useState(0);
  const [totalSuggestion, setTotalSuggestion] = useState(0);
  const [totalSentRequest, setTotalSentRequest] = useState(0);
  const [totalReceivedRequest, setTotalReceivedRequest] = useState(0);

  useEffect(() => {
    if (!tokenExist) {
      history("/login");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await get(`dashboard`);
      if (res.data.success) {
        setTotalConnection(res.data.data.totalConnections);
        setTotalSuggestion(res.data.data.totalSuggestions);
        setTotalSentRequest(res.data.data.totalSentRequests);
        setTotalReceivedRequest(res.data.data.totalReceivedRequests);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Define a function that returns true if the pathname matches the to prop
  const isActive = (to) => location.pathname === to;

  return (
    <>
      <div className=" bg-[#202427] mx-auto p-4">
        <h5 className="text-2xl   tracking-tight py-5 text-white">
          <p>Coding Challenge - Network connections</p>
        </h5>

        <nav aria-label="Tabs">
          <ul class="flex border-b border-[#156ef1] text-center">
            <li class="flex-1">
              <Link
                to="/suggestions"
                className={`relative block border-e border-s border-t border-[#156ef1]  p-4 text-sm font-medium ${
                  isActive("/suggestions")
                    ? "bg-[#156ef1]  text-white "
                    : "text-[#156ef1]"
                }`}
              >
                <span class="absolute inset-x-0 -bottom-px h-px w-full "></span>
                Suggestions ({totalSuggestion})
              </Link>
            </li>

            <li class="flex-1">
              <Link
                to="/sent-request"
                className={`relative block border-e border-s border-t border-[#156ef1]  p-4 text-sm font-medium ${
                  isActive("/sent-request")
                    ? "bg-[#156ef1]  text-white "
                    : "text-[#156ef1]"
                }`}
              >
                <span class="absolute inset-x-0 -bottom-px h-px w-full "></span>
                Sent Request (
                {totalSentRequest}
                )
              </Link>
            </li>

            <li class="flex-1">
              <Link
                to="/recived-request"
                className={`relative block border-e border-s border-t border-[#156ef1] p-4 text-sm font-medium ${
                  isActive("/recived-request")
                    ? "bg-[#156ef1]  text-white "
                    : "text-[#156ef1]"
                }`}
              >
                <span class="absolute inset-x-0 -bottom-px h-px w-full "></span>
                Recived Request (
                {totalReceivedRequest}
                )
              </Link>
            </li>

            <li class="flex-1">
              <Link
                to="/connections"
                className={`relative block border-e border-s border-t border-[#156ef1] p-4 text-sm font-medium ${
                  isActive("/connections")
                    ? "bg-[#156ef1]  text-white "
                    : "text-[#156ef1]"
                }`}
              >
                <span class="absolute inset-x-0 -bottom-px h-px w-full "></span>
                Connections (
                {totalConection}
                )
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
