import React, { useEffect } from "react";
import { useSelectRequestsQuery } from "../Redux/Admin/sellersSlice";
import RequestsTable from "../Components/dashboard/RequestTable";
import { Circles } from "react-loader-spinner";

const Requests = () => {
  const {
    data: sellers,
    isLoading,
    isError,
    refetch,
  } = useSelectRequestsQuery({});

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[90%]">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center  h-[90%]">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            An error occurred while loading seller requests. Please try again
            later.
          </p>
          <button
            className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  return <RequestsTable sellers={sellers} />;
};

export default Requests;
